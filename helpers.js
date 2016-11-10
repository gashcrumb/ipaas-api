// Express & EJS-Locals Helpers

app.locals.somevar = "hello world";

app.locals.someHelper = function(name) {
  return ("hello " + name);
};

// These will be accessible inside your views like this:
// <% somevar %>
// <% someHelper('world') %>