let items_list = [];
let filter = "all";

function getData() {
  return fetch("http://localhost:8000/api/todos/", {
    method: "GET",
    mode: "cors",
  })
    .then((r) => r.json())
    .then((data) => items_list.push(...data))
    .catch((e) => console.log(e));
}

function addItem() {
  let newItem = document.getElementById("item").value;
  if (!newItem) {
    return;
  }
  let newTodo = { item: newItem, complete: false };
  fetch("http://localhost:8000/api/todos/add/", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then((r) => r.json())
    .then((data) => items_list.push(data))
    .then(populateTable)
    .catch((e) => console.log(e));

  document.getElementById("item").value = "";
}

function updateComplete(id) {
  let updatedItem = items_list.find((x) => x._id == id);
  updatedItem.complete = !updatedItem.complete;
  console.log(updatedItem);
  fetch(`http://localhost:8000/api/todos/update/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  })
    .then(populateTable)
    .catch((e) => console.log(e));
}

function updateFilter(item) {
  filter = item.value;
  populateTable();
}

function deleteItem(id) {
  fetch(`http://localhost:8000/api/todos/delete/${id}`, {
    method: "DELETE",
    mode: "cors",
  })
    .then(
      new Promise((res, _) => {
        items_list = items_list.filter((x) => x._id !== id);
        res(items_list);
      })
    )
    .then(populateTable)
    .catch((e) => console.log(e));
}

function populateTable() {
  let table = document.getElementById("items_list");
  // clear out existing table rows
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }

  //place new list into table
  for (let i = 0; i < items_list.length; i++) {
    if (
      (filter == "complete" && !items_list[i].complete) ||
      (filter == "incomplete" && items_list[i].complete)
    )
      continue;

    let newRow = table.insertRow();
    let item = newRow.insertCell(0);
    let complete = newRow.insertCell(1);
    let options = newRow.insertCell(2);

    item.innerHTML = items_list[i].item;
    // Set up the complete checkbox
    let chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("id", "complete");
    chkbox.setAttribute("onChange", `updateComplete("${items_list[i]._id}")`);
    chkbox.checked = items_list[i].complete;
    complete.appendChild(chkbox);
    //set up the Edit and Remove buttons
    let editBtn = document.createElement("button");
    editBtn.setAttribute("id", "editBtn");
    editBtn.innerHTML = "Edit";
    options.appendChild(editBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "deleteBtn");
    deleteBtn.setAttribute("onClick", `deleteItem("${items_list[i]._id}")`);
    deleteBtn.innerHTML = "Delete";
    options.appendChild(deleteBtn);
  }
}

function initialize() {
  getData()
    .then(populateTable)
    .catch((e) => console.log(e));
}

initialize();
