const router = require('express').Router();
const {
    User: { model: User }
} = require('../../../models');

router.post('/', (req, res, next) => { //TODO: in-depth testing
    if (!req.body.sessionId) {
        res.status(400);
        return next(new Error('Invalid information'));
    }
    User.updateOne({ sessionId: req.body.sessionId }, { $set: { sessionId: '' }}, (err, doc) => {
        if (err) return next(err);
        res.json({status: 200, message: 'Logged out'});
    })
})

module.exports = router;