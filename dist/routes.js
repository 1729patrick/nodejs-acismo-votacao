"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FinalistController = require('./app/controllers/FinalistController'); var _FinalistController2 = _interopRequireDefault(_FinalistController);
var _VoteController = require('./app/controllers/VoteController'); var _VoteController2 = _interopRequireDefault(_VoteController);
var _PodiumController = require('./app/controllers/PodiumController'); var _PodiumController2 = _interopRequireDefault(_PodiumController);

const router = new (0, _express.Router)();

router.post('/sessions', _SessionController2.default.store);

router.use(_auth2.default);

router.get('/finalists', _FinalistController2.default.index);

router.post('/votes/:finalistId', _VoteController2.default.store);

router.get('/podiums', _PodiumController2.default.index);

router.get('/test', _VoteController2.default.test);
exports. default = router;
