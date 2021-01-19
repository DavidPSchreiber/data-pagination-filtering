const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const itemsPerPage = 9;
const header = document.querySelector('.header');


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



// add function to search array of students


function addSearch(list) {

  // Add html for a "search" label and add it to .header


  const html = `<label for="search" class="student-search">
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
header.insertAdjacentHTML('beforeend', html);
  
  // Create a span element and append it to searchLabel if search yields no match

  const page = document.querySelector('.page');
  const p = document.createElement('p');
  page.insertBefore(p, studentList);
  p.textContent = '';

  // Select search input element
  let searchInput = document.querySelector('#search');
  
  // Add eventListener on keyup
  searchInput.addEventListener('keyup', (e) => {
        
     // Return to default states
     searchInput.placeholder = 'Search by name...';
     p.textContent = '';

     let searchValue = searchInput.value;
     let searchResults = [];

     // If searchResults is empty, show full list
     if (searchValue.length === 0) {
        showPage(list, 1);
        addPagination(list);
     } else {

        // loop through student list and compare searchValue to student first and last name
       
        for (let i = 0; i < list.length; i++) {
           let student = list[i];
           let fullName = `${student.name.first} ${student.name.last}`;
           if (fullName.toLowerCase().includes(searchValue.toLowerCase())) {
              searchResults.push(student);
           };
        };

        // If no match found, display message
        if (searchResults.length === 0) {
           p.textContent = 'Sorry, no matches found';
           showPage([], 1);
           addPagination([]);
        };

        // Call functions based on searchResults
        showPage(searchResults, 1);
        addPagination(searchResults);
     };
  });

  // Add event listener to change search input message if the button is clicked with no input
  header.addEventListener('click', (e) => {
     if (e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON') {
        let searchValue = searchInput.value;
        if (searchValue.length === 0){
           searchInput.placeholder = "Please enter valid name";
        }
     };
  });
};

// call functions

// Call showPage() with initial array and initialize on page 1
showPage(data, 1);

// Call addPagination() with our initial data array
addPagination(data);

// Call addSearch() with our initial data array
addSearch(data);