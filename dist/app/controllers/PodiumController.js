"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Vote = require('../models/Vote'); var _Vote2 = _interopRequireDefault(_Vote);
var _Finalist = require('../models/Finalist'); var _Finalist2 = _interopRequireDefault(_Finalist);
var _Company = require('../models/Company'); var _Company2 = _interopRequireDefault(_Company);
var _sequelize = require('sequelize');

class PodiumController {
  async index(req, res) {
    const votes = await _Vote2.default.findAll({
      include: [
        {
          model: _Finalist2.default,
          as: 'finalist',

          include: [
            {
              model: _Company2.default,
              as: 'company',
              attributes: { exclude: ['password'] },
            },
            'category',
          ],
        },
      ],
      attributes: [[_sequelize.fn.call(void 0, 'COUNT', 'finalist.id'), 'total']],
      order: [[_sequelize.literal.call(void 0, 'total'), 'DESC']],
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

exports. default = new PodiumController();
