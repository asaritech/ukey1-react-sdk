# Ukey1 SDK for React

This repository contains the open source React SDK that allows you to access the **[Ukey1 API](https://ukey.one)** from your React app.

**!!! Please note that versions older than 2.0.0 are deprecated and don't work since November 15, 2017 !!!**

## About Ukey1

[Ukey1](https://ukey.one) is an Authentication and Data Protection Service with the mission to enhance security of websites. 
The service is designed to help you with EU GDPR compliance.

### Ukey1 flow for this React SDK

1. User clicks to "sign-in" button
   - you can use our [unified sign-in button](https://github.com/asaritech/ukey1-signin-button) if you want
2. SDK sends a connection request to our API and gets a unique Gateway URL
3. User is redirected to Ukey1 Gateway
4. User signs in using their favourite solution and authorizes your app
5. User is redirected back to predefined URL
6. SDK checks the result and gets a unique access token - user is authenticated
7. That's it - user is authenticated (your app can make API calls to get user's data)

### API specification

- [API specification](https://ukey1.docs.apiary.io/)
- [Documentation](https://asaritech.github.io/ukey1-docs/)

## Requirements

- [react](https://www.npmjs.com/package/react) ^15.2.0
- [react-device-storage](https://www.npmjs.com/package/react-device-storage) ^1.0.0
- [popsicle](https://www.npmjs.com/package/popsicle) ^9.1.0

## Installation

`npm install --save ukey1-react-sdk`

## Usage

First, you need your [App ID](https://dashboard.ukey.one/developer). Remember that React SDK serves for client-side apps, so *you won't need the Secret Key*!
In our dashboard, we also recommend to activate Domain and Return URL Protection.

### Example

First, let's see how to redirect user to Ukey1 Gateway...

```javascript
import React, { Component } from 'react';
import Ukey1 from 'ukey1-react-sdk';

const UKEY1_APP_ID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

class MyApp extends Component {
  // ...

  loginEvent(e) {
    e.preventDefault();

    let options = {
      appId: UKEY1_APP_ID,

      // This is an URL for redirection back to the app
      // Do you know what is absolutely perfect?
      // - it may be unique
      // - it may contain query parameters and/or fragment
      returnUrl: 'http://example.org/login?action=check&user=XXX#fragment',

      // See the full list of permissions: https://asaritech.github.io/ukey1-docs/Docs/Permissions/#data-fields
      scope: ['firstname', 'email']
    };

    try {
      new Ukey1().connect(options);
    } catch (error) {
      console.log('Something was wrong', error);
    }
  }

  render() {
    return (
      <div>
        <a href="#" className="ukey1-button" onClick={this.loginEvent}>Sign in via Ukey1</a>
      </div>
    );
  }
}

export default MyApp;
```

Once the user authorizes your app, Ukey1 redirects the user back to your app to the URL you specified earlier. 
The same is done if user cancels the request. You have to handle the event and call authorization method like this:

```javascript
// ...

authorizationEvent() {
  let options = {
    appId: UKEY1_APP_ID,
    success: function (data, dataObj) {
      // This callback is called when user is successfully authorized

      // And do whatever you want
      // Possible `dataObj` usage:

      let userId = dataObj.id();

      // Please note that everything excepts ID and mandatory fields may be empty if the user decides to not to grant you access to that field
      let userFirstname = dataObj.firstname();
      let userEmail = dataObj.email();
    }.bind(this),
    finished: function (success) {
      // This callback is called everytime (even if request is successful or not)
    }
  };

  try {
    new Ukey1().accessToken(options);
  } catch (error) {
    console.log('Something was wrong', error);
  }
}

// ...
```

We have also prepared a working [example](https://github.com/noo-zh/ukey1-react-sdk-example) - get to know how to implement our SDK quickly!

## License

This code is released under the MIT license. Please see [LICENSE](https://github.com/asaritech/ukey1-react-sdk/blob/master/LICENSE) file for details.

## Contributing

If you want to become a contributor of this React SDK, please first contact us (see our email below).
If you would like to work on another SDK (in your favorite language), we will glad to know about you too!

## Contact

Reporting of any [issues](https://github.com/asaritech/ukey1-react-sdk/issues) are appreciated.
If you want to contribute or you have a critical security issue, please write us directly to [developers@asaritech.com](mailto:developers@asaritech.com).
