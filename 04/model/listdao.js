const List = require('./list')

module.exports = class ListDAO {
    constructor(db) {
        this.db = db
    }
    insert(list, done) {
        const stmt = this.db.prepare("INSERT INTO list(shop,date,archived) VALUES (?, ?, ?)")
        stmt.run([list.shop, list.date.getTime(), (list.archived ? 1 : 0)], (err) => {
            if (err == null && done) {
                done(err)
            }
        })
        stmt.finalize()
    }
    update(id, list, done) {
        const stmt = this.db.prepare("UPDATE list SET shop=?,date=?,archived=? WHERE id=?")
        stmt.run(list.shop, new Date(list.date).getTime(), (list.archived ? 1 : 0), id, done)
        stmt.finalize()
    }
    delete(id, done) {
        const stmt = this.db.prepare("DELETE FROM list WHERE id=?")
        stmt.run(id, done)
        stmt.finalize()
    }
    getById(id, done) {
        let list = null
        this.db.each("SELECT * FROM list WHERE id = ?", [id],
            (err, row) => { if (err == null) list = Object.assign(new List(), row) },
            () => { done(list) }
        )
    }
    get(archived, done) {
        const lists = []
        this.db.each("SELECT * FROM list WHERE archived=?",
            [ archived ],
            (err, row) => {
                if (err == null) {
                    let p = new List(row.shop, new Date(row.date), row.archived === 1)
                    p.id = row.id
                    lists.push(p)
                }
            },
            (err) => {
                if (err == null && done) {
                    done(lists)
                }
            })
    }
}