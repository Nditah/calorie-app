# Calorie App

Check our weight and calorie with AfroCalorie App. Loaded with African diets and lots of common sports and workouts.

## Getting Started

In this Project I’m using side menu template of Ionic 4. If you already have a project then you can go to [Calorie App](https://github.com/Nditah/calorie-app) and copy only files.


### Prerequisites

[Ionic Framework Docs](https://ionicframework.com/docs/)

[Node](https://nodejs.org/)

Generate pages, services:

ionic start appName sidemenu --type=angular

ionic generate page pages/landing

ionic generate page pages/auth/login

ionic generate page pages/auth/register

ionic generate page pages/dashboard


ionic generate page pages/food

ionic generate page pages/food-detail

ionic generate page pages/food-edit

ionic generate page pages/food-add


ionic generate service services/auth

ionic generate service services/alert

ionic generate service services/env

ionic generate service services/api

ionic generate guard guard/auth

ionic g service services/interceptor


ionic cordova plugin add cordova-plugin-nativestorage

npm install @ionic-native/native-storage

### Installing

If you want to install the project local, you can using following command.

```
git clone https://github.com/Nditah/calorie-app.git
```

CD into project

```
cd calorie-app/
```

Install Node Modules

```
npm install
```

##  Run


```
ionic serve -l

ionic cordova platform add browser

ionic cordova run browser
```

run after attaching device

```
ionic cordova run android 
```
## Deployment

[iOS Setup](https://ionicframework.com/docs/installation/ios)

[Andriod Setup](https://ionicframework.com/docs/installation/android)

## Built With

[Ionic Framework](https://ionicframework.com/)

[Charts] (https://www.djamware.com/post/598953f880aca768e4d2b12b/creating-beautiful-charts-easily-using-ionic-3-and-angular-4)


## Follow me on LinkedIn

[LinkedIn](https://linkedin.com/in/nditah)
