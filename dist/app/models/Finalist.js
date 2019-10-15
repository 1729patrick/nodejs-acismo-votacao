"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Finalist extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        company_id: _sequelize2.default.INTEGER,
        category_id: _sequelize2.default.INTEGER,
        owner_name: _sequelize2.default.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

exports. default = Finalist;
