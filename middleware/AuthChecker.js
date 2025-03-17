function authChecker(req, res, next) {
    if (req.session.loginsession) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = {
    authChecker
}