import Finalist from '../models/Finalist';
import Company from '../models/Company';
import Category from '../models/Category';

class FinalistController {
  async index(_, res) {
    let finalists = await Finalist.findAll({
      include: [
        {
          model: Company,
          as: 'company',
          attributes: { exclude: ['id', 'password'] },
        },
        {
          model: Category,
          as: 'category',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: ['id', 'owner_name'],
    });

    return res.json({ finalists });
  }
}

export default new FinalistController();
