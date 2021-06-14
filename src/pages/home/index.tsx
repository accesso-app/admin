import { contract } from 'framework';
import * as page from './page';
import * as model from './model';

export { HomePage as default } from './page';

contract({
  page,
  model: {
    ...model,
    incrementClicked: model.incrementClicked.prepend(() => void 0),
    resetClicked: model.resetClicked.prepend(() => void 0),
  },
});
