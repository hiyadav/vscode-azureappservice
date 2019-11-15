/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { WorkspaceFolder } from "vscode";
import { IActionContext } from "vscode-azureextensionui";

export interface IDeployContext extends IActionContext {
    workspace: WorkspaceFolder;
    originalDeployFsPath: string;
    effectiveDeployFsPath: string;
    webAppSource?: WebAppSource;
}

export enum WebAppSource {
    setting = 'setting',
    tree = 'tree',
    nodePicker = 'nodePicker'
}
