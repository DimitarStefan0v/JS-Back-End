const { extractErrorMessages } = require('../utils/errorHelpers');

exports.errorHandler = (err, req, res) => {
    res.render('/404', { errors: extractErrorMessages(err) });
};