const express = require('express')
const User = require('../models/User');
const multer = require('multer');
const { storage } = require('../cloudinary');
const cloudinary = require('../cloudinary');
const upload = multer({ storage });
const { checkAuthenticated } = require('../config/auth');
const router = express.Router()


router.get('/', checkAuthenticated, async (req, res) => {
    res.render('index', {
        user: req.user
    })
});



router.post('/', upload.array('image'), checkAuthenticated, async (req, res, next) => {
    const arr = req.files
    const user = await User.findByIdAndUpdate(req.user.id, { ...req.user })
    arr.forEach(function (ele) {

        var obj = {
            url: ele.path,
            filename: ele.filename
        }
        user.images.push(obj);
    })
    await user.save()

    res.redirect('/users/images')
});




module.exports = router;