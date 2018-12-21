import "./main.scss";

import Employee from "./Employee";

let empArray = [];

let saveBtn = document.getElementById("btnSave");
let updateBtn = document.getElementById("btnUpdate");

console.log('IM IN INDEX.js');



document
  .getElementsByClassName("list")[0]
  .addEventListener("click", function(event) {
    console.log(event.target.value);
    switch (event.target.value) {
      case "Del":
        DeleteItem(event.target.parentNode.id);
        break;
      case "Edit":
        EditItem(event.target.parentNode.id);
        break;
      default:
        break;
    }
  });

function DeleteItem(id) {
  let index = empArray.findIndex(x => x.id == id);
  empArray.splice(index, 1);
  CalculateTotalSalary();

  while (document.getElementsByClassName("list")[0].firstChild) {
    document
      .getElementsByClassName("list")[0]
      .removeChild(document.getElementsByClassName("list")[0].firstChild);
  }

  PrepareList();
}

function EditItem(id) {
  updateBtn.removeAttribute("disabled");
  saveBtn.setAttribute("disabled", true);
  let emp = empArray.find(emp => emp.id == id);
  document.getElementById("id").value = emp.id;
  document.getElementById("name").value = emp.name;
  document.getElementById("salary").value = emp.salary;
}
document.getElementsByTagName("form")[0].onsubmit = function onSubmit(event) {
  event.preventDefault();

 
  if (!saveBtn.attributes.getNamedItem("disabled")) {
    createNewElement(
      event.target.elements["id"].value,
      event.target.elements["name"].value,
      event.target.elements["salary"].value
    );
    let emp = new Employee(id, name, salary);
    empArray.push(emp);
    CalculateTotalSalary();
  } else {
    let emp = empArray.find(e => e.id == event.target.elements["id"].value);

    console.log(emp);

    emp.salary = event.target.elements["salary"].value;
    emp.name = event.target.elements["name"].value;

    while (document.getElementsByClassName("list")[0].firstChild) {
      document
        .getElementsByClassName("list")[0]
        .removeChild(document.getElementsByClassName("list")[0].firstChild);
    }
    saveBtn.removeAttribute("disabled");
    updateBtn.setAttribute("disabled", true);
    PrepareList();
  }

  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("salary").value = "";
};

function createNewElement(id, name, salary) {
  let liEleText = getLiElement(id, name, salary);
  let liEle = document.createElement("li");
  liEle.id = id;
  liEle.innerHTML = liEleText;
  document.getElementsByClassName("list")[0].appendChild(liEle);
}

function getLiElement(id, name, salary) {
  return `
    <span class="ID">${id}</span> <span class="name">${name}</span>
    <span class="salary">${salary}</span>
    <input type="button" value="Del" id='btnDel'  title="delete">
    <input type="button" value="Edit" id='btnEdit' title="edit">
    `;
}

function CalculateTotalSalary() {
  let ele = document.getElementById("total");
  let sum = _.reduce(
    empArray,
    (sum, val) => {
      return parseInt(sum) + parseInt(val.salary);
    },
    0
  );

  ele.innerText = sum;
}

function loadEmployees() {
  empArray = [];
  let emp1 = new Employee(1, "Rohit", 1234);
  let emp2 = new Employee(2, "Mohit", 123);
  let emp3 = new Employee(3, "Suresh", 34);

  empArray.push(emp1, emp2, emp3);
  PrepareList();
}

loadEmployees();

function PrepareList() {
  _.forEach(empArray, val => {
    createNewElement(val.id, val.name, val.salary);
  });

  CalculateTotalSalary();
}
