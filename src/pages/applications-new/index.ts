import { contract, withHatch } from 'framework';

import * as model from './model';
import * as page from './page';

contract({ page, model });

export const ApplicationsNewPage = withHatch(model.hatch, page.ApplicationsNewPage);
