export default config;

/**
 * Type declarations for
 *    import config from 'test-app/config/environment'
 */
declare const config: {
  APP: Record<string, unknown>;
  environment: string;
  locationType: 'history' | 'hash' | 'none' | 'auto';
  modulePrefix: string;
  podModulePrefix: string;
  rootURL: string;
};
