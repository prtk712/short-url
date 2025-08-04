const { getUser } = require('../service/auth')

async function restrictToLoggedinUserOnly(req, res, next) {
    const useruuid = req.cookies?.uid;

    if(!useruuid) return res.redirect('/login');

    const user = getUser(useruuid);

    if(!user) return res.redirect('/login');
    req.user = user;

    next();
}

async function checkAuth(req, res, next) {
    const useruid = req.cookies?.uid;
    const user = getUser(useruid);
    req.user = user;
    next();

}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
}