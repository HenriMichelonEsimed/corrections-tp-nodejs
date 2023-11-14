const serverUrl = "http://localhost:3333"

class Service {
    constructor(svc) {
        this.url = serverUrl + "/" + svc
    }
    update(id, data, done) {
        ajax("PUT", this.url + "/" + id, done, data)
    }
    delete(id, done) {
        ajax("DELETE", this.url + "/" + id, done)
    }
    insert(data, done) {
        ajax("POST", this.url, done, data)
    }
    get(id, done) {
        ajax("GET", this.url + "/" + id, done)
    }
    getAll(done) {
        ajax("GET", this.url, done)
    }
}

class ListService extends Service {
    constructor() {
        super("list")
    }
    getAllArchived(done) {
        ajax("GET", this.url + "/archived", done)
    }
}

class ItemService extends Service {
    constructor() {
        super("item")
    }
    getAllByList(listid, done) {
        ajax("GET", this.url + "/list/" + listid, done)
    }
}