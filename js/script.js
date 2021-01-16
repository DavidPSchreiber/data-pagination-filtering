
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const itemsPerPage = 9;
const header = document.querySelector('.header');

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(studentList, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const ul = document.querySelector(".student-list");
   ul.innerHTML = "";
   for (let i = startIndex; i < studentList.length && i < endIndex; i++) {
      const html = 
      `<li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${studentList[i].picture.thumbnail}" 
        alt="profile photo">
        <h3>${studentList[i].name.first} ${studentList[i].name.last}</h3>
        <span class="email">${studentList[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">${studentList[i].registered.date}</span>
      </div>
    </li>`;
      ul.insertAdjacentHTML('beforeend', html);      
    }
   }

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(studentList) {
 
// create variable to calculate number of page buttons needed
let pagesNeeded = Math.ceil(studentList.length / itemsPerPage);
  // if total students in array is multiple of "itemsPerPage"-- divide, but
  // if total students / "itemsPerPage" results in float, use Math.floor, round down + 1
   
// select element with class `link-list` and assign to variable
linkList.innerHTML = ""; 

// loop over number of pages needed
// create elements neede to display the pagination button

for (let i = 0; i < pagesNeeded; i++) {
  // give first pagination button the class "active"
if (i === 0) {
  linkList.insertAdjacentHTML ("beforeend",
  `<li>
  <button class = "active" type="button">${i + 1}</button>
  </li>`);
}
  else {
    linkList.insertAdjacentHTML("beforeend", 
    `<li>
    <button type="button">${i + 1}</button> 
    </li>`);
  }
}

//create event listener on `link-list`

linkList.addEventListener('click', (e) => {
  let eventTarget = e.target;
  // if click target is button fire event
  if (eventTarget.tagName === 'BUTTON') {
//remove "active" class from previous buttons
    document.querySelector(".active").className = '';
// and 'active' class added to button clicked
e.target.className = 'active';

// call showPage function and pass list parameter and page # as arguments
showPage(studentList, eventTarget.textContent);
    }
  });
} 
// call functions
showPage(data, 1);
addPagination(data); 



// add search function



header.insertAdjacentHTML("beforeend",
    `<label for="search" class="student-search">
        <input id="search" placeholder="Search by name...">
        <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`);

const search = document.querySelector('#search');
const searchLabel = document.querySelector('.student-search');
const searchButton = searchLabel.querySelector('[type="button"]');

function searchStudents(searchInput, students) {
  studentList.innerHTML = "";
  linkList.innerHTML = "";
}

// create an empty array of student objects

let data2 = [];

   // Loop every objects of student array 

   students.forEach(function (person) {

    // If searchInput = Empty, calls the initial functions
    if (searchInput.value.length == 0) {
        showPage(data, 1);
        addPagination(data);
    }

    // If searchInput is not empty and objects of array include values of the searchInput:
    else if (searchInput.value.length != 0 && ((person.name.first.toLowerCase().includes(searchInput.value.toLowerCase())) || (person.name.last.toLowerCase().includes(searchInput.value.toLowerCase())))) {
        // objects are added to the array
        data2.push(person);
        // objects of the arrays who meet the search input are displayed
        showPage(data2, 1)
        // number of pagination of button are added 
        addPagination(data2);
    }
});

// if new student array is empty, throw error

if (searchInput.value.length !=0 && data2.length === 0){
    studentList.innerHTML = "";
    studentList.insertAdjacentHTML("beforeend", '<p>Sorry, no student found</p>');
  }


  // Add eventListener for buttons

  searchButton.addEventListener('click', (event) => {
    searchStudents(search, data);
  });

  // submit input from search listener
  search.addEventListener('keyup', () => {
    event.preventDefault();
    searchStudents(search, data);
  });

