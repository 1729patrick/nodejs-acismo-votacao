import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        social_name: Sequelize.STRING,
        fantasy_name: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Company;
