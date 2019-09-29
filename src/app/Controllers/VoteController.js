import Vote from '../models/Vote';
import Finalist from '../models/Finalist';

import database from '../../database';

class VoteController {
  async store(req, res) {
    const { companyId } = req;
    const { finalistId } = req.params;

    const votes = await Vote.findAll();

    const votesToShuffle = votes.map(({ company_id, category }) => ({
      company_id,
      category,
    }));

    const votesShuffled = votesToShuffle.sort(() => Math.random() - 0.5);

    votes.forEach((vote, index) => {
      const { company_id, category } = votesShuffled[index];

      vote.update({ company_id, category });

      vote.save();
    });

    const finalist = await Finalist.findOne({
      where: { id: finalistId },
      attributes: ['category'],
    });

    if (!finalist) {
      return res
        .status(400)
        .json({ error: `Finalist ${finalistId} not found` });
    }

    const { category } = finalist;

    const alreadyVotted = await Vote.findOne({
      where: { company_id: companyId },
      include: {
        model: Finalist,
        where: { category },
        as: 'finalist',
      },
    });

    if (alreadyVotted) {
      return res
        .status(400)
        .json({ error: `You already voted in category ${category}` });
    }

    const vote = await Vote.create({
      finalist_id: finalistId,
      company_id: companyId,
      category,
    });

    return res.json({ votes });
  }

  async index(req, res) {
    const votes = await Vote.findAll();
    return res.json({ votes });
  }

  async test(req, res) {
    return res.json({ ok: true });
  }
}

export default new VoteController();
