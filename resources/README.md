# pml-online-app


### Installing

If you want to install the project local, you can using following command.

```
git clone https://github.com/Nditah/pml-online-app.git
```

CD into project

```
cd pml-mobile-app/
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

[Deploy] (https://angularfirebase.com/snippets/deploying-ionic4-to-android-and-google-play/)

javac -version


cd /Library/Java/JavaVirtualMachines
sudo rm -rf adoptopenjdk-11.jdk


gradle -version

 ~/Library/Android/sdk/tools/bin/sdkmanager --licenses


# Step 1 - Generate Platform resources ad Run a Production Build

> ionic cordova resources

> cordova build android --release  --stacktrace 



# Step 2 - Generate a Keystore

> keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias



# Step 3 - Sign the APK

> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk my-alias



# Step 4 - Figure out your build tools path

> printenv ANDROID_HOME

> echo $ANDROID_HOME 

> ls ~/Library/Android/sdk/build-tools

> cd /Users/mac/Projects/pml-mobile-app/platforms/android/app/build/outputs/apk/release


# Step 5 - Run zipalign

> ~/Library/Android/sdk/build-tools/28.0.3/zipalign  -v 4 app-release-unsigned.apk AfroCalorie.apk



# Step 6 - Verify the Signature

> ~/Library/Android/sdk/build-tools/28.0.3/apksigner verify  AfroCalorie.apk

