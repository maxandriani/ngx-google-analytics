import { IGoogleAnalyticsCommand } from './i-google-analytics-commant';

export interface IGoogleAnalyticsSettings {
  trackingCode: string;
  initCommands?: Array<IGoogleAnalyticsCommand>;
  uri?: string;
}
