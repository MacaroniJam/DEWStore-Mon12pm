/*Joel Henry 2300087*/
/*Question 6a. ShowUserFrequency() – Show’s user frequency based on Gender and Age Group:
show how many registered users fall under specific gender categories (e.g. Male, Female, Other)*/
const users = getRegistrationData();

const genderGroups= ["Male", "Female", "Other", "Prefer not to say"];
const genderCounts = {
    "Male": users.filter(user => user.gender === "Male").length,
    "Female": users.filter(user => user.gender === "Female").length,
    "Other": users.filter(user => user.gender === "Other").length,
    "Prefer not to say": users.filter(user => user.gender === "Prefer not to say").length
};
const genderColours = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2"];

new Chart(document.getElementById('genderChart'), {
    type: "bar",
    data: {
        labels: genderGroups,
        datasets: [{
            label: "Number of Users",
            data: Object.values(genderCounts),
            backgroundColor: genderColours
        }]
    },
    options:
    {
        legend: { display: false },

        title: { display: false }
    }

});

/*Question 6a. ShowUserFrequency() – Show’s user frequency based on Gender and Age Group:
show how many registered users fall under different age groups (e.g., 18-25, 26-35, 36-50, 50+).*/
const ageGroups = ["18-25", "26-35", "36-50", "50+"];
const usersAge = users.map(user => calculateAge(user.dateOfBirth));
const ageCounts = {
    "18-25": usersAge.filter(age => age >= 18 && age <= 25).length,
    "26-35": usersAge.filter(age => age >= 26 && age <= 35).length,
    "36-50": usersAge.filter(age => age >= 36 && age <= 50).length,
    "50+": usersAge.filter(age => age > 50).length

};
const ageColours = ["#59a14f", "#edc949", "#af7aa1", "#ff9da7"];

new Chart(document.getElementById('ageChart'), {
    type: "bar",
    data: {
        labels: ageGroups,
        datasets: [{
            label: "Number of Users",
            data: Object.values(ageCounts),
            backgroundColor: ageColours
        }]
    },
    options:
    {
        legend: { display: false },
        title: { display: false }
    }
});