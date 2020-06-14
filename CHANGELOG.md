# CHANGELOG

* [8.1.0](#8.1.0)
* [8.0.0](#8.0.0)

## DISCLAIMER

I open my heart to share this component w/ you guys, buy I don't have much free time to keep this projeto always up to date, so if you findo a Bug or a freek behaviour, please, fell free to open de source code and submit a PR to help yourself and other guys that use this lib too. :)

I will upgrade this pack to any angular major version as soon as possible. Unfortunately I can't replicate new features to old compatibility versions. But you can fork this repo and port does features.

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