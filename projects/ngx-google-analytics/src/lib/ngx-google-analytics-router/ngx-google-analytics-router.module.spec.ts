import { NgxGoogleAnalyticsRouterModule } from './ngx-google-analytics-router.module';

describe('NgxGoogleAnalyticsRouterModule', () => {
  let ngxGoogleAnalyticsRouterModule: NgxGoogleAnalyticsRouterModule;

  beforeEach(() => {
    ngxGoogleAnalyticsRouterModule = new NgxGoogleAnalyticsRouterModule();
  });

  it('should create an instance', () => {
    expect(ngxGoogleAnalyticsRouterModule).toBeTruthy();
  });
});
