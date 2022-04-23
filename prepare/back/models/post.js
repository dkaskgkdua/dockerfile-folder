module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", { // Posts
        // id가 기본적으로 들어있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: "utf8mb4", // 이모티콘
        collate: "utf8mb4_general_ci", // 한글 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post, { as : "Retweet"});
        db.Post.belongsToMany(db.User, { through : "Like", as: "Likes"});
    };
    return Post;
}