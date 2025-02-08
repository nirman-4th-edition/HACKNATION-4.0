const express = require("express")
const cors = require("cors")
const axios = require("axios")
const multer = require("multer")
const path = require("path")
const FormData = require("form-data")
const fs = require("fs")  


const app = express()

app.use(cors())
app.use(express.json())


const storage = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
    
})

app.use("/image", express.static("images"))





/* IOT Stuff starts here I guess*/

// <your-auth-token> is the authorization token for your Blynk project (you'll find this in the Blynk app).
const blynkAuthToken = 'SSQkThqEWuXD1c768hVxBng3Hjp8kD6D'; // Replace with your Blynk Auth Token
const blynkApiBaseUrl = `http://blr1.blynk.cloud/external/api/get?token=${blynkAuthToken}&`;

async function getBlynkData() {
    const humidityPIN = "v5"
    const temperaturePIN = "v6"
    const moisturePIN = "v2"

    

    try {
        const blynkMainUrl = blynkApiBaseUrl + `${humidityPIN}&${temperaturePIN}&${moisturePIN}`;    

        const response = await axios.get(blynkMainUrl); 

        const data = response.data;
        console.log(data)
        
        const humidity = data.v5
        const temperature = data.v6
        const moisture = data.v2

        return {
            humidity: humidity,
            temperature: temperature,
            moisture: moisture, 
        };
    } catch (error) {
        console.error('Error fetching data from Blynk:', error);
    }
}













/* IOT Stuff ends here I guess*/


/* ML Model part starts here */

app.post("/predict-disease", upload.single("image"), async (req, res) => {
    try {
        const formData = new FormData()
        formData.append("image", fs.createReadStream(path.join(__dirname, "images", req.file.filename)))
        
        const response = await axios.post("http://localhost:8000/predict-disease", formData, {
            headers: {
                ...formData.getHeaders()
            }
        })
        
        const disease_name = response.data.disease_name
            
        res.json({
            disease_name: disease_name
        })

    } catch (error) {
        console.error("Error uploading image to FastAPI:", error)
        res.status(500).json({ error: "Error uploading image" })
    }
})

app.post("/predict-suitable-crop", upload.single("image"), async (req, res) => {
    const formData = new FormData()
        
    formData.append("image", fs.createReadStream(path.join(__dirname, "images", req.file.filename)))

    const location = req.body.location  
    const nitrogen = req.body.nitrogen  
    const potassium = req.body.potassium 
    const phosphorus = req.body.phosphorus
    const pHValue = req.body.pHValue    

    // const IOTResponse = await getBlynkData()
    // const humidity = IOTResponse.humidity
    // const temperature = IOTResponse.temperature
    // const moisture = IOTResponse.moisture

    const moisture = 69 // Comment this

    const openWeatherMapAPIKey = "28523b528990680c54c67f3b5de1d41d"
    const openWeatherMapAPIURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    const weatherFullURL = openWeatherMapAPIURL + location + "&appid=" + openWeatherMapAPIKey
    const weatherResponse = await axios.get(weatherFullURL)
    const weatherData = weatherResponse.data

    const humidity = weatherData.main.humidity  // Comment this
    const temperature = 20  // Comment this
    const weather = weatherData.weather[0].main
    const windSpeed = weatherData.wind.speed

    console.log("Debug Message : " + location + " " + temperature + " " + weather + " " + moisture + " " + humidity + " " + windSpeed + "\n" + nitrogen + " " + potassium + " " + phosphorus + " " + pHValue)


    formData.append("temperature", temperature)
    formData.append("moisture", moisture)
    formData.append("weather", weather)
    formData.append("location", location)
    formData.append("humidity", humidity)
    formData.append("windSpeed", windSpeed)
    formData.append("nitrogen", nitrogen)
    formData.append("potassium", potassium)
    formData.append("phosphorus", phosphorus)   
    formData.append("pHValue", pHValue)

    const response = await axios.post("http://localhost:8000/predict-suitable-crop", formData, {
        headers: {
            ...formData.getHeaders() 
        }
    })
    
    const suitable_crop = response.data.suitable_crop
    
    res.json({
        suitable_crop: suitable_crop 
    })
})


/* ML Model part ends here */




/* Fertiliser Recommender part starts here */
app.post("/fertiliser-recommender",  async (req, res) => {
    const nitrogen = req.body.nitrogen
    const phosphorus = req.body.phosphorus
    const potassium = req.body.potassium
    const pH = req.body.pH
    const cropName = req.body.cropName

    // const IOTResponse = await getBlynkData()
    // const moisture = IOTResponse.moisture
    // const temperature = IOTResponse.temperature

    const moisture = 50 // Comment this
    const temperature = 25 // Comment this

    console.log("Debug Message : " + nitrogen + " " + phosphorus + " " + potassium + " " + pH + " " + cropName + " " + temperature + " " + moisture)

    const response = await axios.post("http://localhost:8000/fertiliser-recommender", {
        nitrogen: nitrogen,
        phosphorus: phosphorus,
        potassium: potassium,
        pH: pH,
        cropName: cropName, 

        temperature: temperature,
        moisture: moisture,
    })

    const recommended_fertiliser = response.data.recommended_fertiliser

    res.json({
        recommended_fertiliser: recommended_fertiliser
    })
})


/* Fertiliser Recommender part ends here */




app.post("/test-send-image", upload.single("image"), async (req, res) => {
    try {
        const formData = new FormData()
        formData.append("image", fs.createReadStream(path.join(__dirname, "images", req.file.filename)))
        
        const response = await axios.post("http://localhost:8000/send-image", formData, {
            headers: {
                ...formData.getHeaders()
            }
        })
        
        const image_url = response.data.image_url
        
        res.json({
            image_url: image_url
        })

    } catch (error) {
        console.error("Error uploading image to FastAPI:", error)
        res.status(500).json({ error: "Error uploading image" })
    }
})

app.post("/send-image", upload.single("image"), (req, res) => {
    console.log(req.file)

    res.json({
        image_url: `http://localhost:3000/image/${req.file.filename}`
    })
})

app.post("/test", async (req, res) => {
    const { name } = req.body

    const response = await axios.post(`http://localhost:8000/test`, {
        name: name
    })

    const output = response.data.output

    res.json({
        output: output
    })
})

app.get("/hello", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})





app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.json({
            message: err.message    
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})