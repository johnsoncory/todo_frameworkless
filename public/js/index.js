let items_list = [];

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
  fetch("http://localhost:8000/api/todos/", {
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

function populateTable() {
  let table = document.getElementById("items_list");
  // clear out existing table rows
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }
  //place new list into table
  for (let i = 0; i < items_list.length; i++) {
    let newRow = table.insertRow();
    let item = newRow.insertCell(0);
    let complete = newRow.insertCell(1);
    let options = newRow.insertCell(2);

    item.innerHTML = items_list[i].item;
    // Set up the complete checkbox
    let chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("id", "complete");
    chkbox.checked = items_list[i].complete;
    complete.appendChild(chkbox);
    //set up the Edit and Remove buttons
    let editBtn = document.createElement("button");
    editBtn.setAttribute("id", "editBtn");
    editBtn.innerHTML = "Edit";
    options.appendChild(editBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "deleteBtn");
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
