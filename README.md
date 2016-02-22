#RPG Companion App  

###Instructions for Marker
We have been using [our Trello board](https://trello.com/b/IYE6wlS5/4350) for big-picture user stories, and splitting them up into smaller stories using our [git issues](https://github.com/cameronpenner/SoftwareEngineering2/issues), where we post about the cost and priority, and assign each to a team member.  

Our app uses the [Meteor](https://www.meteor.com/) platform, which uses Javascript for both client and server code. Within Meteor, we are using [React.js](https://facebook.github.io/react/) for UI layout and logic.  

Our app code is found in the `MeteorApp/` directory, and is organized as follows:  
* `client/` contains the only code that is sent to the client when our website is used (with the exception of testing). Within this directory, files are organized in directories by which part of the app they are a part of.  
* `packages/` contains our server code, organized by our two main classes, `campaign/` and `character/`.  
* `public/` contains our `favicon.png` file.  
* `tests/` contains all testing code, which is run on the client by default.  

Please use the `master` branch for marking, as we will be using `develop` for the next iteration.

###Project Overview  
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
"master" is the release branch  
"develop" is the default branch for developing that other branches should be branched off from
