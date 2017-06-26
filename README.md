# learning-resources
In this application, users can add, edit, and delete their favorite learning resources.

## Architecture
The application is based off the FountainJS boilerplate app with the following settings:
* Framework: Angular 1
* Modules manager: Webpack with NPM
* CSS preprocessor: SASS
* JS preprocessor: TypeScript

## Third Party Technologies
The application uses the following third-party resources:
* Bootstrap (CSS only, no JS)
* Font Awesome

## Data Persistence
The application currently uses local storage to persist data.

## Improvements
The application could use the following improvements
* Leverage webpack to pull in Bootstrap and Font Awesome
* Pull parts of application out into separate Angular components.  Everything is currently in the main App.ts file, which is not ideal and can increase maintenance costs.
* Separate SASS into partials to make it more manageable, and use component specific SASS files as needed
* Add more features, like a grid or list view, filters, sort options, and search capability
