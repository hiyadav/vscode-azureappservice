/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fse from 'fs-extra';
import * as path from 'path';
import { WorkspaceFolder } from 'vscode';
import { IAppServiceWizardContext, LinuxRuntimes, WebsiteOS } from 'vscode-azureappservice';
import { ICreateChildImplContext, LocationListStep } from 'vscode-azureextensionui';
import { javaUtils } from '../../utils/javaUtils';
import { findFilesByFileExtension, getSingleRootWorkspace } from '../../utils/workspace';
import { IDeployContext } from '../deploy/IDeployContext';

export async function setPrePromptDefaults(wizardContext: IAppServiceWizardContext & Partial<IDeployContext> & Partial<ICreateChildImplContext>): Promise<void> {
    // if the user entered through "Deploy", we'll have a project to base our recommendations on
    // otherwise, look at their current workspace and only suggest if one workspace is opened
    const workspaceForRecommendation: WorkspaceFolder | undefined = getSingleRootWorkspace(wizardContext);

    if (workspaceForRecommendation) {
        const fsPath: string = workspaceForRecommendation.uri.fsPath;

        if (await fse.pathExists(path.join(fsPath, 'package.json'))) {
            wizardContext.recommendedSiteRuntime = [LinuxRuntimes.node];

        } else if (await fse.pathExists(path.join(fsPath, 'requirements.txt'))) {
            // requirements.txt are used to pip install so a good way to determine it's a Python app
            wizardContext.recommendedSiteRuntime = [LinuxRuntimes.python];

        } else if (await javaUtils.isJavaProject(fsPath)) {
            wizardContext.recommendedSiteRuntime = [
                LinuxRuntimes.java,
                LinuxRuntimes.tomcat,
                LinuxRuntimes.wildfly
            ];

            // considering high resource requirement for Java applications, a higher plan sku is set here
            wizardContext.newPlanSku = { name: 'P1v2', tier: 'PremiumV2', size: 'P1v2', family: 'P', capacity: 1 };
            // to avoid 'Requested features are not supported in region' error
            await LocationListStep.setLocation(wizardContext, 'weseteurope');
        }
    }

    if (!wizardContext.advancedCreation) {
        if (!wizardContext.location) {
            await LocationListStep.setLocation(wizardContext, 'centralus');
        }

        if (!wizardContext.newPlanSku) {
            // don't overwrite the planSku if it is already set
            wizardContext.newPlanSku = { name: 'F1', tier: 'Free', size: 'F1', family: 'F', capacity: 1 };
        }

        // if we are recommending a runtime, then it is either Nodejs, Python, or Java which all use Linux
        if (wizardContext.recommendedSiteRuntime) {
            wizardContext.newSiteOS = WebsiteOS.linux;
        } else {
            if (workspaceForRecommendation && (await findFilesByFileExtension(workspaceForRecommendation.uri.fsPath, 'csproj')).length > 0) {
                wizardContext.newSiteOS = WebsiteOS.windows;
            }
        }
    }
}
