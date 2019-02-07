# Ngx Google Analytics

An easy implementation to track ga on angular6+ apps.

**@TODO:** 
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

## Call GA Events

```ts
import { Component } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component( ... )
export class TestFormComponent {

  constructor(
    protected $gaService: GoogleAnalyticsService
  ) {}

  onUserInputName() {
    ...
    this.$gaService.event('enter_name', 'user_register_form', 'Name');
  }

  onUserInputEmail() {
    ...
    this.$gaService.event('enter_email', 'user_register_form', 'Email');
  }

  onSubmit() {
    ...
    this.$gaService.event('submit', 'user_register_form', 'Enviar');
  }

}
```

## Call GA Page Views and Virtual Page Views

```ts
import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component(...)
export class TestPageComponent implements OnInit {

  constructor(
    protected $gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.$gaService.pageView('/teste', 'Teste de Title')
  }

  onUserLogin() {
    ...
    this.$gaService.pageView('/teste', 'Teste de Title', undefined, {
      user_id: 'my-user-id'
    })
  }

}
```

## GA Directives

You can use angular directives to call GA events.

### Simple directive use

```js
<div>
  <button gaEvent gaCategory="ga_directive_test" gaAction="click_test">Click Test</button>
  <button gaEvent gaCategory="ga_directive_test" gaAction="focus_test" gaBind="focus">Focus Test</button>
  <button gaEvent gaCategory="ga_directive_test" gaAction="blur_test" gaBind="blur">Blur Test</button>
</div>
```

### Simple input use
```js
<div>
  <input gaEvent gaCategory="ga_directive_input_test" gaAction="fill_blur" placeholder="Auto Blur Test">
</div>
```

### Grouped directives
```js
<div gaCategory="ga_test_category">
  <button gaEvent gaAction="click_test">Click Test</button>
  <button gaEvent gaAction="focus_test" gaBind="focus">Focus Test</button>
  <button gaEvent gaAction="blur_test" gaBind="blur">Blur Test</button>
</div>
```

## Tracking Angular Router

Add ```NgxGoogleAnalyticsRouterModule``` on AppModule to auto track Angular's Router class and trigger a page view after nagivation.

```ts
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
...

@NgModule({
  ...
  imports: [
    ...
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule
  ]
})
export class AppModule {}
```