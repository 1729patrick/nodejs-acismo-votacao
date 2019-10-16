import Vote from '../models/Vote';
import Finalist from '../models/Finalist';
import Company from '../models/Company';
import { fn, literal } from 'sequelize';

class PodiumController {
  async index(req, res) {
    const finalists = await Finalist.findAll({
      include: [
        {
          model: Vote,
          as: 'vote',
        },
        'company',
        'category',
      ],
    });

    const finalistsFormatted = finalists.map(finalist => {
      finalist = finalist.get({
        plain: true,
      });

      const { vote, ...restFinalist } = finalist;

      return {
        ...restFinalist,
        total: vote.length,
      };
    });

    const finalistsSorted = finalistsFormatted.sort(
      (a, b) => b.total - a.total
    );

    const podium = finalistsSorted.reduce((previousValue, currentValue) => {
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
