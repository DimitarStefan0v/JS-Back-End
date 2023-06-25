const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean();

    res.render('photos', { photos });
});

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

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getById(photoId).lean();
    const isOwner = req.user?.id == photo.owner?._id;

    res.render('photos/details', { photo, isOwner });
});

router.get('/:photoId/delete', async (req, res) => {
    const photoId = req.params.photoId

    try {
        await photoManager.delete(photoId);

        res.redirect('/photos');
    } catch (err) {
        const photo = await photoManager.getById(photoId).lean();
        res.render(`photos/details`, { photo, errors: extractErrorMessages(err) })
    }

});

router.get('/:photoId/edit', async (req, res) => {
    const photoId = req.params.photoId
    const photo = await photoManager.getById(photoId).lean();

    res.render('photos/edit', { photo });
});

router.post('/:photoId/edit', async (req, res) => {
    const photoData = req.body;
    
    try {
        await photoManager.edit(req.params.photoId, photoData);

        res.redirect('/photos');
    } catch (err) {
        res.render('photos/edit', { errors: extractErrorMessages(err), ...photoData });
    }
});

module.exports = router;