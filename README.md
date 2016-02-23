#RPG Companion App  

###Instructions for Marker
We have been using [our Trello board](https://trello.com/b/IYE6wlS5/4350) for big-picture user stories, and splitting them up into smaller stories using our [iteration 2 git issues](https://github.com/cameronpenner/SoftwareEngineering2/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Iteration+2%22), where we post about the cost and priority, and assign each to a team member. We have also recorded our contributions to the project using [this document](https://docs.google.com/document/d/1VZ51a9XeNEVHGBGt0svqGsoXaxb3YFXm0-SYghIq-Gc/edit?usp=sharing).  

Please use the `master` branch for marking.  

###Project Overview
Our app code is found in the `MeteorApp/` directory, and is organized into `client/`, `server/` and `both/` directories, for code that runs on the client, server, and both the client and server, respectively. Within each of these directories are directories such as `character/` and `campaign/` which specify which functional part of the app or user story the code within them is for. Unit and integration tests are separated into the `MeteorApp/tests/` directory and are run automatically within the app when it is built.  

Our app is based on the [Meteor](https://www.meteor.com/) platform, which uses Javascript for both client and server code. Within Meteor, we are using [React.js](https://facebook.github.io/react/) for UI layout and logic.  

See the following links for more of our documentation:  
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
Follow the [Meteor Installation Guide](https://www.meteor.com/install). Once meteor is installed, `cd` into the MeteorApp/ directory and run `meteor`. The app will be available in your web browser at `localhost:3000`.

###Unit Tests
To run the server side unit tests, set the environment variable JASMINE_SERVER_UNIT=1.

###Note about branches:  
"master" is the release branch (use this for marking)  
"develop" is the default branch for developing that other branches should be branched off from
