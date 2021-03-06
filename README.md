# :eyeglasses: Spark Goggles [![CircleCI](https://circleci.com/gh/promptworks/spark-goggles.svg?style=svg&circle-token=7a0f4585726eb1d7e5bb1a0c33539faa485804ee)](https://circleci.com/gh/promptworks/spark-goggles)

## :point_up: How to Setup

**Step 1:** Run `git clone git@github.com:promptworks/spark-goggles`.

**Step 2:** Run `cd spark-goggles`.

**Step 3:** Install the dependencies by running `yarn install`.

**Step 4:** Run `yarn start` to start the React Native packager.

You can see the debugger interface at [http://localhost:8081/debugger-ui/](http://localhost:8081/debugger-ui/).

## :rocket: How to run the App

First, you'll need to install the Android SDK. Next, you can either run the app on a device or on an emulator.

#### Emulator

1. Run `yarn android:emulator:create` to create an Android virtual device.
2. Run `yarn android:emulator` to start the emulator in a tab.
3. Open another tab, run `yarn android` to launch the app.

#### Device

1. On the device, go into `Settings > About`.
2. Find the build number. Tap it a bunch of times until it says "You've unlocked developer mode".
3. Go back to the main settings menu.
4. Find the developer settings section and find "USB Debugging". Make sure it's set to on.
5. Run `yarn android` to launch the app.

#### Tips

* If your device isn't cooperating, run `yarn android:devices` to see the list of connected devices. When correctly configured, the second column should say `device`.
* To access some of the development settings, you can shake an android device. If you're using the emulator, you can run `yarn android:shake`.

## :no_entry_sign: Linting

To run the linter, run `yarn lint`. You can fix some of the errors automatically with `yarn lint:fix`. The linter will run automatically when you commit.

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

## :white_check_mark: Testing

You can run the tests with `yarn test`.

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```javascript
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

## :package: Adding a Native package

If you add a package that contains Java or ObjC code, you'll need to link it. To do so, you'll simply run `yarn react-native link`.

After linking, you'll want to re-build the app entirely: `yarn android`.

## :shipit: Generating a release

First, you'll need a `.keystore` file. To generate this file, you can run `yarn keytool`. Answer each question, and don't forget the passwords you've chosen!

After running this script, you should find a file called `android/app/spark-goggles.keystore`. If you plan to release the app to Google Play, you'll want to make sure that you don't lose this file.

Next, you'll need to configure a few build variables. You'll need to drop the following configuration in `~/.gradle/gradle.properties`:

```
SPARK_GOGGLES_RELEASE_STORE_FILE=spark-goggles.keystore
SPARK_GOGGLES_RELEASE_KEY_ALIAS=spark-goggles
SPARK_GOGGLES_RELEASE_STORE_PASSWORD=*****
SPARK_GOGGLES_RELEASE_KEY_PASSWORD=*****
```

Finally, to build an `.apk` file, you can run `yarn android:build`. This will generate `android/app/build/outputs/apk/app-release.apk`.

For more information, consult the [React Native documentation](https://facebook.github.io/react-native/docs/signed-apk-android.html).

*NOTE:* It is imperative that you don't commit the .keystore file or any passwords.
