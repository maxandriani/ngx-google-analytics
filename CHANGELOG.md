# CHANGELOG

* [14.0.0](#14.0.0)
* [13.0.1](#13.0.1)
* [13.0.0](#13.0.0)
* [12.0.0](#12.0.0)
* [11.2.1](#11.2.1)
* [11.2.0](#11.2.0)
* [11.1.0](#11.1.0)
* [11.0.0](#11.0.0)
* [10.0.0](#10.0.0)
* [9.2.0](#9.2.0)
* [9.1.1](#9.1.1)
* [9.1.0](#9.1.0)
* [9.0.1](#9.0.1)
* [9.0.0](#9.0.0)
* [8.1.0](#8.1.0)
* [8.0.0](#8.0.0)

## DISCLAIMER

I open my heart to share this component w/ you guys, buy I don't have much free time to keep this project always up to date, so if you find a Bug or a freek behaviour, please, fell free to open de source code and submit a PR to help yourself and other guys that use this lib too. :)

I will upgrade this pack to any angular major version as soon as possible. Unfortunately I can't replicate new features to old compatibility versions. But you can fork this repo and port does features.

## 14.0.0
* Adding additional optional parameters to allow for more rob… 
* Update to support angular 14 (#96)

## 13.0.1
* Bump Karma
* Bump Jasmine
* Bump RXJS to 7.4.0
* Migrate from TSLint to ESLint

## 13.0.0
* Bump to ng v13

## 12.0.0
* Bump to ng v12

## 11.2.1

* Allow override initial commands

## 11.2.0

* Fixed parameter initCommands on NgxGoogleAnalyticsModule.forRoot() #46
* Allow directive gaBind to trigger on any kind of event. #43

## 11.1.0

* Using enum instead of string type (#38)

## 11.0.0

* Bump to ng v11

## 10.0.0

* Bump to ng v10

## 9.2.0

* Add include/exclude rules feature on NgxGoogleAnalyticsRouterModule.forRoot() to filter witch pages should trigger page-view event.
* Remove `peerDependencies` from package.json to do not trigger unnecessary warnings on `npm install` command.

## 9.1.1

* [Bugfix] Set nonce using `setAttribute`

## 9.1.0

* Add nonce
* Fix typos
* Rename i-google-analytics-command.ts

## 9.0.1

* Created set() method at GoogleAnalyticsService (https://developers.google.com/analytics/devguides/collection/gtagjs/setting-values);
* Changed gtag() method signature at GoogleAnalyticsService to acept anything;
* Added a filter to remove undefined values to rest parameter on gtag() fn;

## 9.0.0

Just bump to Angular ^9.x

## 8.1.0

I finally get some time this weekend and decide to work on some unfinished issues. there it go:

* Created and Updated unit tests on library project;
* Created an automated workflow to run unit tests on each PR;
* Created TypeDocs on all Services, Modules and Directives to help you guys to use this lib;
* Removed bad practices on access Window and Document objects directily by Angular Services. I decided to create Injection Tokens to resolve does Broser Objects.;
* Added some validations to ensure it is a Browser Environment;
* Added cleanup code on NgxGoogleAnalyticsRouterModule. In short, we now unsubscribe Router events when bootstrap app is destroied;
* Added a new Settings property `ennableTracing` to log on console Errors and Warnings about `gtag()` calls;
* Now we have `InjectionToken` for everything. You can replace all our default settings;

## 8.0.0

Sorry, I don't have time to catalog all changes done on the previous versions. You can get a detailed (😂) description of each previous versions on GitHub releases and commit histories. Don't worry, there are nothing still relevant there.
