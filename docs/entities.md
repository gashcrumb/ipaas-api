# Entity Relationships
We are in the process of creating a diagram (see below) for the Entity Relationships in iPaaS. Below is a description of we are currently developing. Please feel free to edit this document as necessary.

## Models/Entities:

- Connection
    - belongs to Component
    - has many Tags (many-to-many)
    - belongs to an Organization
- Component
    - has many Connections
- Environment
    - belongs to an EnvironmentType
    - has many Organizations
    - has many IntegrationRuntimes
- EnvironmentType
    - has many Environments
- Integration
    - has one IntegrationTemplates 
    - has many IntegrationRuntimes
    - has many Tags (many-to-many)
    - belongs to a User
    - has many Connections through IntegrationConnectionStep
    - has many Steps through IntegrationConnectionStep
- IntegrationRuntime
    - belongs to an Integration
    - belongs to an Environment
- IntegrationTemplate
    - has many Connections through IntegrationTemplateConnectionStep
    - has many Steps through IntegrationTemplateConnectionStep
    - has many Tags
    - belongs to an Organization
- IntegrationTemplateConnectionStep
  - has a previous step ID
  - has a next step ID
  - has a type enum (Connection or Step)
- IntegrationConnectionStep
  - has a previous step ID
  - has a next step ID
  - has a type enum (Connection or Step)
- Organization
    - has many Connections
    - has many Environments
    - has many IntegrationTemplates
    - has many Users
- Permission
  - has many Roles (many-to-many)
- Report (if we want them persisted to a hard disk)
	- belongs to many Organizations
  - belongs to many Users
- Role
  - has many Users (many-to-many)
- Step
  - belongs to an IntegrationPattern
  - has many IntegrationTemplates (through JOIN IntegrationTemplateSteps)
- IntegrationPatterns
  - has many Steps
- Tag
  - has many Connections (many-to-many)
  - has many Integrations (many-to-many)
  - has many IntegrationTemplates (many-to-many)
- User
  - belongs to many Organization
  - has many Integrations
  - has many Roles (many-to-many)


<!-- TODO wanna keep this handy for now
- Connection
    - belongs to Organization
    - has many Tags (many-to-many)
- Environment (a place where integrations run)
    - has many Integration Runtime
- Integrations
    - belongs to an Organisation (whether by using recipe or not?)
    - has many Tags (many-to-many)
- Integration Runtime (a collection of integration containers in an Environment)
    - has an Integration
    - has an Environment in which it runs
    - has many Containers (process instances)
- Organization
    - has many Connections and Integrations
    - has many Users
    - has many Environments (Dev / Test / Staging / UAT)
- Reports (if we want them persisted to a hard disk)
    - belongs to User
- Settings
    - belongs to Organization
    - belongs to User
- Tags
    - has many Integrations (many-to-many)
    - has many Connections (many-to-many)
- User
    - belongs to Organization
    - has many Integrations
    - has many Reports (or should this be under Integrations instead?)
    - has many Settings
    -->

Again, this list may not be up-to-date, or may be under development. Please see the active list of models by viewing the [`src/models`](../src/models/index.js) file.

## Visual entity graph

![Visual entity graph picture](./entities.png)

You can edit the diagram of the above relationships using [this online tool](http://ondras.zarovi.cz/sql/demo/?keyword=default)
- copy the contents of [`./entities.xml`](./entities.xml)
- click `Save / Load` at the top-right of the designer
- paste the XML into the big text area 
- click `Load from XML`
- make your changes
- click `Save / Load` at the top-right
- click `Save XML`
- Hit `control` (or `command`) `a` to select all the text
- Hit `control` (or `commmnd`) `v` to copy
- Paste it into [`./entities.xml`](./entities.xml)
- To capture an image using chrome you'll need [this browser extension](https://chrome.google.com/webstore/detail/full-page-screen-capture/fdpohaocaechififmbbbbbknoalclacl) to get the whole thing easily.
  - It's also good to go into the developer tools and hide the controls/minimap elements.
