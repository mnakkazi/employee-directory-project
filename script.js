/*===============================================
Global Variables
===============================================*/  
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const employeesContainer = document.querySelector('.grid');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

/*===============================================
Fetch Employee Info From API
===============================================*/ 
fetch(urlAPI)
  .then(res => res.json())
  /* .then(data => console.log(data)) 
  console.log data */
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

/*===============================================
displayEmployees Function
===============================================*/ 
function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
          <img src="${picture.large}">
          <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
          </div>
        </div>
        `;
    });;

    employeesContainer.innerHTML = employeeHTML;
}

/*===============================================
displayModal Function
===============================================*/ 
function displayModal(index) {
    let { name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];
  
    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr>
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
    employeesContainer.style.opacity = 0.4;
}

/*===============================================
Event Listeners
===============================================*/ 
employeesContainer.addEventListener('click', (e)=> {
    if (e.target !== employeesContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
    employeesContainer.style.opacity = 1;
});

/*===============================================
Show Previous or Next Person
===============================================*/ 
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let currentPerson = 0;

next.addEventListener('click', (e) => {
    currentPerson++;
    if (currentPerson > employees.length - 1) {
        currentPerson = 0;
    }
    displayModal(currentPerson);
});

prev.addEventListener('click', (e) => {
    currentPerson--;
    if (currentPerson < 0) {
        currentPerson = employees.length -1;
    }
    displayModal(currentPerson);
});

/*===============================================
Search Box
===============================================*/ 
function filteredSearch() {}



