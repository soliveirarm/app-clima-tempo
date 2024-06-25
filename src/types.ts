export type WeatherProps = {
  current: {
    condition: {
      text: string
      icon: string
    }
    humidity: number
    precip_mm: number
    temp_c: number
    wind_kph: number
  }
  location: {
    country: string
    localtime: string
    name: string
    region: string
  }
}

export type Coordinates = {
  latitude: number
  longitude: number
}

export type HistoryProps = {
  id: number
  data: WeatherProps
  time: string
  date: string
}
