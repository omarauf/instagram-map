const IG_API = require("instagram-private-api");
const ig = new IG_API.IgApiClient();
const fs = require("fs");


(async () => {
    const userPosts = [];

    // jamalsharbek
    ig.state.generateDevice("white_angel_110");
    ig.state.proxyUrl = process.env.IG_PROXY;
    const auth = await ig.account.login("white_angel_110", "H7c_?Whr\\3)s_Nta");

    const id = await ig.user.getIdByUsername("jamalsharbek")
    const info = await ig.user.info(id)

    const accountFollowing = await ig.feed.accountFollowing(id);
    let feed = await accountFollowing.request();
    userPosts.push(...feed.users);

    while (feed.next_max_id > 0) {
        feed = await accountFollowing.request();
        userPosts.push(...feed.users);
    }


    fs.writeFileSync("./JSON/jamal.json", JSON.stringify(userPosts))


})();
