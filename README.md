# react-native-login
User authentication screen for react-native using react-redux and firebase

# How to run

- You need to have Android Studio and a virtual device setup and ready to use.
Please refer https://facebook.github.io/react-native/docs/getting-started.html for more details on that.

- After creating a branch or taking a local copy, Please run the following command to link additionaly added native libraries.  
```sh
react-native link"
```

- After that, open up the the Android Studio amd then load the Android peoject inside the main project folder.
And then re-build the project in Android Studio to fix some of the android refernces issues.

- Run the app in a emulator
Now you first run the android emulator and then run the following command.
"react-native run-android" and the app will show up in the emmulator. 

- Run the app in your mobile 
If you want to test it in an actual device, please run the follwoing command after connecting the mobile to the machine.
```sh
"npm run device"
```
Please check here for more details on how to connect an actual device.
https://facebook.github.io/react-native/docs/running-on-device.html

