import { contract, withHatch } from 'framework';

import * as model from './model';
import * as page from './page';

export const ApplicationsPage = withHatch(model.hatch, page.ApplicationsPage);

contract({ page, model });
