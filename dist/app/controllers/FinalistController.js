"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Finalist = require('../models/Finalist'); var _Finalist2 = _interopRequireDefault(_Finalist);
var _Company = require('../models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);

class FinalistController {
  async index(_, res) {
    let finalists = await _Finalist2.default.findAll({
      include: [
        {
          model: _Company2.default,
          as: 'company',
          attributes: { exclude: ['id', 'password'] },
        },
        {
          model: _Category2.default,
          as: 'category',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: ['id', 'owner_name'],
    });

    return res.json({ finalists });
  }
}

exports. default = new FinalistController();
