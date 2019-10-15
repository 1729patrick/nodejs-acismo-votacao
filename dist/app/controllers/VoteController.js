"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Vote = require('../models/Vote'); var _Vote2 = _interopRequireDefault(_Vote);
var _Finalist = require('../models/Finalist'); var _Finalist2 = _interopRequireDefault(_Finalist);

var _Company = require('../models/Company'); var _Company2 = _interopRequireDefault(_Company);

class VoteController {
  async store(req, res) {
    const { companyId } = req;
    const { finalistId } = req.params;

    const votes = await _Vote2.default.findAll();

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

    const finalist = await _Finalist2.default.findOne({
      where: { id: finalistId },
    });

    if (!finalist) {
      return res
        .status(400)
        .json({ error: `Finalist ${finalistId} not found` });
    }

    const { category_id } = finalist;

    const alreadyVotted = await _Vote2.default.findOne({
      where: { company_id: companyId },
      include: {
        model: _Finalist2.default,
        where: { category_id },
        as: 'finalist',
      },
    });

    if (alreadyVotted) {
      return res
        .status(400)
        .json({ error: `You already voted in category ${category_id}` });
    }

    const vote = await _Vote2.default.create({
      finalist_id: finalistId,
      company_id: companyId,
      category_id,
    });

    return res.json({ vote });
  }

  async index(req, res) {
    const votes = await _Vote2.default.findAll();
    return res.json({ votes });
  }

  async test(req, res) {
    const comp = await _Company2.default.findAll();

    comp.forEach(c => {
      let r = String((Number((Math.random() * 100000000).toFixed(0)) + 1000)).substring(
        0,
        4
      );
      c.update({ password: r });
      c.save();
    });

    return res.json({ comp });
  }
}

exports. default = new VoteController();
