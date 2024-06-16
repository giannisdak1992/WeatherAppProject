import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import env from 'dotenv'

const app = express()
const router = express.Router()
const port = 3000
env.config()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.post('/weather', async (req, res) => {
  const city = req.body.cityName
  const apiKey = process.env.API_KEY
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  let weather
  let icon
  let imageURL
  let error = null
  try {
    const response = await axios.get(APIUrl)
    weather = response.data
    icon = weather.weather[0].icon
    imageURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
    console.log(weather)
    res.render('index.ejs', { weather: weather, imageURL: imageURL })
  } catch (error) {
    weather = null
    error = 'Error, please try again'
    res.render('index.ejs', { weather: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
