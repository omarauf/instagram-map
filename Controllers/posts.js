const fs = require("fs");
const cleaner = require("../instagram/cleaner")
const path = require('path');
const IG_API = require("instagram-private-api");
const ig = new IG_API.IgApiClient();

// GET
exports.getPosts = async (req, res, next) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    const username = req.query.username
    const directoryPath = path.join(__dirname, '../JSON', `${username}.json`);
    const isUserExist = fs.existsSync(directoryPath);
    try {
        if (isUserExist) {
            let userPosts = JSON.parse(fs.readFileSync(`./JSON/${username}.json`, "utf8"));
            // check if there is no new post
            let firstUserPosts = await getPosts(username, res, true);
            if (userPosts[0].code === firstUserPosts[0].code) {
                res.end("data: " + JSON.stringify({ action: "End", data: userPosts }) + "\n\n")
                return
            }
        }
        // if user no exist then download her post
        let userPosts = await getPosts(username, res);
        // code, location, lat, lng, carousel_media
        userPosts = await cleaner.cleanOneRequest(userPosts, username);
        res.end("data: " + JSON.stringify({ action: "End", data: userPosts }) + "\n\n")
    } catch (err) {
        next(err);
    }
};

exports.getDownloadedPost = async (req, res, next) => {
    const username = req.body.username
    try {
        let userPosts = JSON.parse(fs.readFileSync(`./JSON/${username}.json`, "utf8"));
        res.status(200).json({
            success: true,
            posts: userPosts
        });
    } catch (err) {
        next(err);
    }
};

const getPosts = async (username, res, firstRequest = false) => {
    const userPosts = [];
    ig.state.generateDevice("white_angel_110");
    ig.state.proxyUrl = process.env.IG_PROXY;
    const auth = await ig.account.login("white_angel_110", "H7c_?Whr\\3)s_Nta");
    // const followersFeed = ig.feed.accountFollowers(auth.pk);

    const id = await ig.user.getIdByUsername(username)
    const info = await ig.user.info(id)

    const user = await ig.feed.user(id);
    let feed = await user.request();
    userPosts.push(...feed.items);
    if (firstRequest) return userPosts;

    res.write("data: " + JSON.stringify({ action: "Media Count", data: info.media_count }) + "\n\n")
    while (feed.more_available) {
        feed = await user.request();
        userPosts.push(...feed.items);
        res.write("data: " + JSON.stringify({ action: "Downloaded", data: feed.items.length }) + "\n\n")
    }

    return userPosts;
}
