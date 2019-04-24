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

ionic generate page pages/minivite

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

ionic cordova plugin add cordova-plugin-nativestorage --save
npm install @ionic-native/core@beta --save
npm install @ionic-native/native-storage@beta --save
npm install @ionic-native/network@beta  --save
npm install @ionic/storage --save

# Ionic Native Packages
npm i @ionic-native/camera@beta
npm i @ionic-native/file@beta
npm i @ionic-native/ionic-webview@beta
npm i @ionic-native/file-path@beta

# Cordova Packages
ionic cordova plugin add cordova-sqlite-storage
ionic cordova plugin add cordova-plugin-network-information
ionic cordova plugin add cordova-plugin-camera
ionic cordova plugin add cordova-plugin-file
ionic cordova plugin add cordova-plugin-ionic-webview
ionic cordova plugin add cordova-sqlite-storage
ionic cordova plugin add cordova-plugin-filepath

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

3. Run `ionic cordova resources` to generate all platforms icons and splash.

4. Run `ionic serve -l`, it will automatically generate a local www build and open this in your browser.


```
ionic cordova platform add android
ionic cordova platform add ios
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

[Charts](https://www.djamware.com/post/598953f880aca768e4d2b12b/creating-beautiful-charts-easily-using-ionic-3-and-angular-4)


## Info Ref

[Form Array](https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova)

[Minerals](https://www.webmd.com/food-recipes/guide/vitamins-and-minerals-good-food-sources#1)


## Follow me on LinkedIn

[LinkedIn](https://linkedin.com/in/nditah)
