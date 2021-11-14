import { contract, withHatch } from 'framework';

import * as model from './model';
import * as page from './page';

contract({ page, model });

export const ApplicationsEditPage = withHatch(model.hatch, page.ApplicationsEditPage);
