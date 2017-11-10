## Setup

1. Create a new project in the [Firebase console](https://console.firebase.google.com/).
1. In the Develop > Authentication > Sign-in Method settings, enable "Google" as a sign-in provider for this project.
1. Use `npm -g install firebase-tools` or `yarn global add firebase-tools` to install the Firebase CLI tools locally.
1. Inside this project folder, run `firebase use --add` and select the id of the new project (choose whatever you like as the alias).
1. Run `npm install` to install the dependencies.

## Deployment

`npm run build && firebase deploy`

## Development

Copy `.env` to `.env.local` and add the appropriate values (obtained from the Firebase console):

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
```

Use `npm start` to start the dev server.
