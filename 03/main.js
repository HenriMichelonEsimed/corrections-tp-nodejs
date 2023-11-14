/* EXO 01 */
const sqlite3 = require('sqlite3')
/* EXO 02 */
const ItemDAO = require('./model/itemdao')
const ListDAO = require('./model/listdao')
/* EXO 03 */
const express = require('express')
const bodyParser = require('body-parser')

/* EXO 01 */
const db = new sqlite3.Database('./mabase.db')
/* EXO 02 */
const itemdao = new ItemDAO(db)
const listdao = new ListDAO(db)
require('./model/seeder')(itemdao, listdao)

/* EXO 03 */
const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // pour les 'form' HTML
app.use(bodyParser.json())

require('./api/list')(app, listdao)
require('./api/item')(app, itemdao)

app.listen(3333)

