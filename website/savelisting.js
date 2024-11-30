document.getElementById('postJobForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get the form values
  const company = document.getElementById('company').value;
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const salary = document.getElementById('salary').value;
  const experience = document.getElementById('experience').value;
  console.log('Form submitted:', { company, title, description, salary, experience });

  // Create the job data object
  const jobData = {
      company,
      title,
      description,
      salary,
      experience
  };

  // Send the job data to the backend using fetch
  fetch('http://localhost:3001/api/post-job', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData), // Convert data to JSON string
  })
  .then(response => response.text()) // Get the response as plain text
  .then(data => {
      document.getElementById('responseMessage').innerText = data; // Display the result
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('responseMessage').innerText = 'Error posting job.';
  });
});

fetch('/get-companies')
.then(response => response.json())
.then(data => {
    const selectElement = document.getElementById('employee-select');

    // Clear the existing options (if any)
    selectElement.innerHTML = '<option value="" disabled selected>Select a Company</option>';

    // Loop through the fetched companies and add them to the dropdown
    data.forEach(company => {
        const option = document.createElement('option');
        option.value = company._id; // Assuming your companies have _id as unique identifiers
        option.textContent = company.name; // Use the company name as the display text
        selectElement.appendChild(option);
    });
})
.catch(error => {
    console.error('Error fetching companies:', error);
});

