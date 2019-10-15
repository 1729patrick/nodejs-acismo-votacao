"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _Company = require('../app/models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _Finalist = require('../app/models/Finalist'); var _Finalist2 = _interopRequireDefault(_Finalist);
var _Vote = require('../app/models/Vote'); var _Vote2 = _interopRequireDefault(_Vote);
var _Category = require('../app/models/Category'); var _Category2 = _interopRequireDefault(_Category);

const models = [_Company2.default, _Finalist2.default, _Vote2.default, _Category2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

exports. default = new Database();
