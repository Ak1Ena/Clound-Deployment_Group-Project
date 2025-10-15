import express from 'express'
import bodyParser from 'body-parser'

import authRoute from './Routes/AuthRoute'
import queueRoute from './Routes/QueueRoute'
// import adminRoute from './Routes/AdminRoute'

const app = express()
const PORT = process.env.PORT || 3000
app.use(bodyParser.json())

app.use('/api', authRoute)
app.use('/api', queueRoute)
// app.use('/api', adminRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});