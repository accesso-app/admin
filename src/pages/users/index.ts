import { contract, withHatch } from 'framework';

import * as model from './model';
import * as page from './page';

contract({ page, model });

export const UsersPage = withHatch(model.hatch, page.UsersPage);
