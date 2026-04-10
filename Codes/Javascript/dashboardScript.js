// Copy the calculateAge function here since it's needed
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function showUserFrequency() {
    const registrationData = getRegistrationData(); // From mainScript.js

    // Initialize counters
    const genderCounts = {
        Male: 0,
        Female: 0,
        Other: 0
    };

    const ageGroups = {
        "18-25": 0,
        "26-35": 0,
        "36-50": 0,
        "50+": 0
    };

    // Process each user
    registrationData.forEach(user => {
        // Gender
        const gender = user.gender;
        if (genderCounts.hasOwnProperty(gender)) {
            genderCounts[gender]++;
        } else {
            genderCounts.Other++; // In case of unexpected values
        }

        // Age
        const age = calculateAge(user.dateOfBirth);
        if (age >= 18 && age <= 25) {
            ageGroups["18-25"]++;
        } else if (age >= 26 && age <= 35) {
            ageGroups["26-35"]++;
        } else if (age >= 36 && age <= 50) {
            ageGroups["36-50"]++;
        } else if (age > 50) {
            ageGroups["50+"]++;
        }
    });

    // Display the data
    displayFrequencyData(genderCounts, ageGroups);
}

function displayFrequencyData(genderCounts, ageGroups) {
    const genderChart = document.getElementById("gender-chart");
    const ageChart = document.getElementById("age-chart");

    // Simple bar chart for gender
    genderChart.innerHTML = `
        <div class="chart">
            <div class="bar">
                <span>Male: ${genderCounts.Male}</span>
                <div class="bar-fill" style="width: ${(genderCounts.Male / Object.values(genderCounts).reduce((a,b)=>a+b,0)) * 100}%"></div>
            </div>
            <div class="bar">
                <span>Female: ${genderCounts.Female}</span>
                <div class="bar-fill" style="width: ${(genderCounts.Female / Object.values(genderCounts).reduce((a,b)=>a+b,0)) * 100}%"></div>
            </div>
            <div class="bar">
                <span>Other: ${genderCounts.Other}</span>
                <div class="bar-fill" style="width: ${(genderCounts.Other / Object.values(genderCounts).reduce((a,b)=>a+b,0)) * 100}%"></div>
            </div>
        </div>
    `;

    // Simple bar chart for age groups
    ageChart.innerHTML = `
        <div class="chart">
            <div class="bar">
                <span>18-25: ${ageGroups["18-25"]}</span>
                <div class="bar-fill" style="width: ${(ageGroups["18-25"] / Object.values(ageGroups).reduce((a,b)=>a+b,0)) * 100}%"></div>
            </div>
            <div class="bar">
                <span>26-35: ${ageGroups["26-35"]}</span>
                <div class="bar-fill" style="width: ${(ageGroups["26-35"] / Object.values(ageGroups).reduce((a,b)=>a+b,0)) * 100}%"></div>
            </div>
            <div class="bar">
                <span>36-50: ${ageGroups["36-50"]}</span>
                <div class="bar-fill" style="width: ${(ageGroups["36-50"] / Object.values(ageGroups).reduce((a,b)=>a+b,0)) * 100}%"></div>
            </div>
            <div class="bar">
                <span>50+: ${ageGroups["50+"]}</span>
                <div class="bar-fill" style="width: ${(ageGroups["50+"] / Object.values(ageGroups).reduce((a,b)=>a+b,0)) * 100}%"></div>
            </div>
        </div>
    `;
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", showUserFrequency);