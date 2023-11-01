 

// Fetch data once when page loads
fetch('schools.json')
  .then(response => response.json())
  .then(data => {
    allSchools = data;
    populateCards(data);  // Initialize cards
    populateDropdowns(data);  // Initialize dropdowns
  });


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
      <div class="card">
        <h2>${school.School}</h2>
        <p>Address: ${school.Address}</p>
        <p>City: ${school.City}</p>
        <p>Phone: ${school.PHONE}</p>
        <p>District: ${school.DISTRICT}</p>
        <p>TEA Region: ${school["TEA REGION"]}</p>
        <p>TEA R#: ${school["TEA REGION #"]}</p>
        <p>Type: ${school.TYPE}</p>
        <p>Enrollment: ${school.ENROLLMENT}</p>
        <p>Website: ${school.WEB}</p>
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

// Pagination event listeners
document.getElementById('prevPageBtn').addEventListener('click', function() {
  currentPage--;
  populateCards(allSchools);
});

document.getElementById('nextPageBtn').addEventListener('click', function() {
  currentPage++;
  populateCards(allSchools);
});







  
