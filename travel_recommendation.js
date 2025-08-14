let data;

fetch('travel_recommendation_api.json')
.then(response => response.json())
.then(jsonData => {
    data = jsonData;
    console.log(data)
})
.catch(error => console.error('Error fetching data:', error));

document.getElementById('btnSearch').addEventListener('click', function() {


    const input = document.getElementById('conditionInput').value.toLowerCase();
    
    let results = [];

    if (!data) {
        console.error('Data not yet fetched');
        return;
    }

    if(input == "beach" || input == "beaches"){
        data.beaches.forEach(beach => {
            results.push(beach)
        });
    }else if(input == "temples" || input == "temple"){
        data.temples.forEach(temple => {
            results.push(temple);
        });
    }else if(input == "country" || input == "countries"){
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push(city);
            });
        });
    }

    console.log(results)
    displayResults(results);
});

document.getElementById('btnReset').addEventListener('click', function() {
    document.getElementById('results').innerHTML = '';
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('result-card');

        card.innerHTML = `
            <div class="card-image">
                <img src="${result.imageUrl}" alt="${result.name}">
            </div>
            <div class="card-content">
                <h3>${result.name}</h3>
                <p>${result.description}</p>
                <button class="visit-btn">Visit</button>
            </div>
        `;

        resultsDiv.appendChild(card);
    });
}

function contactUsSubmit() {
    alert('Thanks for contact')
}