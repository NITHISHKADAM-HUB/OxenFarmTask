module.exports = {
    checkAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },
    checkNotAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('home');
    }
};
