module.exports = class Item {
    constructor(listid, label, quantity, checked) {
        this.id = null
        this.label = label
        this.quantity = quantity
        this.checked = checked
        this.listid = listid
    }
}