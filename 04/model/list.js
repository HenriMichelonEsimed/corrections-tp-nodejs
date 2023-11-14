module.exports = class List {
    constructor(shop, date, archived) {
        this.id = null
        this.shop = shop
        this.date = new Date()
        this.archived = archived
    }
}