import * as page from './page';
import * as model from './model';
import { contract, withHatch } from 'framework';

export const ApplicationsPage = withHatch(model.hatch, page.ApplicationsPage);

contract({ page, model });
