// tslint:disable:no-relative-imports
import * as assert from 'power-assert';

import { main } from '../src/index';

describe('index', () => {
  describe('main', () => {
    it('Runable', () => {
      assert.doesNotThrow(() => {
        main();
      });
    });
  });
});
