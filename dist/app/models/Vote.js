"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Vote extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        finalist_id: _sequelize2.default.INTEGER,
        company_id: _sequelize2.default.INTEGER,
        category_id: _sequelize2.default.INTEGER,
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

exports. default = Vote;
