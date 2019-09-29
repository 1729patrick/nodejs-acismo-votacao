import Vote from '../models/Vote';

class VoteController {
  async store(req, res) {
    const { companyId } = req;
    const { votes } = req.body;

    votes.forEach(async vote => {
      const hasVotted = await Vote.findOne({ where: { finalist_id: vote } });

      if (hasVotted) {
        return res
          .status(401)
          .json({ error: `You already voted in finalist ${vote}` });
      }
    });
  }

  async index(req, res) {
    const votes = await Vote.findAll();
    return res.json({ votes });
  }
}

export default new VoteController();
