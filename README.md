## Updating the App

To begin, you need to make sure you have the miro sdk installed, simply run

```
npm install
```

*index.ts*

Contains the creation method for the app panel within Miro. This is where you can change specifics like the size of the panel.

*app.tsx*

Contains the UI and functionality of the app.

## Testing
To run a local version of the app, run the command
```
npm run start
```
You need to be added to the VNTANA Miro team and have access to the Developer group. While this app is running locally, you'll be able to access the VNTANA 3D Viewer Local app, but only within the Developer team.

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

You can also deploy a dev version of the App for external testing or testing outside the Developer team on Miro. To do this, run the command

```
gcloud app deploy app.yaml --version 2 --no-promote
```

This will host the app at *https://2-dot-vntana-miro.uc.r.appspot.com* and the *--no-promote* will prevent it from taking over the main version of the App. This can then be added as a new App that isn't accessible to others unless you send them an install link. 