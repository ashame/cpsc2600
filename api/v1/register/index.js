const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const {
    User: { model: User }
} = require('../../../models');

const validators = [
    check('email')
        .trim().isEmail().normalizeEmail()
        .withMessage('Please enter a valid email address!')
];

router.post('/', validators, (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400);
        return next(new Error('Invalid user information'));
    } else {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.status(422);
            return next(new Error(validation.errors[0].msg));
        }
    }
    let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email
    }, (err, data) => {
        if (err) {
            res.status(406);
            err = new Error(`${Object.keys(err.keyValue)[0]} already exists`);
            return next(err);
        }
        res.json({ email: data.email });
    })
});

module.exports = router;