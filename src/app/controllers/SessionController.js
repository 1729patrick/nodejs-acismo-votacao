import Company from '../models/Company';
import jwt from 'jsonwebtoken';
class SessionController {
  async store(req, res) {
    let { id, password } = req.body;

    let company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        error: 'Código não encontrado, altere o código e tente novamente',
      });
    }

    if (company.password !== password) {
      return res.status(401).json({
        error:
          'Senha incorreta, parece que a senha que você digitou está errada',
      });
    }

    const token = jwt.sign({ companyId: company.id }, process.env.APP_SECRET);

    const { social_name, fantasy_name, cnpj } = company;

    return res.json({
      company: { id, social_name, fantasy_name, cnpj },
      token,
    });
  }
}

export default new SessionController();
