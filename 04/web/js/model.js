
class Item {
    constructor(label, quantity) {
        this.id = null
        this.label = label
        this.quantity = quantity
        this.checked = false
    }
}

class List {
    constructor(shop) {
        this.id = null
        this.shop = shop
        this.date = new Date()
        this.archived = false
    }
}
