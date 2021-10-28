import { contract, withHatch } from 'framework';

import * as model from './model';
import * as page from './page';

contract({ page, model });

export const RegistrationRequestsPage = withHatch(model.hatch, page.RegistationRequestsPage);
