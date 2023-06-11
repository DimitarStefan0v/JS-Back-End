const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');

router.use(homeController);
router.use('/users', userController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.redirect('404');
});

module.exports = router;