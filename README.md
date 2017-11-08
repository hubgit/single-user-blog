## Setup

`firebase init` (enable "Database" and "Hosting", set "build" as the public directory, answer "yes" to "configure as a single-page app?")

## Development

Add the Firebase config values for the app to `src/config.js`:

```js
module.exports = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL"
}
```

`npm start`

## Deployment

`npm run build && firebase deploy`
