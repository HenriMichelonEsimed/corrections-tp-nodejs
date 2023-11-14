module.exports = (app, listdao) => {

    app.get("/list", (req, res) => {
        listdao.get(false, (lists) => {
            return res.json(lists)
        })
    })

    app.get("/list/archived", (req, res) => {
        listdao.get(true, (lists) => {
            return res.json(lists)
        })
    })

    app.get("/list/:id", (req, res) => {
        listdao.getById(req.params.id, (list) => {
            if (list == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(list)
            }
        })
    })

    app.post("/list", (req, res) => {
        const list = req.body
        if (list.shop === undefined || list.date === undefined || list.archived === undefined) {
            res.status(400).end()
            return
        }
        list.date = new Date(list.date)
        listdao.insert(list, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.delete("/list/:id", (req, res) => {
        listdao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.put("/list/:id", (req, res) => {
        const list = req.body;
        if (list.shop === undefined || list.date === undefined || list.archived === undefined) {
            res.status(400).type('text/plain').end()
            return
        }
        listdao.update(req.params.id, list, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

}