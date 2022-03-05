let items_list = [
  ["test", true],
  ["complete this app", false],
];

function addItem() {
  let newItem = document.getElementById("item").value;
  if (!newItem) {
    return;
  }
  items_list.push([newItem, false]);

  populateTable();
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

    item.innerHTML = items_list[i][0];
    // Set up the complete checkbox
    let chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("id", "complete");
    chkbox.checked = items_list[i][1];
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

populateTable();
