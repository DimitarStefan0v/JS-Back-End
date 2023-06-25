const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { extractErrorMessages } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean();

    res.render('photos', { photos });
});

router.get('/create', isAuth, (req, res) => {
    res.render('photos/create');
});

router.post('/create', isAuth, async (req, res) => {
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
    const photo = await photoManager.getById(photoId).populate('comments.user').lean();
    const isOwner = req.user?.id == photo.owner?._id;

    res.render('photos/details', { photo, isOwner });
});

router.get('/:photoId/delete', isAuth, async (req, res) => {
    const photoId = req.params.photoId

    try {
        // TODO: add checking if user is owner else throw error
        await photoManager.delete(photoId);

        res.redirect('/photos');
    } catch (err) {
        const photo = await photoManager.getById(photoId).lean();
        res.render(`photos/details`, { photo, errors: extractErrorMessages(err) })
    }

});

router.get('/:photoId/edit', isAuth, async (req, res) => {
    const photoId = req.params.photoId
    
    // TODO: add checking if user is owner else throw error

    const photo = await photoManager.getById(photoId).lean();

    res.render('photos/edit', { photo });
});

router.post('/:photoId/edit', isAuth, async (req, res) => {
    const photoData = req.body;

    try {
        await photoManager.edit(req.params.photoId, photoData);

        res.redirect('/photos');
    } catch (err) {
        res.render('photos/edit', { errors: extractErrorMessages(err), ...photoData });
    }
});

router.post('/:photoId/comments', isAuth, async (req, res) => {
    const photoId = req.params.photoId;
    const { message } = req.body;
    const user = req.user.id;

    await photoManager.addComment(photoId, { user, message });

    res.redirect(`/photos/${photoId}/details`);
});

module.exports = router;