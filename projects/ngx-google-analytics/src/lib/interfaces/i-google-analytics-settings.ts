import { IGoogleAnalyticsCommand } from './i-google-analytics-command';

/**
 * Standardize a key-value object to configure GA installation.
 */
export interface IGoogleAnalyticsSettings {
  /** It's mandatory to provide a tracking code folks... */
  trackingCode: string;
  /** 
   * You can inject custom initialization commands like UserId or other e-commerce features.
   * If set, it will run any GA Commands in sequence after setup GA environment.
   */
  initCommands?: Array<IGoogleAnalyticsCommand>;
  /** 
   * If Google changes the uri and I die, you can survive!
   * When set, it will change the default js script URI to the provided one.
   */
  uri?: string;
  /** If true, trace GA tracking errors in production mode */
  enableTracing?: boolean;
  /** If set, nonce will be added to script tag **/
  nonce?: string;
}

export type IGoogleAnalyticsModuleSettings = Exclude<IGoogleAnalyticsSettings, 'trackingCode'>;
