window.onload = () => {
var weather = document.getElementById("weather");




function searchByCityName() {

    let city = document.getElementById("city").value;
let weatherKey = "b77e07f479efe92156376a8b07640ced";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${weatherKey}`


    fetch(url)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    weather.value = data.main.temp;
    sendWeather(data.main.temp);
});



}

function sendWeather(temp) {

    fetch(`/temp?temp=${temp}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        
        const tracksParse = JSON.parse(data);
        const tracks = tracksParse.items
        console.log(tracks);
        console.log(tracks[0].track.name)

         const listTacks = tracks.map(track => {
             return `<p>${track.track.name} </p>`
         })

        let elem =  document.getElementById("music");
        elem.innerHTML = "";
        elem.innerHTML = listTacks;

        }) 
    

}





document.getElementById("search").addEventListener('click',searchByCityName);

















































}