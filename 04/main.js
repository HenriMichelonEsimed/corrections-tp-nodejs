/* EXO 01 */
const sqlite3 = require('sqlite3')
/* EXO 02 */
const ItemDAO = require('./model/itemdao')
const ListDAO = require('./model/listdao')
/* EXO 03 */
const express = require('express')
const bodyParser = require('body-parser')
/* EXO 04 */
const morgan = require('morgan')

/* EXO 01 */
const db = new sqlite3.Database('./mabase.db')
/* EXO 02 */
const itemdao = new ItemDAO(db)
const listdao = new ListDAO(db)
require('./model/seeder')(itemdao, listdao)

/* EXO 03 */
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/* EXO 04 */
app.use(morgan('dev'));

/* EXO 03 */
require('./api/list')(app, listdao)
require('./api/item')(app, itemdao)
/* EXO 04 */
require('./routes.js')(app)

/* EXO 03 */
app.listen(3333)

