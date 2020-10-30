/**
 * Standardizes a common command protocol :)
 */
export interface IGoogleAnalyticsCommand {
  command: string;
  values: Array<any>;
}
