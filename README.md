## Updating the App

To begin, you need to make sure you have the miro sdk installed, simply run

```
npm install
```

*index.ts*

Contains the creation method for the app panel within Miro. This is where you can change specifics like the size of the panel.

*app.tsx*

Contains the UI and functionality of the app.

## Building the App 

The app must be built before deploying. Simply run the command

```
npm run build
```

## Deploying the App

The app is a Google App Engine project with project ID *vntana-miro*. Before you can deploy, you must download *gcloud* command line tools. Within the root directory of the project, run

```
gcloud init
```
to initialize your configuration and point it to the correct project.

To deploy the project, make sure the *app.yaml* is up to date and run the command

```
gcloud app deploy app.yaml --version 1
```