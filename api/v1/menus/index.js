const router = require('express').Router();
const {
    Menu: { model: Menu },
    MenuItem: { model: MenuItem },
    Restaurant: { model: Restaurant }
} = require('../../../models');
const { authenticate } = require('../util');

router.get('/', (_req, res, next) => {
    Restaurant.find({}, '-_id -owner -address -phone -website', (err, doc) => {
        if (err) return next(err);
        if (doc == null || doc.length == 0) {
            res.status(404).json({
                status: 404,
                message: 'No menus found.'
            })
        } else {
            res.json(doc.reduce((arr, restaurant) => {
                restaurant.menus.forEach(menu => { 
                    arr.push({
                        _id: menu._id,
                        restaurant: restaurant.name,
                        name: menu.name,
                        size: menu.items.length
                    }) 
                });
                return arr;
            }, []));
        }
    })
})

router.post('/new', (req, res, next) => {
    if (!req.body.restaurantId || !req.body.name) {
        res.status(400);
        return next(new Error('Invalid information.'));
    }
    authenticate(req.body.sessionId, req.body.restaurantId).then(restaurant => {
        if (restaurant == null) {
            res.status(401);
            return next(new Error('Unauthorized'));
        }
        menu = new Menu({
            restaurant: restaurant._id,
            name: req.body.name,
            items: []
        });
        restaurant.menus.push(menu);
        restaurant.save((err, _) => {
            if (err) return next(err);
            menu.populate('restaurant', 'name -_id').execPopulate((err, doc) => {
                if (err) return next(err);
                res.json(doc);
            })
        })
    }).catch(err => next(err));
})

router.get('/:id', async (req, res, next) => {
    Restaurant.findByMenuId(req.params.id, '-_id -owner -website -menus.restaurant', (err, doc) => {
        if (err) return next(err);
        if (doc == null) {
            res.status(404);
            return next(new Error(`No menu with id '${req.params.id}' found.`));
        }
        let menu = doc.menus.id(req.params.id);
        res.json({
            _id: menu._id,
            name: menu.name,
            restaurant: doc.name,
            address: doc.address,
            phone: doc.phone,
            items: menu.items
        });
    });
})

router.post('/:id/addItem', async (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.price) {
        res.status(400);
        return next(new Error('Invalid information.'));
    }
    authenticate(req.body.sessionId, req.params.id).then(restaurant => {
        if (restaurant == null) {
            res.status(401);
            return next(new Error('Unauthorized'));
        }
        let menu = restaurant.menus.id(req.params.id);
        menu.items.push(new MenuItem({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image ? req.body.image : "",
            price: parseFloat(req.body.price)
        }));
        restaurant.save((err, _doc) => {
            if (err) return next(err);
            menu.parent().populate('menus.restaurant', 'name -_id').execPopulate((err, doc) => {
                if (err) return next(err);
                res.json({
                    _id: menu._id,
                    name: menu.name,
                    restaurant: doc.name,
                    address: doc.address,
                    items: menu.items
                });
            })
        })
    }).catch(err => next(err));
})

module.exports = router;