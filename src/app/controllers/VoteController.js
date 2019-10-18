import Vote from '../models/Vote';
import Finalist from '../models/Finalist';

import companies from '../models/Company';

class VoteController {
  async store(req, res) {
    const { companyId } = req;
    const { finalistId } = req.params;

    const votes = await Vote.findAll();

    const votesToShuffle = votes.map(({ company_id, category_id }) => ({
      company_id,
      category_id,
    }));

    const votesShuffled = votesToShuffle.sort(() => Math.random() - 0.5);

    votes.forEach((vote, index) => {
      const { company_id, category_id } = votesShuffled[index];

      vote.update({ company_id, category_id });

      vote.save();
    });

    const finalist = await Finalist.findOne({
      where: { id: finalistId },
    });

    if (!finalist) {
      return res
        .status(400)
        .json({ error: `Finalist ${finalistId} not found` });
    }

    const { category_id } = finalist;

    const alreadyVotted = await Vote.findOne({
      where: { company_id: companyId, category_id },
      include: [
        {
          model: Finalist,
          as: 'finalist',
          include: 'category',
        },
      ],
    });

    if (alreadyVotted) {
      return res.status(400).json({
        error: `Você já votou na categoria ${alreadyVotted.finalist.category.name}`,
      });
    }

    // return res.status(400).json({ x: 'passou' });
    const vote = await Vote.create({
      finalist_id: finalistId,
      company_id: companyId,
      category_id,
    });

    return res.json({ vote });
  }

  async index(req, res) {
    const votes = await Vote.findAll();
    return res.json({ votes });
  }

  async test(req, res) {
    const comp = await companies.findAll();

    comp.forEach(c => {
      let r = String(
        Number((Math.random() * 100000000).toFixed(0)) + 1000
      ).substring(0, 4);
      c.update({ password: r });
      c.save();
    });

    return res.json({ comp });
  }
}

export default new VoteController();
