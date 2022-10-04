/**
 * Provide some custom settings for Automatic Router listener behaviour.
 */
export interface IGoogleAnalyticsRoutingSettings {
  /**
   * Exclude the given path to the auto page-view trigger.
   *
   * ```ts
   * @NgModule({
   *    imports: [
   *      NgxGoogleAnalyticsModule.forRoot(...),
   *      NgxGoogleAnalyticsRouterModule.forRoot({ exclude: ['/login', '/internal/*', /regExp/gi] })
   *    ]
   * })
   * AppModule
   * ```
   */
  exclude?: Array<string | RegExp>;

  /**
   * Auto trigger page-view only for allowed uris.
   *
   * ```ts
   * @NgModule({
   *    imports: [
   *      NgxGoogleAnalyticsModule.forRoot(...),
   *      NgxGoogleAnalyticsRouterModule.forRoot({ include: ['/login', '/internal/*', /regExp/gi] })
   *    ]
   * })
   * AppModule
   * ```
   */
  include?: Array<string | RegExp>;
}
