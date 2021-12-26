const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

//Using body parser
app.use(bodyParser.urlencoded({extended: true}));

const  app_id = "&appid=1ccc02809fa6b3cc235504f144ac9259";
const  base_url = "https://api.openweathermap.org/data/2.5/weather?q=";
const units = "&units=metric"



app.get("/", function(req, res){

  res.sendFile(__dirname+"/index.html")

});

app.post("/", function(req,res) {
    const city = req.body.cityName
    https.get(base_url+city+app_id+units, function(response) {

      response.on("data", function(data){
        // converting the data into JSON since data received is hexa decimal
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const desc = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const icon_url = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>The Temperature in "+city+" is "+temp+" degree celsius</h1>")
        res.write("<p>The weather is currently "+desc+"</p>")
        res.write("<img src="+icon_url+" />")

        //We are allowed to send only on res in app however we can use write requests
        res.send()
        console.log(desc)
      });

    });

});
// const  city = "Singapore"
//

app.listen(3000, function(){
  console.log("Server running at port 3000");
});
