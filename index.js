// ==========================
// SELECT HTML ELEMENTS
// ==========================

// Form element select kiya (task add karne ke liye)
const formEl = document.querySelector(".form");

// Input box select kiya (user yaha task likhega)
const inputEl = document.querySelector(".input");

// UL list select kiya (tasks yaha show honge)
const ulEl = document.querySelector(".list");

// Clear All button select kiya
const clearBtn = document.querySelector(".clearBtn");

// Counter element select kiya (total tasks show karne ke liye)
const counterEl = document.querySelector(".counter");


// ==========================
// LOAD DATA FROM LOCAL STORAGE
// ==========================

// localStorage se saved tasks load karo
// agar kuch nahi mila to empty array use karo
let list = JSON.parse(localStorage.getItem("list")) || [];


// ==========================
// SHOW SAVED TASKS ON SCREEN
// ==========================

// Har saved task ko screen pe display karo
list.forEach(task => {
    toDoList(task);
});


// ==========================
// FORM SUBMIT EVENT
// ==========================

// Jab user Enter press kare ya Add button click kare
formEl.addEventListener("submit", (event) => {

    // Page reload hone se roko
    event.preventDefault();

    // New task add karo
    toDoList();

});


// ==========================
// CLEAR ALL BUTTON EVENT
// ==========================

// Jab user Clear All button click kare
clearBtn.addEventListener("click", () => {

    // Screen se sab tasks remove karo
    ulEl.innerHTML = "";

    // localStorage update karo
    updateLocalStorage();

});


// ==========================
// FUNCTION TO CREATE NEW TASK
// ==========================

function toDoList(task){

// Input box se task ka naam lo
let newTask = inputEl.value;


// Agar task localStorage se aa raha hai to uska naam use karo
if(task){
    newTask = task.name;
}


// Agar input empty hai to function stop karo
if(newTask === "") return;


// New li element create karo
const liEl = document.createElement("li");


// Task ka text li me add karo
liEl.innerText = newTask;


// Agar task already completed hai to checked class add karo
if(task && task.checked){
    liEl.classList.add("checked");
}


// li ko ul list me add karo
ulEl.appendChild(liEl);


// Input box clear karo
inputEl.value = "";


// ==========================
// CREATE CHECK ICON
// ==========================

// Check button create karo
const checkBtnEl = document.createElement("div");

// Font awesome check icon add karo
checkBtnEl.innerHTML = `<i class="fa-solid fa-check"></i>`;

// Check button ko li ke andar add karo
liEl.appendChild(checkBtnEl);


// ==========================
// CREATE DELETE ICON
// ==========================

// Delete button create karo
const trashBtnEl = document.createElement("div");

// Trash icon add karo
trashBtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;

// Delete button ko li me add karo
liEl.appendChild(trashBtnEl);


// ==========================
// CHECK BUTTON CLICK EVENT
// ==========================

// Jab user check icon click kare
checkBtnEl.addEventListener("click", () =>{

    // checked class add/remove karo (toggle)
    liEl.classList.toggle("checked");

    // localStorage update karo
    updateLocalStorage();

});


// ==========================
// DELETE BUTTON CLICK EVENT
// ==========================

// Jab user delete icon click kare
trashBtnEl.addEventListener("click", () => {

    // Task remove karo screen se
    liEl.remove();

    // localStorage update karo
    updateLocalStorage();

});


// Task add hone ke baad localStorage update karo
updateLocalStorage();

}



// ==========================
// FUNCTION TO UPDATE LOCAL STORAGE
// ==========================

function updateLocalStorage(){

// Sab li elements select karo
const liEls = document.querySelectorAll("li");


// Counter update karo (total tasks show karega)
counterEl.innerText = `Total Tasks: ${liEls.length}`;


// Empty array create karo
let list = [];


// Har li element ko array me save karo
liEls.forEach(liEl => {

    list.push({

        // Task ka naam save karo
        name: liEl.innerText,

        // Task completed hai ya nahi save karo
        checked: liEl.classList.contains("checked")

    });

});


// Array ko localStorage me save karo
localStorage.setItem("list", JSON.stringify(list));

}