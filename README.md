# Ukey1 SDK for React

This repository contains the open source React SDK that allows you to access the **[Ukey1 API](http://ukey.one)** from your React app.

## About Ukey1

[Ukey1](http://ukey.one) is *an aggregator of your user's social identities*.
Ukey1 is also a [OAuth 2.0](https://oauth.net/2/) provider but what is more important, it connects all major identity providers
(like [Google](https://developers.google.com/identity/) or [Facebook](https://developers.facebook.com/docs/facebook-login))
into one sophisticated solution. It's the easiest way to login to websites! Read [more](http://ukey.one/).

### Ukey1 flow for this React SDK

1. User clicks to "sign-in" button
  - you may use our [unified sign-in button](https://github.com/asaritech/ukey1-signin-button)
2. SDK sends a connection request to our API and gets a unique Gateway URL
3. User is redirected to Ukey1 Gateway
4. User signs in using their favourite solution and authorizes your app
5. User is redirected back to predefined URL
6. SDK checks the result and gets a unique access token - user is authenticated
7. SDK gets user's data and that's it

### API specification

You can also download our API specification in the following formats:
- [RAML 1.0 specification](https://ukey1.nooledge.com/var/public/api.raml) (learn more about [RAML](http://raml.org/))
- [Swagger 2.0 specification](https://ukey1.nooledge.com/var/public/api.yaml) (learn more about [Swagger](http://swagger.io/) or open the specification in [editor](http://editor.swagger.io/#/))

## Requirements

- [react](https://www.npmjs.com/package/react) ^15.2.0
- [react-device-storage](https://www.npmjs.com/package/react-device-storage) ^1.0.0
- [popsicle](https://www.npmjs.com/package/popsicle) ^9.1.0

## Installation

`npm install --save ukey1-react-sdk`

## Usage

First, you need your `App ID`. Remember that React SDK servers for client-side apps, so *you won't need the Secret Key*!
We also recommend to set the *Client-side protection* in our Developer Console.

### Example

First, let's see how to redirect user to Ukey1 Gateway...

```javascript
import React, { Component } from 'react';
import Ukey1 from 'ukey1-react-sdk';

const UKEY1_APP_ID = 'your-app-id';

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

      // Here is a list of possible grants:
      // - `access_token` (always default)
      // - `email` (access to user's email)
      // - `image` (access to user's thumbnail)
      // NOTE: If you are eligible to use "!" (means a required value), you may use it with `email!` and `image!`
      // NOTE: `refresh_token` is prohibited for client-side integrations!
      scope: ['access_token', 'email', 'image'],

      // This option allows you change the gateway screen (Sign up versus Log in)
      signup: true
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

Then the user is redirected back to your app. You have to handle the event and call authorization method like this:

```javascript
// ...

authorizationEvent() {
  let options = {
    appId: UKEY1_APP_ID,
    success: function (data, dataObj) {
      // This callback is called when user is successfully authorized

      // Store `data` in localStorage or sessionStorage if you want
      // TIP: you can use our open source package `react-device-storage`

      // And do whatever you want
      // Possible `dataObj` usage:

      let userId = dataObj.getId();
      let userFullName = dataObj.getFullName();
      let userForename = dataObj.getForename();
      let userSurname = dataObj.getSurname();
      let userLanguage = dataObj.getLanguage();
      let userCountry = dataObj.getCountry();

      // NOTE: may return null if user don't wanna share their email with your app
      let userEmail = dataObj.getEmail();

      // NOTE: may return null if user don't wanna share their image with your app
      let userImgSrc = dataObj.getImage();
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
