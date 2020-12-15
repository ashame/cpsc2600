const router = require('express').Router();

const login = require('./login');
const logout = require('./logout');
const menus = require('./menus');
const register = require('./register');
const restaurants = require('./restaurants');

const { User: { model: User } } = require('../../models')

router.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    });
})

router.use('/login', login);
router.use('/logout', logout);
router.use('/menus', menus);
router.use('/register', register);
router.use('/restaurants', restaurants);

router.get('/users', (req, res) => {
    User.find({}).exec((err, doc) => {
        res.send(doc);
    });
})

router.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not found - ${req.originalUrl}`);
    next(error);
})

router.use((err, req, res, next) => {
    const status = res.statusCode != 200 ? res.statusCode : 500;
    const message = err.message ? err.message : "Internal Server Error";
    res.status(status).json({
        status,
        message
    })
})

module.exports = router;