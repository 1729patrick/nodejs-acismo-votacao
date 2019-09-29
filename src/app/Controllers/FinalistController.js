import Finalist from '../models/Finalist';

class FinalistController {
  async index(_, res) {
    const finalists = await Finalist.findAll({
      include: 'company',
      attributes: ['id', 'category'],
    });

    return res.json({ finalists });
  }
}

export default new FinalistController();
