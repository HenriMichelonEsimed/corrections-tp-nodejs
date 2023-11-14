class ArchivedController {
    constructor() {
        this.listsvc = new ListService()
        this.tableLists = $("#table-lists")
        this.displayAllLists()
    }
    displayAllLists() {
        this.listsvc.getAllArchived((status, lists) => {
            if (status !== 200) {
                return
            }
            let table = ""
            for (let list of lists) {
                table += `<tr>
                    <td><a href="items?listid=${list.id}">${list.shop}</a></td>
                    <td>${list.date.toLocaleDateString()}</td>
                    </tr>`
            }
            this.tableLists.innerHTML = table
        })
    }
}

let archived = new ArchivedController()