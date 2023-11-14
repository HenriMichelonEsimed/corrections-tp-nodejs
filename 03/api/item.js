module.exports = (app, itemdao) => {

    app.get("/item/list/:listid", (req, res) => {
        itemdao.getByListId(req.params.listid, (items) => {
            return res.json(items)
        })
    })

    app.get("/item/:id", (req, res) => {
        itemdao.getById(req.params.id, (item) => {
            if (item == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(item)
            }
        })
    })

    app.post("/item", (req, res) => {
        const item = req.body
        if (item.label === undefined || item.quantity === undefined || item.checked === undefined) {
            res.status(400).end()
            return
        }
        itemdao.insert(item, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.delete("/item/:id", (req, res) => {
        itemdao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.put("/item/:id", (req, res) => {
        const item = req.body
        if (item.label === undefined || item.quantity === undefined || item.checked === undefined) {
            res.status(400).end()
            return
        }
        itemdao.update(req.params.id, item, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

}