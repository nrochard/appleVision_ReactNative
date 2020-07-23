var environments = {
    staging: {
      FIREBASE_API_KEY: 'AIzaSyCRDB0bvCEjAdi9CY-iin4xkePJ_3W22tY',
      FIREBASE_AUTH_DOMAIN: 'applevison-b3b3d.firebaseapp.com',
      FIREBASE_DATABASE_URL: 'https://applevison-b3b3d.firebaseio.com',
      FIREBASE_PROJECT_ID: 'applevison-b3b3d',
      FIREBASE_STORAGE_BUCKET: 'applevison-b3b3d.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '966050005520',
      GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyAasDfTHRP1ubprCAsIRTjyVqF8GPdL1EU'
    },
    production: {
      // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };

  function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
      return "staging";
    } else if (releaseChannel === "staging") {
      return "staging";
    } else {
      return "staging";
    }
  }

  function getEnvironment(env) {
    console.log("Release Channel: ", getReleaseChannel());
    return environments[env];
  }
  
  var Environment = getEnvironment(getReleaseChannel());
  export default Environment;