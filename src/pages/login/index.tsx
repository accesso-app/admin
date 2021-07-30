import { contract } from 'framework';
import * as page from './page';
import * as model from './model';

export { LoginPage as default } from './page';

contract({
  page,
  model: {
    ...model,
    loginBtnClicked: model.loginClicked.prepend(() => noop),
  },
});

function noop() {}
