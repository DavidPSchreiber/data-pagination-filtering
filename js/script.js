
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const itemsPerPage = 9;

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
      const html = `
      <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${studentList[i].picture.thumbnail}" 
        alt="profile photo">
        <h3>${studentList[i].name.first} ${studentList[i].name.last}</h3>
        <span class="email">${studentList[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">${studentList[i].registered.date}</span>
      </div>
    </li>`
      ul.insertAdjacentHTML('beforeend', html);      
    }
   }

showPage(data, 1);


// START HERE


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
// create elements neede to diplay the pagination button

for (let i = 0; i < pagesNeeded; i++) {
  // give first pagination button the class "active"
  if (i == 0) {
    linkList.insertAdjacentHTML("beforeend", `<li>
      <button class="active" type="button">${i + 1}</button>
    </li>`);
    } else {
    linkList.insertAdjacentHTML("beforeend",
    `<li>
    <button type="button">${i + 1}</button>
    </li>`);
    }
  }
}

// create event listener on the `link-list` element

linkList.addEventListener('click', (e) => {
  let eventTarget = e.target;
// if click event target is button:
  if (eventTarget.tagName === 'BUTTON') {
    // remove "active" class from previous button
    document.querySelector('.active').className = '';
    //add active class to the clicked button
   e.target.className === 'active';
    // call showPage function passing the `list` parameter and page to display as arugments
    showPage(studentList, eventTarget.textContent);
      }
   });


// Call functions
