import { contract, withHatch } from 'framework';

import * as model from './model';
import * as page from './page';

contract({ page, model });

export const UsersViewPage = withHatch(model.hatch, page.UsersViewPage);
