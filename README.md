## Setup

1. Inside this project folder, run `npm install` to install the project's dependencies.
1. Create a new project in the [Firebase console](https://console.firebase.google.com/).
1. In "Develop > Authentication > Sign-in Method", enable "Google" as a sign-in provider.
1. Use `npm run setup` locally to select the id of the new project (choose whatever you like as the alias).

## Deployment

`npm run deploy`

## Development

Copy `.env` to `.env.local` and add the appropriate values (obtained from the Firebase console):

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
```

Use `npm start` to start the dev server.
