# Ngx Google Analytics

An easy implementation to track ga on angular6+ apps.

**@TODO:** 
* Create service wrapper to ga commands;
* Create an Ng Router Helper;
* Create unit tests;

## Install

```
npm install ngx-google-analytics
```

## Feedbacks

https://github.com/maxandriani/ngx-google-analytics

## Simple Configuration

```ts
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxGoogleAnalyticsModule.forRoot('traking-code')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
