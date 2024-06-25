import { WeatherProps } from "./weather"

export type HistoryProps = {
  id: number
  data: WeatherProps
  time: string
  date: string
}
