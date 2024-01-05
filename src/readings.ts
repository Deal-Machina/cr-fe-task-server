import {BACK_FILL_TIME, SENSORS, TSensorConfig} from './config'
import {getCurrentTime} from './utils'

export type TReading = {
  name: string
  time: number
  value: number
}
export type TReadingLine = `${number},${string},${number}`

/**
 * Generates a reading for a given sensor at a given time
 * @param sensor
 * @param time
 */
export function generateReading(sensor: TSensorConfig, time: number): TReading {
  return {
    name: sensor.name,
    time,
    value: Number((sensor.min + Math.random() * (sensor.max - sensor.min)).toFixed(2)),
  }
}

/**
 * Generates readings from a sensor starting from a given time up until now
 * @param sensor
 * @param fromTime
 */
export function generateReadings(sensor: TSensorConfig, fromTime: number): TReading[] {
  const readings: TReading[] = []

  for (let time = fromTime; time < getCurrentTime(); time += sensor.frequency) {
    readings.push(generateReading(sensor, time))
  }

  return readings
}

/**
 * Formats a reading into the format required in the API
 * @param reading
 */
export function outputReading(reading: TReading): TReadingLine {
  return `${reading.time},${reading.name},${reading.value}`
}

/**
 * Generates sensor readings back from the time specified
 * @param backFillTime
 * @param sensors
 */
export function backFillReadings(
  backFillTime: number = BACK_FILL_TIME,
  sensors: TSensorConfig[] = SENSORS
): TReading[] {
  const readings = sensors.flatMap(sensor => generateReadings(sensor, getCurrentTime() - backFillTime))

  return readings.sort((A, B) => A.time - B.time)
}

/**
 * Repeatedly appends a new reading to the provided readings array with the frequency of the sensor
 * @param sensor
 * @param readings
 */
export function startGeneratingSensor(sensor: TSensorConfig, readings: TReading[]) {
  setInterval(() => {
    const reading = generateReading(sensor, getCurrentTime())
    readings.push(reading)

    console.log(reading)
  }, sensor.frequency)
}
