# Technical Overview
This is a brief technical overview of the front end of the Red Hat iPaaS API, focusing primarily on the structure of the code and how components interact with each other. It is primarily a layer-based API, which allows for better abstraction and greater security.

This is an enterprise-grade API that uses a layered approach for greater abstraction, improved security, and extendability. It supports:

>- A **repository layer** that allows for multiple data stores should you need it.
- A **model layer** that can be mapped to each data store using its own data-mapping file.
- A **service layer** for communicating with any service you'd like (ie Twitter, Facebook), where you can parse and transform data as necessary.
- And, finally, the **interface** that we traditionally know as an API, which returns JSON to users like any RESTful API.


If you'd like to contribute, please read the [`./contributing.md`](./contributing.md) file in detail.

### Models
To see a list of models, go to the [`src/models`]('../src/models') directory. Each subdirectory there is a model.

**Model Associations**
To view the model associations, go to the  [`src/models/index.js`]('../src/models/index.js') file.


## Technologies
The API uses a few lightweight technologies, consisting of the following:

>- Authentication & ACL: [Everyauth](https://github.com/bnoguchi/everyauth) (may switch to [Passport](http://passportjs.org/))
- Datastore: [MySQL](https://www.npmjs.com/package/node-mysql) (by default, supports any you create a model for) - should also switch to [this](https://github.com/mysqljs/mysql) version
- Encryption: [Bcrypt](https://www.npmjs.com/package/bcrypt), [Crypto](https://www.npmjs.com/package/crypto)
- Default ORM: [Sequelize](http://docs.sequelizejs.com/en/v3/)

## Code Execution Flow
1. Controller creates new instance of an individual model from /src/models, and requires the services it wishes to use. Ex: `new UserModel()`.
2. The model uses an internal function (a closure) to check if an instance of that model already exists, and if it does, returns it.
3. The model then checks configuration settings in [`/src/utils/config.js`]('../src/utils/config.js'), and determines which type of model repository to return as the model (a plain model repository, a sequelize model repository, etc.).
4. The model is then synchronized with the database (again, depending on configuration settings) and returns a copy of the object to the controller.
5. The controller then has access to the same model reference for all of its methods.
6. Controller methods call the model service desired from [`/src/services/[Model]Service.js`]('/src/services/[Model]Service.js'), passing in any parameters being used from the already instantiated model object copy.
7. The `[Model]Service` that was called then calls the model’s respective repository or repositories, to perform a specific set of tasks. The service then returns the repository function’s resulting object back to the controller.
8. The `[Model]Repository` function(s) then communicate(s) directly with the Model instance and specifies the actions it wants it to take. Ex: User.find.success.error, etc.
9. The `[Model]Repository` then creates a deep copy of the object returned from the database, and then returns that copy.


## Deep Dive into JavaScript Prototypical Inheritance
A brief overview of how this layered approach works, using vanilla JavaScript:

- The way this layered approach works is using parasitic combination inheritance. This is used to inherit properties and methods of another class (not the `Base`).
- **Parasitic combination inheritance** uses something known as "constructor stealing" to inherit properties but uses a hybrid form of prototype chaining to inherit methods. The basic idea is this: instead of calling the Supertype constructor to assign the subtype’s prototype, all you need is a copy of the super type’s prototype. Essentially, use parasitic inheritance to inherit from the supertype’s prototype and then assign the result to the subtype’s prototype. Properties should be declared in the constructor.
- The `Service` layer will inherit properties directly from the `Repository` file(s) that it specifies within the constructor (you must add the function ‘call’ or ‘apply’ within the prototype of the Service layer, directly referencing the Repository file or even Service file that you wish to inherit properties from. In addition, the Service class will inherit the prototype chain of its respective Repository class with ServiceClass.prototype = new RepositoryClass. Just remember that the model name is specified as a property in every Repository class, and it will inherit that as well.
- `Mixins`: When you want to combine the properties of multiple objects into one final object, such as when fetching model associations, use mixins. If the function does not pass a raw query to Sequelize, then it can and should be done from the service layer. If will be executing raw sequel queries, do it in the repository layer. Do this with actual results from Service calls, not with Service files or Repository files directly.

## The API (Routes & Controllers)

Endpoints are located in /router.js. This API supports basic authentication with Everyauth and Bcrypt. It provides a service layer, repository layer, and model layer so that you can use multiple repositories and data stores like MySQL, and external services like Twitter. Models are wired up with whatever repository is configured via the /src/api directory.

### Issues & Concerns
Some ideas I came up with for the API and some issues that were presented in the final layer of this interface. Please note that this was as of about three years ago and may no longer be a concern.

1. Separating API (actions) & Routes (views)
    - We will still need to use a single router.js file for each Express application. We can have two directories of controllers/routes: /api and /routes. Each can be referenced in that single file. Neither should need to communicate with one another. If the namespace /api will need to be prepended to each API route, then each form’s action in each view will need to be changed. This shouldn’t require much work. The other option is to prepend an ‘api’ namespace to the main Ajax script in layout.ejs.
    - What about the model instances? Should they be shared or instantiated each time? I think it should be instantiated each time, to allow for greater decoupling.
    - There should be an API file for each model defined, however, routes can have files for nonexistent models such as 'marketing' and 'support'. Wait, shouldn’t the API actually be shared? Hmmm.. That might be a good thing. How do we decide whether `find` should actually include associations or not? How can I avoid a loop? Ok I think I figured it out. The route methods are defined in router.js, which is specific to each application and to each route. So, for instance, for tasks, you may not want to get associations, so you would choose api.tasks.find, and for users, you would choose api.users.findWithAssociations.
    - API Methods Available: add, del, find, findAll, findAllWhere, findWhere, findWithAssociations, query, save
2. Creating route templates
    - Structure Examples:
        - /campaigns/:type/:id/:resources/:resourceId/:action
            - Types: advertising, affiliate, networking, social, video
            - Resources: categories, entries, files, history, images, notes, tags, tasks, users
        - /promotions/:id/:type/:typeId/:action
            - Types: products, services
        - Resources can be any association you need for the model in mind.
            - Types are specific to that particular model.
        - Each route category must pick a route structure according to the requirements, and adhere it to it from beginning to end.
    - Routes are specific to each application, and are not to be shared between them as models, resources, database connections, and repositories are.
    - For now, the only thing you can create in bulk are files/images!! However, at the moment you can only create/upload one file/image at a time. Once the bulk upload feature is implemented (mostly on the frontend), the `BaseRepository` `bulkCreate` method is already created, it will only be available for files/images until further notice.



## How the Service & Repository layers interact when using an ORM

- The default ORM is [Sequelize](http://docs.sequelizejs.com/en/v3/), but can be swapped out in the [`../config`](config) directory. The file depends on your environment.
- Each Repository will accept `this.params` as the `{where: this.params}` clause. Each Service can pass these parameters to the Repository by providing an object with the arguments: `{id: modelId}`, and can even ask for whichever associations it needs by doing: `{id: req.params.id, include: [{model: AnAssociatedModel}, {model: AnotherAssociatedModel}]`. This way, you can always just pass the arguments each time without having to worry about writing out `{where: {}}` every time.
- There are a few exceptions to the above:
    - When you want to pass a raw query to Sequelize, in which case you do not add a “where” clause. Here, this.params will be passed directly to Sequelize. The two methods that do this / allow this are: search, query, findAll, findWhere
    - find vs findWhere: For ‘find’ you don’t have to specify {where: {}} in the controller / routes. For ‘findWhere’, you do. This allows you to pass raw SQL queries, and also to specify which other models to include. NOTE: You cannot pass an ‘include’ for many-to-many associations. For that, you have to use .getModelNames.
- Working with model associations (and their associations):
    - Associations should be defined in the service layer, because that is where you can reference other service layers and still have decoupling. The `BaseRepository` should be as simple as possible.
    - In each service the following methods are provided by default: `destroyAssociations`, `findAllWithAssociations`, `findAllWithAssociationsForEach` (may not be needing this), `findWithAssociations`, `setAssociations`, `unsetAssociations`. 
<!--
    - Maybe I can add a reference to `setAssociations` / `unsetAssociations` if the prototype exists.
    - Challenges: setting associations, unsetting associations, fetching associations that require a JOIN
    - Having separate routes for each association (ex: `/users/:id/notes`) would make passing parameters much easier, but requires a lot of work and is not very maintainable. The only way this would work is if I were to use route templates, such as the following: `/users/:id/:resource/:resourceId` (mentioned previously). However, calling that resource’s service would be difficult. It would be easier to work with the original model’s service, and would also make the code more maintainable. This could call the ‘setAssociations’ method for the original model from its service. Then, maybe the association models could be passed as a parameter.
    - The other option would be to pass the original model’s ID as a hidden input field in the form. The add/save actions would not have to know anything at all about the original model except for the ID. I have to find out whether or not I have to load the original model as an instance in order to be able to set an association for it, or if I can just pass the `id` as a parameter and ask the association model to set it (I think this is possible). I think that this option would require a lot less work, and is much more maintainable. The problem comes when you have an association that requires a `JOIN`. You can’t just insert the original model’s ID into the table. You need to set the association using Sequelize’s available methods, or pass a raw SQL query inserting the value into the JOIN table. What would be an easy way to deal with this dynamically, so that the code knows whether or not to handle the request as a JOIN table? I think the only way to deal with this is to avoid raw SQL queries as the way to handle setting associations. If I were to always use Sequelize’s available methods, it would automatically check whether the association requires a JOIN or not, and handles it for me (pretty sure, but not 100% sure about this). We can do a check for the `req.body object`, and if it includes a `UserId`, or whatever the foreign key is, then set the association. Wait, but how do I do this dynamically for ALL models in the `BaseRepository.js` file? I think it would be quite difficult. Or maybe not. I can do all of this through the input data I send to the backend. Maybe I can do an input for the AssociationId and another hidden input for indicating that setting associations are required, and then calling the model Service layer’s `setAssociations` prototype method. Let’s include a BOOLEAN value hidden input field, `associations = true / false`, and then we can reference the original model ID as `associations.UserId` or whatever the foreign key is. Even better: We can do a check for req.body.association, and if it exists, then we can go ahead and call the prototypical method to set the associations, and do other checks to see which associations need to be set. Wait, then in this case we won’t even have to use the BOOLEAN value, we can just check to see if req.body.associations exists. We can even use the mixin function to return the newly saved / created object with its associations already set.
    - Now, what about deleting vs just unsetting associations of objects that are about to be deleted? The only time that associations should be deleted is when it is an important model that is being deleted, such as a user or company. Even still, I’m not sure that this is a good option. We can just use the statuses of the model to determine whether they are active or inactive.

## Miscellaneous Notes
- For Express + Everyauth: `params.createdAt = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');`
-->


