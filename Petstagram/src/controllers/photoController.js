const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/create', (req, res) => {
    res.render('photos/create');
});

router.post('/create', async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user.id,
    };

    try {
        await photoManager.create(photoData);

        res.redirect('/photos');
    } catch (err) {
        res.render('photos/create', { errors: extractErrorMessages(err) });
    }
});

module.exports = router;