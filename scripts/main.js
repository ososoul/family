document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const generation = document.querySelector('.generation');

    addButton.addEventListener('click', function() {
        // Add a new person to the family data
        fetch('http://localhost:3000/api/family', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'New Person', born: getCurrentDate(), occupation: 'Unknown' }),
        })
        .then(response => response.json())
        .then(newFamilyMember => renderGeneration([newFamilyMember, ...familyData]));
    });

    // Fetch initial family data
    fetch('http://localhost:3000/api/family')
        .then(response => response.json())
        .then(data => {
            familyData = data;
            renderGeneration(familyData);
        });

    function renderGeneration(data) {
        // Clear existing generation
        generation.innerHTML = '';

        // Render each person in the generation
        data.forEach(personData => {
            const personElement = createPersonElement(personData);
            generation.appendChild(personElement);
        });
    }

    // ... (rest of the code remains the same)
});
