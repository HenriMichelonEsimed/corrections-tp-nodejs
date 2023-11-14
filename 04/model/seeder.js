const Item = require('./item')
const List = require('./list')

module.exports = (itemdao, listdao) => {
    listdao.db.run("CREATE TABLE list(id INTEGER PRIMARY KEY AUTOINCREMENT,shop TEXT,date INTEGER,archived INTEGER)",
        (err) => {
            if (err == null) {
                itemdao.db.run("CREATE TABLE item (id INTEGER PRIMARY KEY AUTOINCREMENT,list INTEGER,label TEXT,quantity INTEGER,checked INTEGER)",
                    (err) => {
                        if (err == null) {
                            itemdao.db.serialize(() => {
                                listdao.insert(new List("Magasin 1", new Date(), 0))
                                listdao.insert(new List("Magasin 2", new Date(), 0))
                                listdao.insert(new List("Magasin 3", new Date(), 1))
                                listdao.get(false, (lists) => {
                                    for (let list of lists) {
                                        for (let i = 0; i < 5; i++) {
                                            itemdao.insert(new Item(list.id, "Item " + i, Math.ceil(Math.random() * 4), Math.random() < 0.25))
                                        }
                                    }
                                })
                            })
                        }
                    })
            }
        })
}