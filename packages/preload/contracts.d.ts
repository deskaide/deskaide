/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Exposed {
  readonly info: Readonly<typeof import('./src/info').info>;
  readonly notification: Readonly<
    typeof import('./src/notification').notification
  >;
  readonly showWindow: Readonly<typeof import('./src/showWindow').showWindow>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window extends Exposed {}
