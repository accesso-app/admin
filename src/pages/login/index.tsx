import { contract } from 'framework';
import * as page from './page';
import * as model from './model';

export { LoginPage as default } from './page';

contract({
  page,
  model: {
    ...model,
  },
});

function noop() {}
