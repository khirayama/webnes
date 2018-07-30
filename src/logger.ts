// tslint:disable:no-any
let indent: number = 0;

export const logger: {
  call(...args: any[]): void;
  callEnd(): void;
  info(...args: any[]): void;
} = {
  call: (functionName: string): void => {
    indent += 1;
    const indents: string[] = [];
    for (let i: number = 0; i < indent - 1; i += 1) {
      indents.push(' ');
    }
    // tslint:disable-next-line:no-console
    console.log(`%c${indents.join('') + functionName}`, 'color: rgba(0, 0, 0, .48)');
  },
  callEnd: (): void => {
    indent -= 1;
  },
  info: (...args: any[]): void => {
    // tslint:disable-next-line:no-console
    console.log(...args);
  },
};
