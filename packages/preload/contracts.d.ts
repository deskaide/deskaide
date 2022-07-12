/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Exposed {
  readonly info: Readonly<typeof import('./src/info').info>;
  readonly notification: Readonly<
    typeof import('./src/notification').notification
  >;
  readonly manageWindow: Readonly<
    typeof import('./src/manageWindow').manageWindow
  >;
  readonly manageTimer: typeof import('./src/manageTimer').manageTimer;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window extends Exposed {}
