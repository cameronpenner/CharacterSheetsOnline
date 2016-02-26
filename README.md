#RPG Companion App  

###Instructions for Marker
We have been using [our Trello board](https://trello.com/b/IYE6wlS5/4350) for big-picture user stories, and splitting them up into smaller stories, developer tasks, and bugs using our [iteration 2 git issues](https://github.com/cameronpenner/SoftwareEngineering2/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Iteration+2%22), where we post about the cost and priority, and assign each to a team member. Alternatively, our contributions to this iteration are summed up in [this document](https://docs.google.com/document/d/1VZ51a9XeNEVHGBGt0svqGsoXaxb3YFXm0-SYghIq-Gc/edit?usp=sharing); and our evaluation of last iteration's process and things to change for this iteration on [this trello board](https://trello.com/b/UY0zflXQ/retro-iteration-1). Our DDP documentation and justification is [here](https://docs.google.com/document/d/15u_med2RhxHqvzpFxNDgSYxE5a1q1_Pj2FRalbPUYQg/edit?usp=sharing).  

Please use the `master` branch for marking.  

###Project Overview
Our app code is found in the `MeteorApp/` directory, and is organized into `client/`, `server/` and `both/` directories, for code that runs on the client, server, and both the client and server, respectively. Within each of these directories are directories such as `character/` and `campaign/` which specify which functional part of the app or user story the code within them is for. Unit and integration tests are separated into the `MeteorApp/tests/` directory and are run automatically within the app when it is built. An additional note on our project's design pattern can be found [here](https://docs.google.com/document/d/1vymuKmtHZd4tbO8SAMZfaR9r_FIGkbHxl9ZcOTyFBr0/edit?usp=sharing)  

Our app is based on the [Meteor](https://www.meteor.com/) platform, which uses Javascript for both client and server code. Within Meteor, we are using [React.js](https://facebook.github.io/react/) for UI layout and logic.  

See the following links for more documentation:  
   [Project Vision](https://docs.google.com/document/d/1vjb-VSGzE597DyjM7nernY6ocQbtDChBV6MGlIx8y2M/edit)  
   [Technology](https://docs.google.com/document/d/1-QhJxHtYhCSyte3LNl1k16DtLTLiLlqqZ8P3DW_PkMM/edit)  
   [User Flow Map](https://docs.google.com/drawings/d/1xkV3fqgLv9Vz-iEGV-DE5ZwTQiR9ZMqnLL53eOsDK2o/edit?usp=sharing)  
   [Database Model](https://docs.google.com/spreadsheets/d/14O9qqzI_PcDS76ECVIxYLPFbdDCoeWQ6UM7BqzKDce4/edit?usp=sharing)  
   [Database Relationships](https://docs.google.com/drawings/d/1Q1mSQB5q5122A_x4M2EyA5StGdyv11w7h7c4ZVCXBAQ/edit?usp=sharing)  
   [Meteor Diagram](https://docs.google.com/drawings/d/1AlJED4PdlEZFEkn0a4w8DTdLhixfg7OfRQHyjip_fig/edit?usp=sharing)  
   [Architecture Diagram](https://docs.google.com/drawings/d/1fKzn2iSpk6Bu2LMwaYCE5Bkbep8kTizcBKqvfKNS42Y/edit?usp=sharing)  

###User Stories  
[Big user stories](https://trello.com/b/IYE6wlS5/4350)  

###Meeting Minutes  
[Meeting history](https://drive.google.com/folderview?id=0B9MCO8Sk7I1dbzlzcTJmajBTTDg&usp=sharing)  

Please note that electronic discussion regarding the project is recorded in a Slack channel. Please contact a team member for an invite (we would need your email).  

###Installation
This installation guide is based on the [Meteor Installation Guide](https://www.meteor.com/install). Our app is built on Meteor 1.2.1 and has the following package dependencies:  
* accounts-password         1.1.4  Password support for accounts
* aldeed:collection2        2.8.0 Automatic validation of insert and update operations on the client and server.
* blaze-html-templates      1.0.1  Compile HTML templates into reactive UI with Meteor Blaze
* ecmascript                0.1.6 Compiler plugin that supports ES2015+ in all .js files
* es5-shim                  4.1.14  Shims and polyfills to improve ECMAScript 5 support
* jquery                    1.11.4  Manipulate the DOM using CSS selectors
* meteor-base               1.0.1  Packages that every Meteor app needs
* mobile-experience         1.0.1  Packages for a great mobile user experience
* mongo                     1.1.3  Adaptor for using MongoDB and Minimongo over DDP
* react                     0.14.3 Everything you need to use React with Meteor.
* reactrouter:react-router  1.0.3  react-router (official): A complete routing solution for React.js
* sanjo:jasmine             0.21.0  Velocity integration of the Jasmine testing framework
* session                   1.1.1  Session variable
* standard-minifiers        1.0.2  Standard minifiers used with Meteor apps by default.
* tracker                   1.0.9  Dependency tracker to allow reactive callbacks
* twbs:bootstrap            3.3.6  The most popular front-end framework for developing responsive, mobile first projects on the web.
* velocity:html-reporter    0.9.1  Reactive Velocity test reports in your app.

on OSX or Linux, use `curl https://install.meteor.com/ | sh` to install the latest version of the Meteor Dev Kit. Once meteor is installed, clone this repository and `cd` into the MeteorApp/ directory and type `meteor`. The app will build and provide server output in the terminal. The web app will be available at `localhost:3000`.

###Unit Tests
To run the server side unit tests, set the environment variable JASMINE_SERVER_UNIT=1.

###Note about branches:  
"master" is the release branch (use this for marking)  
"develop" is the default branch for developing that other branches should be branched off from
