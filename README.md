# Apollofy Music Project

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Server and Client App for the Apollofy Music Project.

## Apps

- [packages/web](packages/web/README.md)
- [packages/api](packages/api/README.md)

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

See the `README.md` files in each one of the `packages/*`.

### Monorepo

This is a monorepo created with Yarn. The packages are `api` and `web`. Each one
has scripts that can be executed either individually or from the root of the
monorepo. See each `package.json` file to learn what scripts are available.

## Contents and Branches Naming Strategy

The repository is made up of several branches that include the contents of each
section.

The branches follow a naming strategy like the following:

- `main`: includes the main contents and the instructions
- `assembler-solution`: includes the solution
- `assembler-solution-dev`: includes the solution under development
- `live-session-authentication`: includes the implementation of a basic user
  authentication
- `live-session-songs`: includes the implementation of the create/fetch songs
  features
- `live-session-playlists`: includes the implementation of the create/fetch
  playlists features
- `live-session-statistics`: includes the implementation of the create/fetch
  statistics features

### Fetching All the Branches

In order to fetch all the remote branches in the repository, you can use the
following command:

```sh
$ git fetch --all
```

### List Both Remote Tracking Branches and Local Branches

```sh
$ git branch --all
```

Then, you can create a local branch based on a remote branch with the following
command:

```sh
$ git checkout -b <new_branch_name> <remote_branch_name>
```

## Installing

First, you will need to install the dependencies with: `yarn install`.

Run the following command in your terminal after cloning the main repo:

```sh
$ yarn install
```

## Linting and formatting

This project is setup using eslint and prettier for linting and code formatting.

At Assembler School, we recommend that all our students use them since they
provide great value with too much additional effort.

Furthermore, it also includes the `husky` and `lint-staged` packages that allow
you to run scripts on the files in the Git staging area before each commit or
before pushing changes to a remote repo.

## Technologies used

### Server Side

- axios
- body-parser
- express
- firebase-admin
- geoip-lite
- mongoose

### Client Side

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

## License

Licensed under the [MIT License](./LICENSE).

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.danilucaci.com"><img src="https://avatars.githubusercontent.com/u/19062818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dani Lucaci</b></sub></a><br /><a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Code">💻</a> <a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Tests">⚠️</a> <a href="#content-danilucaci" title="Content">🖋</a> <a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Documentation">📖</a> <a href="#ideas-danilucaci" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-danilucaci" title="Maintenance">🚧</a> <a href="#mentoring-danilucaci" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-danilucaci" title="Project Management">📆</a> <a href="#tool-danilucaci" title="Tools">🔧</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/joan-carri%C3%B3n-anaya-a074851a0/"><img src="https://avatars.githubusercontent.com/u/43220742?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joan Carrión Anaya</b></sub></a><br /><a href="https://github.com/assembler-school/Apollofy/commits?author=JCarri14" title="Code">💻</a> <a href="#content-JCarri14" title="Content">🖋</a> <a href="#data-JCarri14" title="Data">🔣</a> <a href="#design-JCarri14" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
