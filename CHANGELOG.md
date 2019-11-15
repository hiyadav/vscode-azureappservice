# Change Log
All notable changes to the "azure-appservice" extension will be documented in this file.

## 0.16.1 - 2019-10-16
### Fixed
- Ignore `deploySubPath` task for local git deploys [#1185](https://github.com/microsoft/vscode-azureappservice/issues/1185)
- Render Linux runtime choices properly when creating web apps [#1202](https://github.com/microsoft/vscode-azureappservice/issues/1202)

## 0.16.0 - 2019-09-18
### Added
- Smart defaults for deploying .NET projects (adds settings and tasks for one-click deployment)
- Add "Collpase All" button to top right of Azure Explorer view
- Web Apps support App Insights by default
- Create New Web App... (Advanced) [`appService.advancedCreation` setting is no longer supported]
- Timestamps are prepended to all output messages.  Turn this off by setting `appService.enableOutputTimestamps` to `false`
- App Service Diagnostics runs post deployment (feature flag required)

### Changed
- Project must be opened in workspace to deploy it

### Fixed
- [Bugs fixed](https://github.com/microsoft/vscode-azureappservice/issues?q=is%3Aissue+is%3Aclosed+milestone%3A0.16.0)

## 0.15.0 - 2019-06-10
### Added
- Free tier for Linux plans now available!
- Automatically create a new Windows app service plan if default plan already has 3 web apps
- Deployment slots automatically have the same deployment source configuration as the production web app

### Changed
- When deploying, the project is prompted for first and then the web app

### Fixed
- [Bugs fixed](https://github.com/microsoft/vscode-azureappservice/issues?q=is%3Aissue+is%3Aclosed+milestone%3A0.15.0)

## 0.14.0 - 2019-05-01
### Added
- SSH into Linux Web Apps
- View GitHub commits for web apps connected to a GitHub repo
- Show deployment source on Deployments node

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.14.0%22+label%3Abug+is%3Aclosed+)

## 0.13.0 - 2019-03-07
### Added
- Remote debugging support for Node.js on Linux (previously required a feature flag)
- Automatically recommend Java runtimes when applicable

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.13.0%22+label%3Abug+is%3Aclosed+)

## 0.12.0 - 2019-01-31
### Added
* Significantly improved startup and installation performance

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.12.0%22+label%3Abug+is%3Aclosed+)

## 0.11.0 - 2019-01-16
### Added
- App settings are hidden by default and can be revealed by clicking on it in the explorer pane
- Download remote app settings as `.env` file
- Upload local `.env` to remote apps's settings
- Smarter Python defaults for faster, more reliable deployments
- Workspace setting for `appService.preDeployTask`
    - `appService.preDeployTask` will run task defined in `task.json` prior to deployment

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.11.0%22+label%3Abug+is%3Aclosed+)

## 0.10.0 - 2018-11-28
### Added
- Deployments node for Web Apps that are connected to a GitHub or LocalGit repository
  - View deployment logs
  - Redeploy previous deployments
- CosmosDB Connections: Leverage [CosmosDB Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) to effortlessly connect databases to web apps
- Option to reset "appsService.defaultWebAppToDeploy" setting when confirming deployments
- "Connect to Log Stream" node within "Logs"

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.10.0%22+label%3Abug+is%3Aclosed+)

## 0.9.1 - 2018-09-06
### Added
- Support for .jar deployment
- Shortcut key for Azure View

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.9.1%22+label%3Abug+is%3Aclosed+)

## 0.9.0 - 2018-07-12
### Added
- View and edit remote files for Web Apps and slots (previously required a feature flag)
- View log files for Web Apps and slots
- Deployment defaults for a project workspace. The web app deployed to and the subpath deployed will be saved and used for consequent deployments.
- Support for WAR deploy

### Changed
- `Create New Web App...` has been redesigned to make smart defaults and have fewer prompts.
    - If the previous creation experience is desired, change the VS Code user-setting `{appService.advancedCreation: true}`
- Output window is no longer shown automatically.  Long running notifications have been implemented.

### [Fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.9.0%22+label%3Abug+is%3Aclosed+)

## 0.8.1 - 2018-05-16
### [Fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.8.1%22+label%3Abug+is%3Aclosed+)
- Remote debugging fails to attach if App Service tunnel is not ready

## 0.8.0 - 2018-05-03
### Added
- Remote debugging support for Node.js on Linux (feature flag required)
- Modal confirmation dialogs for more visibility

### Changed
- Moved App Service Explorer to Azure view container

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.8.0%22+label%3Abug+is%3Aclosed+)

## 0.7.1 - 2018-04-13
### [Fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.7.1%22+label%3Abug+is%3Aclosed+)
- Deployment fail when deploying to web app with a custom domain

## 0.7.0 - 2018-04-05
### Added
- Subscription filter button next to Subscription nodes in the explorer
- Deploy to Web App context menu action for Web Apps
- Create Windows web apps
- Report issue button on error dialogs that links to the GitHub repo

### Removed
- Auto-browse after web app and slot creation

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.7.0%22+label%3Abug+is%3Aclosed+)

## 0.6.1 - 2018-03-12
### [Fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.6.1%22+label%3Abug+is%3Aclosed+)
- Open in Portal and Browse Website fail on Linux with message "spawn EACCES"

## 0.6.0 - 2018-03-08
### Added
- Configure deployment source to a GitHub repository (requires authorizing Azure to access GitHub)
- Create PHP, .NET Core, and Ruby web apps on Linux
- Faster zipdeploy by leveraging SCM_DO_BUILD_DURING_DEPLOYMENT app setting.  Learn more [here](https://aka.ms/Kwwkbd)

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.6.0%22+label%3Abug+is%3Aclosed+)

## 0.5.1 - 2018-01-25
Happy New Year, everybody!  Welcome to 2018!

### Added
- Auto-browse after web app and slot creation
- Link to a great tutorial to get started in the README
- View and edit a deployment slot's files (feature flag required)

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?utf8=%E2%9C%93&q=is%3Aissue+milestone%3A%220.5.1%22+label%3Abug+is%3Aclosed+)

## 0.5.0 - 2017-12-15
### Added
- Configure web app's deployment source from the explorer
- Deploy from Explorer with a button
- Deploy projects immediately after web app creation
- Browse for any folder when deploying
- Zip deployment file inclusion setting
- Create deployment slots from configuration sources
- UI improvements including "Creating..." placeholder nodes, "Load More..." when there are a lot of web apps, etc.
- View and edit a web app's files (feature flag required)
- Run commands from the Command Palette

### Removed
- Deployment from web app context menu
- Display a web app's resource group (display state instead)

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?q=is%3Aissue+milestone%3A%220.5.0%22+label%3Abug+is%3Aclosed)

## 0.4.0 - 2017-11-10
### Added
- Create Deployment Slot
- Icons now match the Azure portal

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?q=is%3Aissue+milestone%3A%22Version+0.4.0%22+label%3Abug+is%3Aclosed)

## 0.3.1 - 2017-11-01
### Fixed
- Show warning message that zip deploy is a destructive action
- Leverage [new app service zipdeploy](https://github.com/projectkudu/kudu/wiki/Deploying-from-a-zip-file)

### Removed
- Zip Deploy no longer runs 'npm install'. It expects a ready-to-run app

## 0.3.0 - 2017-10-18
### Added
- Local Git deployment
- "Create New Web App" remembers user selections
- A setting to show/hide the App Service Explorer
- Swap deployment slots with production site
- "Open In Portal" context menu command for Application Settings
- Generate bash script based on existing web app for automated resource provisioning

### Removed
- "Create New Web App" no longer show bash script, use "Generate Azure CLI Script" context menu command instead.

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?q=is%3Aissue+milestone%3A%22Version+0.3.0%22+is%3Aclosed+label%3Abug)

## 0.2.0 - 2017-10-03
### Added
- Deploy to Deployment Slots
- View web app log stream
- View and edit web app settings
- Delete Deployment Slots and Web Apps

### Removed
- The Explorer view no longer shows Function apps. Function app will have its own Visual Studio Code extension.

### Fixed
- [Bugs fixed](https://github.com/Microsoft/vscode-azureappservice/issues?q=is%3Aissue+milestone%3A%22Version+0.2.0%22+label%3Abug+is%3Aclosed)

## 0.1.0 - 2017-09-19
### Added
- App Service UI components (sash)
- Create new Linux Web App
- Deploy via zip to a Linux Web App
- Generate az shell script with creation/deployment commands
- Wizard style pick list
- Basic support for Deployment Slot - browse, open in portal and swap.
