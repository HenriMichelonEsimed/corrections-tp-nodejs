class ItemsController {
    constructor() {
        this.itemsvc = new ItemService()
        this.listsvc = new ListService()
        this.listid = getParameterByName("listid")
        this.tableItems = $("#table-items")
        this.displayAllItems()
    }
    displayAllItems() {
        this.itemsvc.getAllByList(this.listid, (status, items) => {
            if (status !== 200) {
                return
            }
            this.listsvc.get(this.listid, (status, list) => {
                if (status === 200) {
                    $('#div-items-title').innerHTML = list.shop + " du " + new Date(list.date).toLocaleDateString()
                }
            })

            let table = ""
            for (let item of items) {
                let checked = (item.checked ? 'checked' : '')
                table += `<tr>
                    <td style="width:32px;"><input type="checkbox" ${checked}></td>
                    <td style="width:32px;">${item.quantity}</td>
                    <td>${item.label}</td>
                    </tr>`
            }
            this.tableItems.innerHTML = table
        })
    }
}

let items = new ItemsController()