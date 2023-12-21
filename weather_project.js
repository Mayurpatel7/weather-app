// initializing all elements constants
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField"); 
const form = document.querySelector("form");


// adding event listner to form
form.addEventListener("submit", search);


// weather api password = Weather@12

// default location
let target  = "ahmedabad";


// function to fetch data from Weather API
const fetchData = async() => {
    try {
       const url = `https://api.weatherapi.com/v1/current.json?key=ca568b7237dc46b99eb173648230908&q=${target}`


      const response = await fetch(url);
      const data  = await response.json();

      // Destructuring 
      const {
        current:{
            temp_c, 
        condition: {text, icon}                       // cloud emoji pass here
      },
        location:{name, localtime}
    } = data;

    // Calling update Dom function
    updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location not found")
  }
};


// function to update Dom
function updateDom(temperature, city, time, emoji, text){

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperatureField.innerText = temperature;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${exactDay}  ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);


// function to search the location
function search(e){
    e.preventDefault();

    target = searchField.value;

    fetchData(target);
}


// function to get the name of day
function getDayFullName (num){
    switch(num){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Dont't Know";
    }
}

