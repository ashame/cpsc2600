const router = require('express').Router();
const {
    Restaurant: { model: Restaurant },
    Address: { model: Address }
} = require('../../../models');
const { authenticate } = require('../util');

router.get('/', (req, res, next) => {
    Restaurant.find({}, '-owner -menus.items -menus.restaurant', (err, doc) => {
        if (err) return next(err);
        res.json(doc);
    })
})

router.get('/:id', (req, res, next) => {
    Restaurant.findOne({ _id: req.params.id }, '-owner -menus.items -menus.restaurant', (err, doc) => {
        if (err) return next(err);
        res.json(doc);
    })
})

router.get('/owner/:id', (req, res, next) => {
    Restaurant.find({ owner: req.params.id }, 'name menus.name menus._id', (err, docs) => {
        if (err) return next(err);
        res.json(docs.map((doc, i) => ({
            _id: doc._id,
            name: doc.name,
            menus: doc.menus.sort((a, b) => a.name.localeCompare(b.name))
        })));
    })
})

router.post('/new', async (req, res, next) => {
    if (!req.body.name || !req.body.address || !req.body.phone || !req.body.sessionId) {
        res.status(400);
        return next(new Error('Invalid information'));
    }
    authenticate(req.body.sessionId).then(user => {
        if (user == null) {
            res.status(401);
            return next(new Error('Unauthorized'));
        }
        const address = new Address({
            lineOne: req.body.address.lineOne,
            lineTwo: req.body.address.lineTwo ? req.body.address.lineTwo : "",
            city: req.body.address.city,
            province: req.body.address.province,
            postalCode: req.body.address.postalCode
        });
        Restaurant.create({
            owner: user._id,
            name: req.body.name,
            address,
            phone: parseInt(req.body.phone),
            website: req.body.website ? req.body.website : "",
            menus: []
        }, (err, doc) => {
            if (err) return next(err);
            res.send(doc);
        })
    }).catch(err => next(err));
})

module.exports = router;