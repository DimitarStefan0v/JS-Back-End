const Photo = require('../models/Photo');

exports.create = (photoData) => Photo.create(photoData);

exports.getAll = () => Photo.find().populate('owner');

exports.getById = (photoId) => Photo.findById(photoId).populate('owner');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);