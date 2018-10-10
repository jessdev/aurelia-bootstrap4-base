# Example Aurelia/bootstrap4
This example is built off of the [Creative](https://startbootstrap.com/template-overviews/creative/) example created by Start Bootstrap.
If you like this example and css, please check out [their other examples.](https://startbootstrap.com/template-overviews/)
## Build
The application uses aurelia as a front end template with koa serving static files.
To quickly build the application, use `npm run run`. This will server the application on port 8080.

There are two components to building the application:
1. Transpiling the back-end Typescript.
2. Transpiling and Bundling the front end javascript.
The scripts are located in the package.json file.
* `npm run build` this will run both parts of the build
* `npm run server-build` this will only transpile the back-end code to the dist folder
* `npm run web-build` this will only run run the webpack build. Output is wwwroot/dist

## Deploy
This part is kind of up to you. Theoretically this should deploy where ever node can run.

You'll need to transpile in prodution mode. Currently there isn't an npm script for it yet.
* run `node ./node_modules/webpack/bin/webpack.js --configfile ./webpack.config.js --env.prod`
