import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
