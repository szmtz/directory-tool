 // declare allSchools variable
 let allSchools = []; 

// Fetch data once when page loads
fetch('schools.json')
  .then(response => response.json())
  .then(data => {
    allSchools = data;
    populateCards(data);  // Initialize cards
    populateDropdowns(data);  // Initialize dropdowns
  });

// Utility functions at the top
function ensureHttpPrefix(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }
  return url;
}

// Function to populate cards
// function populateCards(schools) {
//   const resultsDiv = document.getElementById('results');

let currentPage = 1;
const itemsPerPage = 50;

function populateCards(schools) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';  // Clear the container
  
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = Math.min(startIndex + itemsPerPage, schools.length);

  for (let i = startIndex; i < endIndex; i++) {
    const school = schools[i];
    const card = `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${school.School}</h5>
              <p class="card-text"><strong>Address:</strong> ${school.Address}</p>
              <p class="card-text"><strong>City:</strong> ${school.City}</p>
              <p class="card-text"><strong>Phone:</strong> ${school.PHONE}</p>
              <p class="card-text"><strong>District:</strong> ${school.DISTRICT}</p>
              <p class="card-text"><strong>TEA Region:</strong> ${school["TEA REGION"]}</p>
              <p class="card-text"><strong>Type:</strong> ${school.TYPE}</p>
              <p class="card-text"><strong>Enrollment:</strong> ${school.ENROLLMENT}</p>
              <p class="card-text"><strong>Website:</strong> <a href="${school.WEB}" target="_blank">${school.WEB}</a></p>
            </div>
          </div>
        </div>
      </div>

    `;
    resultsDiv.innerHTML += card;
  }

    // Insert pagination control logic here
    const totalPages = Math.ceil(schools.length / itemsPerPage);
    document.getElementById('currentPageLabel').textContent = `Page ${currentPage} of ${totalPages}`;
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Function to populate dropdowns
function populateDropdowns(schools) {
  const teaRegionSet = new Set();
  const typeSet = new Set();
  
  schools.forEach(school => {
    teaRegionSet.add(school["TEA REGION"]);
    typeSet.add(school.TYPE);
  });
  
  populateDropdown('teaRegionSelect', Array.from(teaRegionSet));
  populateDropdown('typeSelect', Array.from(typeSet));
}

// General function to populate a dropdown
function populateDropdown(id, options) {
  const select = document.getElementById(id);
  
  options.forEach(option => {
    const optElement = document.createElement('option');
    optElement.value = option;
    optElement.textContent = option;
    
    select.appendChild(optElement);
  });
}

function sortSchools(schoolsArray, sortByKey) {
  switch (sortByKey) {
    case 'Name':
      return schoolsArray.sort((a, b) => a.School.localeCompare(b.School));
    case 'City':
      return schoolsArray.sort((a, b) => a.City.localeCompare(b.City));
    case 'Enrollment':
      return schoolsArray.sort((a, b) => a.ENROLLMENT - b.ENROLLMENT);
    default:
      return schoolsArray; // If no sorting key is provided, return the original array
  }
}


// Function to filter and display cards
function filterAndDisplayCards(schools) {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const selectedTeaRegion = document.getElementById('teaRegionSelect').value;
  const selectedType = document.getElementById('typeSelect').value;
  const selectedSortBy = document.getElementById('sortSelect').value;  // New line

  const filteredSchools = schools.filter(school => {
    return (
      school.School.toLowerCase().includes(searchInput) &&
      (!selectedTeaRegion || school["TEA REGION"] === selectedTeaRegion) &&
      (!selectedType || school.TYPE === selectedType)
    );
  });

  const sortedSchools = sortSchools(filteredSchools, selectedSortBy);  // New line
  
  populateCards(sortedSchools);  // Use the sorted list
}

 
  
  
 // Your existing event listeners could then use `allSchools` instead of fetching anew
document.getElementById('searchInput').addEventListener('input', function() {
  filterAndDisplayCards(allSchools);
});

document.getElementById('teaRegionSelect').addEventListener('change', function() {
  filterAndDisplayCards(allSchools);
});

document.getElementById('typeSelect').addEventListener('change', function() {
  filterAndDisplayCards(allSchools);
});

// New event listener for sorting
document.getElementById('sortSelect').addEventListener('change', function() {
  const sortByKey = document.getElementById('sortSelect').value;
  const sortedSchools = sortSchools(allSchools, sortByKey);
  populateCards(sortedSchools);
});

// Pagination event listeners
document.getElementById('prevPageBtn').addEventListener('click', function() {
  currentPage--;
  populateCards(allSchools);
});

document.getElementById('nextPageBtn').addEventListener('click', function() {
  currentPage++;
  populateCards(allSchools);
});

// New event listener for Clear Filters button
document.getElementById('clearFiltersBtn').addEventListener('click', function() {
  // Reset dropdowns to default value
  document.getElementById('teaRegionSelect').value = "";
  document.getElementById('typeSelect').value = "";
  document.getElementById('sortSelect').value = "";
  // Reset search input
  document.getElementById('searchInput').value = "";
  // Optionally, reset to the first page
  currentPage = 1;
  // Redisplay cards
  filterAndDisplayCards(allSchools);
});

// New event listener for Highest Enrollment button 


document.getElementById('highestEnrollmentBtn').addEventListener('click', function() {
  const sortedSchools = sortSchools(allSchools, 'Enrollment').reverse(); // Reverse to get highest enrollment first
  populateCards(sortedSchools);
});






  
