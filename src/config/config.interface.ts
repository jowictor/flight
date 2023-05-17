/**
 * Configuration data for the app.
 */

export interface ConfigData {
  /**
   * The name of the environment.
   * @example 'sandbox', 'dev', 'production'
   */
  env: string;

  /** The port number of the http server to listen on. */
  port: number;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel?: string;

  /** The mongo string connection */
  mongo: string;

}
