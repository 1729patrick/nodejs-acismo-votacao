import Sequelize, { Model } from 'sequelize';

class Vote extends Model {
  static init(sequelize) {
    super.init(
      {
        finalist_id: Sequelize.INTEGER,
        company_id: Sequelize.INTEGER,
        category_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Finalist, {
      foreignKey: 'finalist_id',
      as: 'finalist',
    });
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Vote;
