import faker from 'faker';
import { factory } from 'factory-girl';

import Company from '../src/app/models/Company';
import Finalist from '../src/app/models/Finalist';
import Category from '../src/app/models/Category';

factory.define('Company', Company, {
  social_name: faker.name.findName(),
  fantasy_name: faker.name.findName(),
  cnpj: faker.name.findName(),
  password: faker.internet.password(),
});

factory.define('Category', Category, {
  name: faker.name.findName(),
  size: faker.name.findName(),
});

factory.define('Finalist', Finalist, {
  owner_name: faker.name.findName(),
  company_id: factory.assoc('Company', 'id'),
  category_id: factory.assoc('Category', 'id'),
});

export default factory;
