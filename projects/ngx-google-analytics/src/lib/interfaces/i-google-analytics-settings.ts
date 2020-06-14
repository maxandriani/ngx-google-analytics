import { IGoogleAnalyticsCommand } from './i-google-analytics-commant';

/**
 * Standarized an key value objet to configure GA instalation.
 */
export interface IGoogleAnalyticsSettings {
  /** Is mandatory to provide a tracking code folks... */
  trackingCode: string;
  /** You can inject custom initialization commands like UserId or other e-commerce features. */
  initCommands?: Array<IGoogleAnalyticsCommand>;
  /** IF Google changes the uri and I die, you can survive! */
  uri?: string;
  /** If true, trace GA tracking errors on production mode */
  ennableTracing?: boolean;
}
