"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Company extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        social_name: _sequelize2.default.STRING,
        fantasy_name: _sequelize2.default.STRING,
        cnpj: _sequelize2.default.STRING,
        password: _sequelize2.default.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

exports. default = Company;
