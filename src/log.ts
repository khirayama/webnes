// tslint:disable:no-any
export const log: {
  info(...args: any[]): void;
} = {
  info: (...args: any[]): void => {
    // tslint:disable-next-line:no-console
    console.log(...args);
  },
};
