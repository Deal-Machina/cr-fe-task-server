import cors from 'cors'
import express from 'express'

import {PORT, ROWS_LIMIT, SENSORS} from './config'
import {backFillReadings, outputReading, startGeneratingSensor} from './readings'

const readings = backFillReadings()

SENSORS.forEach(sensor => {
  startGeneratingSensor(sensor, readings)
})

const app = express()
app.use(cors())

app.get('/reading', (req, res) => {
  const start = Number(req.query.start ?? undefined)

  if (Number.isNaN(start)) {
    res.status(400).send('The start parameter is required')
    return
  }

  const firstReadingIndex = readings.findIndex(reading => reading.time > start)

  if (firstReadingIndex === -1) {
    res.status(204).send()
    return
  }

  const readingsFromTime = readings.slice(firstReadingIndex, firstReadingIndex + ROWS_LIMIT)

  res.send(readingsFromTime.map(outputReading).join('\n'))
})

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT} with ${readings.length} readings`)
})
