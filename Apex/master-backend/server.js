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
const blynkAuthToken = 'your-auth-token'; // Replace with your Blynk Auth Token
const blynkApiUrl = `http://blynk-cloud.com/${blynkAuthToken}/get/V1`; // V1 is an example virtual pin

async function getBlynkData() {
    // try {
    //     const response = await axios.get(blynkApiUrl);
    //     const data = response.data;
    //     console.log(data)
    //     return data;
    // } catch (error) {
    //     console.error('Error fetching data from Blynk:', error);
    // }

    return 69
}













/* IOT Stuff ends here I guess*/


/* ML Model part starts here */

app.post("/predict-disease", upload.single("image"), async (req, res) => {
    try {
        // Create a new FormData object
        const formData = new FormData()
        
        // Attach the image to the FormData object
        formData.append("image", fs.createReadStream(path.join(__dirname, "images", req.file.filename)))
        
        // Send the image to the FastAPI route
        const response = await axios.post("http://localhost:8000/predict-disease", formData, {
            headers: {
                ...formData.getHeaders() // Automatically adds the correct headers for multipart/form-data
            }
        })
        
        const disease_name = response.data.disease_name
            
        // Return the image URL from FastAPI to the client
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
        
    // Attach the image to the FormData object
    formData.append("image", fs.createReadStream(path.join(__dirname, "images", req.file.filename)))

    const { location } = req.body

    const moisture = await getBlynkData()

    const openWeatherMapAPIKey = "28523b528990680c54c67f3b5de1d41d"
    const openWeatherMapAPIURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    const weatherFullURL = openWeatherMapAPIURL + location + "&appid=" + openWeatherMapAPIKey
    const weatherResponse = await axios.get(weatherFullURL)
    const weatherData = weatherResponse.data

    const temperature = weatherData.main.temp
    const weather = weatherData.weather[0].main
    const humidity = weatherData.main.humidity
    const windSpeed = weatherData.wind.speed

    console.log("Debug Message : " + location + " " + temperature + " " + weather + " " + moisture + " " + humidity + " " + windSpeed)


    formData.append("temperature", temperature)
    formData.append("moisture", moisture)
    formData.append("weather", weather)
    formData.append("location", location)
    formData.append("humidity", humidity)
    formData.append("windSpeed", windSpeed)

    
    // Send the image to the FastAPI route
    const response = await axios.post("http://localhost:8000/predict-suitable-crop", formData, {
        headers: {
            ...formData.getHeaders() // Automatically adds the correct headers for multipart/form-data
        }
    })
    
    const suitable_crop = response.data.suitable_crop
    
    // Return the image URL from FastAPI to the client
    res.json({
        suitable_crop: suitable_crop
    })
})


/* ML Model part ends here */




/*  */




app.post("/test-send-image", upload.single("image"), async (req, res) => {
    try {
        // Create a new FormData object
        const formData = new FormData()
        
        // Attach the image to the FormData object
        formData.append("image", fs.createReadStream(path.join(__dirname, "images", req.file.filename)))
        
        // Send the image to the FastAPI route
        const response = await axios.post("http://localhost:8000/send-image", formData, {
            headers: {
                ...formData.getHeaders() // Automatically adds the correct headers for multipart/form-data
            }
        })
        
        const image_url = response.data.image_url
        
        // Return the image URL from FastAPI to the client
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