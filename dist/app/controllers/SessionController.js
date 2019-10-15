"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Company = require('../models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
class SessionController {
  async store(req, res) {
    let { cnpj, password } = req.body;

    let company = await _Company2.default.findOne({
      where: { cnpj },
    });

    if (!company) {
      return res.status(404).json({
        error: 'CNPJ não encontrado, altere o CNPJ e tente novamente',
      });
    }

    if (company.password !== password) {
      return res.status(401).json({
        error:
          'Senha incorreta, parece que a senha que você digitou esta errada',
      });
    }

    const token = _jsonwebtoken2.default.sign({ companyId: company.id }, process.env.APP_SECRET);

    const { id, social_name, fantasy_name } = company;

    return res.json({
      company: { id, social_name, fantasy_name, cnpj },
      token,
    });
  }
}

exports. default = new SessionController();
