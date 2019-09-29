import Company from '../models/Company';
import jwt from 'jsonwebtoken';

class SessionController {
  async store(req, res) {
    const { cnpj } = req.body;

    const company = await Company.findOne({ cnpj });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const token = jwt.sign({ companyId: company.id }, 'ASDSAFDSADSA');

    return res.json({ company, token });
  }
}

export default new SessionController();
