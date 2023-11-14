const Item = require('./item')

module.exports = class ItemDAO {
    constructor(db) {
        this.db = db
    }
    update(id, item, done) {
        const stmt = this.db.prepare("UPDATE item SET label=?,quantity=?,checked=? WHERE id=?")
        stmt.run(item.label, item.quantity, (item.checked ? 1 : 0), done)
        stmt.finalize()
    }
    delete(id, done) {
        const stmt = this.db.prepare("DELETE FROM item WHERE id=?")
        stmt.run(id, done)
        stmt.finalize()
    }
    getById(id, done) {
        let list = null
        this.db.each("SELECT * FROM item WHERE id = ?", [id],
            (err, row) => { if (err == null) list = Object.assign(new Item(), row) },
            () => { done(list) }
        )
    }
    insert(item, done) {
        const stmt = this.db.prepare("INSERT INTO item(list,label,quantity,checked) VALUES (?, ?, ?, ?)")
        stmt.run([item.listid, item.label, item.quantity, (item.checked ? 1 : 0)], (err) => {
            if (err == null && done) {
                done(err)
            }
        })
        stmt.finalize()
    }
    getByListId(listid, done) {
        const items = []
        this.db.each("SELECT * FROM item WHERE list=?",
            [ listid ],
            (err, row) => {
                if (err == null) {
                    let p = new Item(row.list, row.label, row.quantity, row.checked === 1)
                    p.id = row.id
                    items.push(p)
                }
            },
            (err) => {
                if (err == null && done) {
                    done(items)
                }
            })
    }
}