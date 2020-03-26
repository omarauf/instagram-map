const fs = require("fs");
const helper = require("./helper");


// Clean Request
// { items: [], num_results, more_available, next_max_id, auto_load_more_enabled, status}
const cleanOneRequest = async (userPosts, username) => {
  // let userPosts = JSON.parse(fs.readFileSync("./JSON/AllPost.json", "utf8"));

  for (let post = 0; post < userPosts.length; post++) {
    // helper.deleteExtra(request.items[post]);
    helper.deleteAllEecept(userPosts[post], ["code", "media_type", "location", "carousel_media", "image_versions2"]);
    userPosts[post] = { ...userPosts[post], thumbnail: helper.getOnlyImagesURLS(userPosts[post], true) };
  }
  fs.writeFileSync(`./JSON/${username}.json`, JSON.stringify(userPosts));

  return userPosts;
}

// (async () => {
//   cleanOneRequest()
// })()

exports.cleanOneRequest = cleanOneRequest;