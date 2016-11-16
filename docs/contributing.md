# Contributing
Pull requests are always welcome. Please be sure to read through this entire guide before opening up a pull request.

**We also highly recommend reading the [Technical Overview](./overview.md) of this project before contributing.**

## Getting Started
- Fork this repository.
- Clone your fork of this repository, NOT this repository directly.
- Install dependencies with `npm i` or `npm install`.


### Version Control
- Each commit should reference a GitHub ticket if it is related to it. Append each commit comment with “re #” and add the GitHub ticket/issue number.


### Models
To see a list of models, go to the [`src/models`](../src/models) directory. Each subdirectory there is a model.

**Model Associations**
To view the model associations, go to the  [`src/models/index.js`](../src/models/index.js) file.

### Testing
- Unit tests are run via nodeunit.  After making changes run `npm test` to execute the tests locally.
- Tests are run by the CI against pull requests when they're opened and whenever commits are merged to master.


## Guidelines & Best Practices
- Models, repositories, and services should only be called when needed, and on an individual basis.
- Constructors/classes should be used for EACH model, which will allow for those models to be instantiated individually, as opposed to instantiating the models layer which would include all models. The main models file should only require the individual model file. At the top of that model file should be `object var [Model] = {}` with default parameters of that model. Functions will then determine how to map to Sequelize (default ORM) and import the files, etc. For example, the Users controller calls the `UserService`, which calls the `UserRepository` (and possibly other repositories), which calls the User model, for instance.
- Model parents and children will all be on the same table, and use the same classes.
- Layers: You **must** specify the layer name and the model name. This is very important!
- **Extends Function**: Used for extending `Base[Layer]` with `[Model][Layer]`. Allows you to create an object that has no properties of its own, but inherits everything from the parent's prototype. The object is then used as the layer (service, repository, etc.) instance/object. Make sure each base class constructor is EMPTY. Only add reusable properties to it, which go in the prototype to then be inherited by other layers. Otherwise, those properties in the constructor will be added to the prototype chain, rather than ONLY using the child's (or layer’s) properties. The parent will never be modified once the child is, because only the parent’s prototypes are inherited. This protects the original object retrieved by Sequelize from the database from being modified by any user of the subsequently created class. You should never have to use the uber property, or the uber Class, EVER, because it references the BaseRepository, or BaseService, directly.
