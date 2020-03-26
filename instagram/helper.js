exports.deleteExtra = (post) => {
    delete post.video_dash_manifest;
    delete post.pk;
    delete post.device_timestamp;
    delete post.client_cache_key;
    delete post.filter_type;
    delete post.is_dash_eligible;
    delete post.video_codec;
    delete post.can_viewer_reshare;
    delete post.caption_is_edited;
    delete post.comment_likes_enabled;
    delete post.comment_threading_enabled;
    delete post.has_more_comments;
    delete post.next_max_id;
    delete post.max_num_visible_preview_comments;
    delete post.preview_comments;
    delete post.can_view_more_preview_comments;
    //delete post.comment_count;
    delete post.inline_composer_display_condition;
    delete post.inline_composer_imp_trigger_time;
    delete post.photo_of_you;
    delete post.can_viewer_save;
    delete post.has_viewer_saved;
    delete post.organic_tracking_token;

    // check if the post is multiple
    if (post.media_type === 8) {
        const carousel_media_count = post.carousel_media_count;
        // iterate in all posts
        for (let i = 0; i < carousel_media_count; i++) {
            const element = post.carousel_media[i];
            if (element.media_type === 2) { // video
                delete element.video_dash_manifest;
                delete element.is_dash_eligible;
                delete element.pk;
                delete element.carousel_parent_id;
            }
        }
    }
}

exports.deleteAllEecept = (post, keys) => {
    Object.keys(post).forEach((item) => {
        if (!keys.includes(item)) delete post[item];
    })
}

exports.getURLS = (post) => {
    //Check weather its pic, video, or multiple
    let image = null;
    if (post.media_type === 1) {
        image = post.image_versions2.candidates[0].url; // URL
    } else if (post.media_type == 2) {
        image = {
            "image": post.image_versions2.candidates[0].url,
            "video": post.video_versions[0].url
        };
    } else if (post.media_type == 8) {
        image = [];
        const carousel_media_count = post.carousel_media_count;
        // iterate in all posts
        for (let i = 0; i < carousel_media_count; i++) {
            const element = post.carousel_media[i];
            if (element.media_type === 2) { // video
                image.push({
                    "image": element.image_versions2.candidates[0].url,
                    "video": element.video_versions[0].url
                })
            } else if (element.media_type === 1) {
                image.push(element.image_versions2.candidates[0].url)
            }
        }
    }
    return image;
}

// return only image or thubnail
exports.getOnlyImagesURLS = (post, onlyURL = false) => {
    //Check weather its pic, video, or multiple
    let image = null;
    if (post.media_type === 1) {
        image = post.image_versions2.candidates[0]; // URL
    } else if (post.media_type == 2) {
        image = post.image_versions2.candidates[0];
    } else if (post.media_type == 8) {
        image = post.carousel_media[0].image_versions2.candidates[0];
    }
    if (onlyURL) return image.url
    // return image wirth width, height, url etc...
    return image;
}


const getImageFromPost = (post) => {

}

const getImageFromMultiplePost = (post) => {

}

const getVideoFormPost = (post) => {

}

const getVideoFromMultiplePost = (post) => {

}