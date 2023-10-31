// Load JSON data
fetch('schools.json')
  .then(response => response.json())
  .then(data => {
    // Populate cards
    populateCards(data);

    // Populate dropdowns
    populateDropdowns(data);
  });

// Function to populate cards
function populateCards(schools) {
  const resultsDiv = document.getElementById('results');
  
  schools.forEach(school => {
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
  });
}

// Function to populate dropdowns
function populateDropdowns(schools) {
  const teaRegionSet = new Set();
  const typeSet = new Set();
  
  schools.forEach(school => {
    teaRegionSet.add(school["TEA REGION"]);
    typeSet.add(school.type);
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
