const passport = require("passport");
const local = require("./local");
const { User } = require("../models");
module.exports = () => {
    // 서버에서 유저정보를 다 가지고 있기 부담스러우니 id만 가지고 있다가 db에서 가져옴
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({where: {id}});
            done(null, user);
        } catch(error) {
            console.error(error);
            done(error);
        }
    });

    local();
}