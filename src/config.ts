export type TSensorConfig = {
  name: string
  /**
   * How often the sensor produces a reading, in milliseconds
   */
  frequency: number
  min: number
  max: number
}

export const MINUTE_MS = 1_000 * 60

export const temperatureSensor = {
  name: 'temp1',
  frequency: MINUTE_MS,
  min: -1,
  max: 6,
} satisfies TSensorConfig

export const humiditySensor = {
  name: 'hum1',
  frequency: MINUTE_MS * 2,
  min: 70,
  max: 85,
} satisfies TSensorConfig

export const SENSORS = [temperatureSensor, humiditySensor]

export const PORT = 4242
export const ROWS_LIMIT = 100
export const BACK_FILL_TIME = MINUTE_MS * 60 * 30
