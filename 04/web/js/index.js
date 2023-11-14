class IndexController {
    constructor() {
        this.listsvc = new ListService()
        this.tableLists = $("#table-lists")
        this.dialogAddList = jQuery("#dialog-add-list")
        this.dialogDeleteList = jQuery("#dialog-delete-list")
        this.dialogEditList = jQuery("#dialog-edit-list")
        this.displayAllLists()
    }
    addList() {
        this.listsvc.insert(new List($('#add-list-shop').value), (status) => {
            if (status === 200) {
                this.displayAllLists()
                this.dialogAddList.modal('hide')
                $('#add-list-shop').value = ""
            }
        })
        return false
    }
    editList(id) {
        this.listsvc.get(id, (status, list) => {
            if (status === 200) {
                $("#edit-list-id").value = id
                $("#edit-list-shop").value = list.shop
                this.dialogEditList.modal('show')
            } else if (status === 404) {
                alert("Liste inconnue")
            }
        })
    }
    updateList() {
        this.listsvc.update($("#edit-list-id").value,
            new List($("#edit-list-shop").value),
            (status) => {
                this.displayAllLists()
                this.dialogEditList.modal('hide')
            })
        return false
    }
    deleteList(id) {
        this.listsvc.get(id, (status, list) => {
            if (status === 200) {
                list.date = new Date(list.date)
                $("#label-delete-list").innerText = `${list.shop} du ${list.date.toLocaleDateString()}`
                $("#btn-delete-list").onclick = () => {
                    this.listsvc.delete(id, (status) => {
                        this.displayAllLists()
                        this.dialogDeleteList.modal('hide')
                    })
                }
                this.dialogDeleteList.modal('show')
            } else if (status === 404) {
                alert("Liste inconnue")
            }
        })
    }
    displayAllLists() {
        this.listsvc.getAll((status, lists) => {
            if (status !== 200) {
                return
            }
            let table = ""
            for (let list of lists) {
                table += `<tr>
                    <td><a href="items?listid=${list.id}">${list.shop}</a></td>
                    <td>${list.date.toLocaleDateString()}</td>
                    <td><button class="btn btn-danger btn-sm" 
                                onclick="index.deleteList(${list.id})">X</button>
                        <button class="btn btn-warning btn-sm" 
                                onclick="index.editList(${list.id})">E</button>
                                </td>
                    </tr>`
            }
            this.tableLists.innerHTML = table
        })
    }
}

let index = new IndexController()