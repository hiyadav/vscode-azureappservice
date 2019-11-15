/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as appservice from 'vscode-azureappservice';
import { IActionContext } from 'vscode-azureextensionui';
import { SiteTreeItem } from '../../explorer/SiteTreeItem';
import { WebAppTreeItem } from '../../explorer/WebAppTreeItem';
import { ext } from '../../extensionVariables';
import { getRemoteDebugLanguage } from './getRemoteDebugLanguage';

export async function startRemoteDebug(context: IActionContext, node?: SiteTreeItem): Promise<void> {
    if (!node) {
        node = <SiteTreeItem>await ext.tree.showTreeItemPicker(WebAppTreeItem.contextValue, context);
    }

    const siteClient = node.root.client;
    const siteConfig = await vscode.window.withProgress({ location: vscode.ProgressLocation.Notification }, async progress => {
        appservice.reportMessage('Fetching site configuration...', progress);
        return await siteClient.getSiteConfig();
    });

    const language: appservice.RemoteDebugLanguage = getRemoteDebugLanguage(siteConfig, context);

    await appservice.startRemoteDebug(siteClient, siteConfig, language);
}
