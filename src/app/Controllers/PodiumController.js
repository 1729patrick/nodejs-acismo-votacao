import Vote from '../models/Vote';
import Finalist from '../models/Finalist';
import { fn, literal } from 'sequelize';

class PodiumController {
  async index(req, res) {
    const votes = await Vote.findAll({
      include: {
        model: Finalist,
        as: 'finalist',
        include: 'company',
      },
      attributes: [[fn('COUNT', 'finalist.id'), 'total']],
      group: ['finalist->company.id', 'finalist.id', 'finalist.category'],
      order: [['finalist', 'category'], [literal('total'), 'DESC']],
    });

    const votesFormatted = votes.map(vote => {
      vote = vote.get({
        plain: true,
      });

      const { company, category } = vote.finalist;

      return {
        total: Number(vote.total),
        category,
        company,
      };
    });

    const podium = votesFormatted.reduce((previousValue, currentValue) => {
      const { category, ...restVote } = currentValue;

      const checkCategory = previousValue.find(
        prev => prev.category === category
      );

      if (!checkCategory) {
        previousValue = [
          ...previousValue,
          {
            category,
            ranking: [restVote],
          },
        ];
      }

      return previousValue.map(prev => ({
        ...prev,
        ranking: [...prev.ranking, restVote],
      }));
    }, []);

    return res.json({
      podium,
    });
  }
}

export default new PodiumController();
