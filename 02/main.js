const sqlite3 = require('sqlite3')
const ItemDAO = require('./model/itemdao')
const ListDAO = require('./model/listdao')

const db = new sqlite3.Database('./mabase.db')
const itemdao = new ItemDAO(db)
const listdao = new ListDAO(db)
require('./model/seeder')(itemdao, listdao, () => {
    listdao.get(false, (lists) => {
        for (list of lists) {
            console.log(list)
            itemdao.getByListId(list.id, (items) => {
                for (item of items) {
                    console.log("\t" + item.label)
                }
            })
        }
    })
})