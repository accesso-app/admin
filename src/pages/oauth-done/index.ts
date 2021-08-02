import { contract } from 'framework';
import * as page from './page';
import * as model from './model';

export { OauthDonePage as default } from './page';

contract({
  page,
  model,
});
