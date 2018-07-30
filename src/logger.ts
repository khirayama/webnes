// tslint:disable:no-any
export const logger: {
  call(...args: any[]): void;
  info(...args: any[]): void;
} = {
  call: (functionName: string): void => {
    // tslint:disable-next-line:no-console
    console.log(`%c${functionName}`, 'color: rgba(0, 0, 0, .48)');
  },
  info: (...args: any[]): void => {
    // tslint:disable-next-line:no-console
    console.log(...args);
  },
};
