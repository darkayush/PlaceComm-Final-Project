async function fetchCompanies() {
    const response = await fetch('http://localhost:3001/api/companies');
    const companies = await response.json();
    const companySelect = document.getElementById('company');

    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.Name; // Use the company's ObjectId
        option.textContent = company.Name; // Display the company's name
        companySelect.appendChild(option);
    });
}


document.getElementById('postJobForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const jobData = {
         company: document.getElementById('company').value,
         title : document.getElementById('title').value,
         jobtype : document.getElementById('jobtype').value,
        description :document.getElementById('description').value,
         salary : document.getElementById('salary').value,
        experience : document.getElementById('experience').value,
        qualification : document.getElementById('qualification').value,
        details : document.getElementById('details').value

    };

    const response = await fetch('http://localhost:3001/api/post-jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    });

    if (response.ok) {
        alert('Job posted successfully!');
        document.getElementById('postjobForm').reset();
    } else {
        alert('Error posting job.');
    }
});
fetchCompanies();