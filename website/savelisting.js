document.getElementById('postJobForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const jobData = {
         company: document.getElementById('company').value,
         title : document.getElementById('title').value,
        description :document.getElementById('description').value,
         salary : document.getElementById('salary').value,
        experience : document.getElementById('experience').value
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