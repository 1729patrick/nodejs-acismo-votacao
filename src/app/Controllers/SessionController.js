import Company from '../models/Company';
import jwt from 'jsonwebtoken';
class SessionController {
  async store(req, res) {
    let { cnpj, password } = req.body;

    let company = await Company.findOne({
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

    const token = jwt.sign({ companyId: company.id }, process.env.APP_SECRET);

    const { id, social_name, fantasy_name } = company;

    return res.json({
      company: { id, social_name, fantasy_name, cnpj },
      token,
    });
  }
}

export default new SessionController();
