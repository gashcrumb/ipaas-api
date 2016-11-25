# Entity Relationships
We are in the process of creating a diagram (see below) for the Entity Relationships in iPaaS. Below is a description of we are currently developing. Please feel free to edit this document as necessary.

## Models/Entities:


- Connection
    - attributes: `name`, `icon`, `configuredProperties`, `position`, `description`
    - belongs to ConnectionType
    - has many Tag (many-to-many)
- ConnectionType
    - attributes: `name`, `icon`, `properties`
    - has many Connection
- Environment
    - attributes: `name`
    - belongs to an EnvironmentKind
    - belongs to an Organization
    - has many IntegrationRuntime
- EnvironmentKind
    - attributes: `name`
    - has many Environment
- Integration
    - attributes: `name`, `configuration`
    - has one IntegrationTemplate (through JOIN IntegrationTemplatesIntegrations))
    - has many IntegrationRuntime
    - has many Tag (many-to-many)
    - belongs to a User
- IntegrationRuntime
    - attributes: `state`
    - belongs to an Integration
    - belongs to an Environment
- IntegrationTemplate
    - attributes: `name`, `step order`
    - has many Connection
    - has many Step
    - has many Tag
- Organization
    - attributes: `name`
    - has many Connection
    - has many Environment
    - has many IntegrationTemplate
    - has many User
- Step
    - has `configuredProperties`
    - belongs to a StepType
    - has many IntegrationTemplate (through JOIN IntegrationTemplateSteps)
- StepType
    - attributes: `name`, `icon`, `properties`
    - has many Step
- Tag
    - attributes: `label`, `value`
    - has many Connection (many-to-many)
    - has many Integration (many-to-many)
- User
    - attributes: `name`
    - belongs to many Organization
    - has many Integrations


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
