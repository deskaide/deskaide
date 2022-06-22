/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Exposed {
  readonly notification: Readonly<
    typeof import('./src/notification').notification
  >;
  readonly info: Readonly<typeof import('./src/info').info>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window extends Exposed {}
