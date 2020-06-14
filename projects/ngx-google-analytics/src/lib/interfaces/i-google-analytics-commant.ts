/**
 * Standarizes a common comand protocol :)
 */
export interface IGoogleAnalyticsCommand {
  command: string;
  values: Array<any>;
}
