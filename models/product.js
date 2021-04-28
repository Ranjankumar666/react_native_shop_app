export default class Product {
    constructor(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price,
        userPushToken
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.userPushToken = userPushToken;
    }

    updateTitle(title) {
        this.title = title;
    }
    updateImageUrl(title) {
        this.title = title;
    }
    updateImageUrl(url) {
        this.imageUrl = url;
    }
    updateDescription(description) {
        this.description = description;
    }
}
