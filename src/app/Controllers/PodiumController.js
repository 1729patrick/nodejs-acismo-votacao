import Vote from '../models/Vote';
import Finalist from '../models/Finalist';
import Company from '../models/Company';
import { fn, literal } from 'sequelize';

class PodiumController {
  async index(req, res) {
    const votes = await Vote.findAll({
      include: [
        {
          model: Finalist,
          as: 'finalist',

          include: [
            {
              model: Company,
              as: 'company',
              attributes: { exclude: ['password'] },
            },
            'category',
          ],
        },
      ],
      attributes: [[fn('COUNT', 'finalist.id'), 'total']],
      order: [[literal('total'), 'DESC']],
      group: [
        'finalist_id',
        'finalist.id',
        'finalist->company.id',
        'finalist->category.id',
      ],
    });

    const votesFormatted = votes.map(vote => {
      vote = vote.get({
        plain: true,
      });

      const {
        company,
        category: { id, ...category },
        owner_name,
      } = vote.finalist;

      return {
        total: Number(vote.total),
        category,
        owner_name,
        company,
      };
    });

    const podium = votesFormatted.reduce((previousValue, currentValue) => {
      const { category, ...restVote } = currentValue;

      const categoryExist = previousValue.find(
        prev =>
          prev.category.name === category.name &&
          prev.category.size === category.size
      );

      if (categoryExist) {
        return previousValue.map(prev => {
          if (
            prev.category.name === category.name &&
            prev.category.size === category.size
          )
            return {
              ...prev,
              ranking: [...prev.ranking, restVote],
              total: prev.total + restVote.total,
            };

          return prev;
        });
      }

      return (previousValue = [
        ...previousValue,
        {
          category,
          ranking: [restVote],
          total: restVote.total,
        },
      ]);
    }, []);

    return res.json({
      podium,
    });
  }
}

export default new PodiumController();
