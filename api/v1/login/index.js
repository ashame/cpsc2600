const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

const { 
    User: { model: User }
} = require('../../../models');
const { v4: uuid } = require('uuid');

const generateSesssionId = async() => {
    let sessionId = uuid();
    let unique = false;
    await User.findOne({sessionId}, (err, doc) => {
        if (err) throw new Error();
        if (doc == null) unique = true;
    })
    return unique ? sessionId : generateSesssionId();
}

const emailCheck = [
    check('username').trim().isEmail()
];

router.post('/', emailCheck, (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(401);
        return next(new Error('Invalid credentials'));
    }

    let query = !validationResult(req).isEmpty() ? { username: req.body.username } : { email: req.body.username };

    User.findOne(query, async (err, doc) => {
        if (err || doc == null || !bcrypt.compareSync(req.body.password, doc.password)) {
            res.status(401);
            return next(new Error('Invalid credentials'));
        }
        doc.sessionId = await generateSesssionId();
        doc.save((err, doc) => {
            if (err) return next(err);
            res.json({
                userId: doc._id,
                sessionId: doc.sessionId
            });
        })
    })
})

module.exports = router;