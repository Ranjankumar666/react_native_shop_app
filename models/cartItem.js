export default class CartItem {
    constructor(id, quantity, productPrice, productTitle) {
        this.id = id;
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = this.productPrice * this.quantity;
    }

    updatePrice() {
        this.sum = Number(
            parseFloat(this.productPrice * this.quantity).toFixed(2)
        );
    }
    increQuantity() {
        this.quantity += 1;
        this.updatePrice();
    }

    decreQuantity() {
        if (this.quantity > 1) {
            this.quantity -= 1;
        }

        this.updatePrice();
    }
}