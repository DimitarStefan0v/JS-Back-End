const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

 // TODO: add isAuth guard on every action that not registered should not be able to access it
router.get('/profile', isAuth, async (req, res) => {
    const photos = await photoManager.getByOwner(req.user.id).lean();

    res.render('profile', { photos, photosCount: photos.length });
});

module.exports = router;