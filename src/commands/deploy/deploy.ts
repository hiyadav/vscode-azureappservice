/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as WebSiteModels from 'azure-arm-website/lib/models';
import { pathExists } from 'fs-extra';
import * as path from 'path';
import * as vscode from 'vscode';
import * as appservice from 'vscode-azureappservice';
import { IActionContext } from 'vscode-azureextensionui';
import * as constants from '../../constants';
import { SiteTreeItem } from '../../explorer/SiteTreeItem';
import { ext } from '../../extensionVariables';
import { javaUtils } from '../../utils/javaUtils';
import { nonNullValue } from '../../utils/nonNull';
import { isPathEqual } from '../../utils/pathUtils';
import { getRandomHexString } from "../../utils/randomUtils";
import * as workspaceUtil from '../../utils/workspace';
import { getWorkspaceSetting } from '../../vsCodeConfig/settings';
import { runPostDeployTask } from '../postDeploy/runPostDeployTask';
import { confirmDeploymentPrompt } from './confirmDeploymentPrompt';
import { getDeployNode, IDeployNode } from './getDeployNode';
import { IDeployContext, WebAppSource } from './IDeployContext';
import { postDeploymentPrompt } from './postDeploymentPrompt';
import { setPreDeployTaskForDotnet } from './setPreDeployTaskForDotnet';

const postDeployCancelTokens: Map<string, vscode.CancellationTokenSource> = new Map();

export async function deploy(context: IActionContext, target?: vscode.Uri | SiteTreeItem | undefined, isTargetNewWebApp: boolean = false): Promise<void> {
    let webAppSource: WebAppSource | undefined;
    context.telemetry.properties.deployedWithConfigs = 'false';
    let siteConfig: WebSiteModels.SiteConfigResource | undefined;

    if (target instanceof SiteTreeItem) {
        webAppSource = WebAppSource.tree;
        // we can only get the siteConfig earlier if the entry point was a treeItem
        siteConfig = await target.root.client.getSiteConfig();
    }

    const fileExtensions: string | string[] | undefined = await javaUtils.getJavaFileExtensions(siteConfig);

    const { originalDeployFsPath, effectiveDeployFsPath } = await appservice.getDeployFsPath(target, fileExtensions);
    const workspace: vscode.WorkspaceFolder | undefined = workspaceUtil.getContainingWorkspace(effectiveDeployFsPath);
    if (!workspace) {
        throw new Error('Failed to deploy because the path is not part of an open workspace. Open in a workspace and try again.');
    }

    const deployContext: IDeployContext = {
        ...context, workspace, originalDeployFsPath, effectiveDeployFsPath, webAppSource
    };

    // because this is workspace dependant, do it before user selects app
    await setPreDeployTaskForDotnet(deployContext);
    const { node, isNewWebApp }: IDeployNode = await getDeployNode(deployContext, target, isTargetNewWebApp);

    context.telemetry.properties.webAppSource = deployContext.webAppSource;

    const correlationId = getRandomHexString();
    context.telemetry.properties.correlationId = correlationId;

    // if we already got siteConfig, don't waste time getting it again
    siteConfig = siteConfig ? siteConfig : await node.root.client.getSiteConfig();

    if (javaUtils.isJavaRuntime(siteConfig.linuxFxVersion)) {
        await javaUtils.configureJavaSEAppSettings(node);
    }

    const isZipDeploy: boolean = siteConfig.scmType !== constants.ScmType.LocalGit && siteConfig !== constants.ScmType.GitHub;
    // only check enableScmDoBuildDuringDeploy if currentWorkspace matches the workspace being deployed as a user can "Browse" to a different project
    if (getWorkspaceSetting<boolean>(constants.configurationSettings.showBuildDuringDeployPrompt, deployContext.effectiveDeployFsPath)) {
        //check if node is being zipdeployed and that there is no .deployment file
        if (siteConfig.linuxFxVersion && isZipDeploy && !(await pathExists(path.join(deployContext.effectiveDeployFsPath, constants.deploymentFileName)))) {
            const linuxFxVersion: string = siteConfig.linuxFxVersion.toLowerCase();
            if (linuxFxVersion.startsWith(appservice.LinuxRuntimes.node)) {
                // if it is node or python, prompt the user (as we can break them)
                await node.promptScmDoBuildDeploy(deployContext.effectiveDeployFsPath, appservice.LinuxRuntimes.node, context);
            } else if (linuxFxVersion.startsWith(appservice.LinuxRuntimes.python)) {
                await node.promptScmDoBuildDeploy(deployContext.effectiveDeployFsPath, appservice.LinuxRuntimes.python, context);
            }

        }
    }

    if (!isNewWebApp && isZipDeploy) {
        await confirmDeploymentPrompt(deployContext, context, node.root.client.fullName);
    }

    // tslint:disable-next-line:no-floating-promises
    node.promptToSaveDeployDefaults(deployContext, deployContext.workspace.uri.fsPath, deployContext.originalDeployFsPath);
    await appservice.runPreDeployTask(deployContext, deployContext.originalDeployFsPath, siteConfig.scmType);

    // cancellation moved to after prompts while gathering telemetry
    // cancel the previous detector check from the same web app
    const previousTokenSource: vscode.CancellationTokenSource | undefined = postDeployCancelTokens.get(node.id);
    if (previousTokenSource) {
        previousTokenSource.cancel();
    }

    // only respect the deploySubpath settings for zipdeploys
    const deployPath: string = isZipDeploy ? deployContext.effectiveDeployFsPath : deployContext.originalDeployFsPath;

    if (!isZipDeploy && isPathEqual(deployContext.effectiveDeployFsPath, deployContext.originalDeployFsPath)) {
        const noSubpathWarning: string = `WARNING: Ignoring deploySubPath "${getWorkspaceSetting(constants.configurationSettings.deploySubpath)}" for non-zip deploy.`;
        ext.outputChannel.appendLog(noSubpathWarning);
    }

    await node.runWithTemporaryDescription("Deploying...", async () => {
        await appservice.deploy(nonNullValue(node).root.client, <string>deployPath, deployContext);
    });

    const tokenSource: vscode.CancellationTokenSource = new vscode.CancellationTokenSource();
    postDeployCancelTokens.set(node.id, tokenSource);

    // don't wait
    // tslint:disable-next-line: no-floating-promises
    postDeploymentPrompt(deployContext, node);

    // intentionally not waiting
    // tslint:disable-next-line: no-floating-promises
    runPostDeployTask(node, correlationId, tokenSource);
}
