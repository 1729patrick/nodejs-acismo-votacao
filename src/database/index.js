import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Company from '../app/models/Company';
import Finalist from '../app/models/Finalist';
import Vote from '../app/models/Vote';
import Category from '../app/models/Category';

const models = [Company, Finalist, Vote, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
