import Sequelize, { Model } from 'sequelize';

class Finalist extends Model {
  static init(sequelize) {
    super.init(
      {
        company_id: Sequelize.INTEGER,
        category_id: Sequelize.INTEGER,
        owner_name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
    this.hasMany(models.Vote, { foreignKey: 'finalist_id', as: 'vote' });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Finalist;
