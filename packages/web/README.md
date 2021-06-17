# Apollofy Web App

Client App for the Apollofy project.

## Repo

- [apollofy-music-project](https://github.com/assembler-school/apollofy-music-project.git)

## Getting Started

### Install Dependencies

This is a monorepo app made with Yarn. Therefore, you will need to run `yarn` in
the root and then the individual scripts of each package.

The `web` package will be run by default in the following url:
`http://localhost:3000`.

### Folder structure

- `packages/web/src/api`: a base axios wrapper for easying the api calls
- `packages/web/src/assets`: the folder with img assets used along the app
- `packages/web/src/components`: the custom ui components used along the app
- `packages/web/src/pages`: the pages used along the app
- `packages/web/src/redux`: the redux logic of all reducers
- `packages/web/src/routes`: the routes to which pages are associated with
- `packages/web/src/schema`: the models schema normalizations used for handling
  api responses
- `packages/web/src/services`: the services used in the app, auth, cloudinary
- `packages/web/src/styles`: tailwind styles import and base app styles
- `packages/web/src/utils`: helper functions

### Technologies used

- axios
- chart JS
- cloudinary
- craco
- firebase
- formik
- normalizr
- prop-types
- particle JS
- react
- redux
  - redux-persist
  - redux-thunk
  - redux-devtools-extension
  - redux-logger
- reselect
- react-router-dom
- tailwindcss
- yup

### Firebase

This app uses Firebase Auth as the auth provider, so you will need to configure
it first.

You can follow this guide on enabling Firebase Auth:
[Assembler School: Node.js REST API Design Intro Workshop](https://github.com/assembler-school/nodejs-rest-api-design-intro-workshop/tree/05-firebase-auth-testing#firebase-auth-1)

Once you have created a firebase app in the firebase console, you will need to
copy the settings and paste each value of the config object as environment
variables.

### Cloudinary

This app uses Cloudinary as the multimedia management library, so you will need
to configure it as well.

You can follow this guide on creating a Cloudinary account:
[Live Session Coding - CLOUDINARY](https://docs.google.com/presentation/d/1ul3frmE9u8Z_g3cI1p6Dm1RlXODx35gFuH5H6BuTkjo/edit?usp=sharing)

### Environment variables

These are the required environment variables for the config of the app. Keep in
mind the name of the variables needs to be starting with the prefix
`REACT_APP_<varName>` in order to be read correctly.

The ones that start with `FB*` are needed for the Firebase Admin config. These
are all used in the `packages/web/src/services/auth/auth.js` file:

```js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
```

## Env variables

```bash
# .env
REACT_APP_API_KEY=...
REACT_APP_AUTH_DOMAIN=...
REACT_APP_PROJECT_ID=...
REACT_APP_STORAGE_BUCKET=...
REACT_APP_MESSAGING_SENDER_ID=...
REACT_APP_APP_ID=...
REACT_APP_API_BASE_URL=http://localhost:4000
REACT_APP_CLOUDINARY_CLOUDNAME=...
REACT_APP_CLOUDINARY_API_KEY=...
REACT_APP_CLOUDINARY_SONG_UPLOAD_PRESET=...
REACT_APP_CLOUDINARY_IMAGE_UPLOAD_PRESET=...
```

### Web App Running

If you are in the `root` folder level, run the following command to start the
web app

```bash
yarn run dev:web
```

In case you are in the `package/web` folder level, simply run:

```bash
yarn run dev
```

## License

Licensed under the [MIT License](./LICENSE).
