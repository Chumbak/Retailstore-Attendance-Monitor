Installation Instructions
=========================

 - [1.  Initial project setup ](#1-Initial-project-setup)
 - [2. Platform Specific dependencies](#2-Critical-Project-Specific-Dependencies)


## 1. Initial Project Setup
 Project Initialisation involves standard procedures listed below

- **Project initialisation:**

    Clone the repo

      git clone git@github.com:Chumbak/Retailstore-Attendance-Monitor.git

    Install npm modules

      npm install
      npm start - starts up on localhost:8080  

    Standard `react-native run` commands (Platform Specific)

      react-native run-android - Android device/Emulator
      react-native run-ios - iOS Simulator
      react-native run-ios-devicename - iOS devices which have their provisioning profile already created

## 2 .Critical Project Specific Dependencies

- **Firebase for the App:**

  RAM depends on firebase for most of its CRUD operations. Firebase setup for the project has two different approaches for iOS and Android.

  As of this point, both firebase and react-native-fcm have already been installed in the project as they are a part of the package.json file.

  We move on to creating a firebase app which will be integrated into our project

  - **Getting the Initial Firebase keys and APIs**
     - Create a firebase Android App and select the Web project. All the required API keys will be available within the config object.
     - Create a `.env` file that will host all these required API KEYS, Database, hosting URLs.

  This is where the `.env` file must be placed within the project structure

  ```
        android/...
        dashboard/
        functions/
        ios/...
        src/...
        .env <--* //Add here
        .env.tmpl
        index.android.js
        index.ios.js
        package.json
        README.md
  ```

The Keys required and the the template to store them are listed within the `.env.tmpl`


-**Firebase Dependencies for Android**

  The Firebase dependencies for Android version of the app are critical in-terms of the serverless push notifications pushed by GCM.

  For these to be enabled, within the firebase console select a new Android application. Download the `google-services.json` file and add it within the
  `/app` folder within android in the project

  Here's a glance of the positioning of the `google-services.json` file
  ```

      android/...
         ./app
           |--google-services.json <--*//Add here
      dashboard/
      functions/
      ios/...
      src/...
      .env
      .env.tmpl
      index.android.js
      index.ios.js
      package.json
      README.md

  ```


-**Firebase Dependencies for iOS**

Firebase GCM serverless push notifications can instantiated in multiple ways ..either using Cocoa pods as in the official documentation or manually.

We preferred the latter. The initial steps are standard with enabling iOS app in the firebase console and download the google `GoogleService-Info.plist`


```

    android/...
    dashboard/
    functions/
    ios/...
      RetailAttendanceMonitor
        |-- GoogleService-Info.plist <--* //Add here
    src/...
    .env
    .env.tmpl
    index.android.js
    index.ios.js
    package.json
    README.md

```
Apart from these, in order to enable firebase push notifications, you must upload requisite certificates into the iOS app on firebase console. These certificates can be downloaded from the apple developer account console.


-**HockeyApp dependencies**

 - We use HockeyApp for distribution and crash tracking purposes.Create an account on HockeyApp and get the `HOCKEY_APP_ID`. Place it within the `.env` file created above

 - While distribution is simpler for android .apk. For iOS .ipa there needs to be an ios adhoc deployment profile to be created with the user udids if you are willing to distribute via HockeyApp.

-**Cloudinary dependencies**

 - Cloudinary is our Image repository. Create your account in Cloudinary and extract the following `CLOUDINARY_UPLOAD_PRESET` `CLOUDINARY_CLOUDNAME` `CLOUDINARY_API_SECRET` `CLOUDINARY_API_KEY` and add it to the `.env` file
