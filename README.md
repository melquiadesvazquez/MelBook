# MelBook

[![MIT License][license-image]][license-url]

Social network where users can write messages for their followers built with React, Redux, ES6 and Stylus.

Live demo available on http://melbook.surge.sh

## Prerequisites

You need to install the following software on your machine before running this project:

1. Node.js  &ndash; <https://github.com/joyent/node/wiki/Installation>
2. npm (Node package manager)  &ndash; <https://github.com/isaacs/npm>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Download the repository from GitHub

```shell
git clone https://github.com/melquiadesvazquez/MelBook.git
```

Install de project with NPM

```shell
cd MelBook
npm install
```

Copy .env.example to .env and review the values to match your preferences.

```shell
mv .env.example .env
```

Get a development environment running

```shell
npm run start
```

## Testing

Open your browser and go to:

+ Website &ndash; http://localhost:3000
+ Alternatively, check the live demo [here](http://melbook.surge.sh)
+ Login as default user with angryostrich988:r2d2
+ Click "Follow" next to "Don White"
+ Click the logout icon on the top right
+ Login as "Don White" with greenrabbit529:personal
+ Click on Requests and see if you have one from "Louane Vidal"

![MelBook homepage](https://raw.githubusercontent.com/melquiadesvazquez/MelBook/master/src/assets/web1.jpg)

![MelBook posts page](https://raw.githubusercontent.com/melquiadesvazquez/MelBook/master/src/assets/web2.jpg)

![MelBook requests page](https://raw.githubusercontent.com/melquiadesvazquez/MelBook/master/src/assets/web3.jpg)

## Built with

+ [Nodejs](https://nodejs.org/) - JavaScript run-time environment
+ [Create React app](https://github.com/facebook/create-react-app) - JavaScript module bundler
+ [Redux](https://github.com/reduxjs/redux) - Predictable state container for JavaScript apps
+ [Stylus](http://stylus-lang.com/) - CSS preprocessor scripting language

## Restrictions

+ For testing purposes, the user data will be fecth from the randomuser.me database.
+ The rest of data, such us posts, requests and session will be held in the browser localStorage.

## License

[MIT][license-url]

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
