const store = new Storage()
await store.create()
const HISTORY = await store.get("HISTORY")

import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react"

import "./Home.css"

import { useEffect, useState } from "react"

import { Geolocation } from "@capacitor/geolocation"

import axios from "axios"

import Weather from "../components/Weather/Weather"
import History from "../components/History"

import { Storage } from "@ionic/storage"

import { Coordinates } from "../types/coordinates"
import { WeatherProps } from "../types/weather"
import UserLocation from "../components/UserLocation"
import GetWeatherInfo from "../components/GetWeatherInfo"

const API_KEY = import.meta.env.VITE_API_KEY

const instance = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
})

const Home: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [weather, setWeather] = useState<WeatherProps | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [history, setHistory] = useState(HISTORY || [])
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false)

  useEffect(() => {
    const getUserLocation = async () => {
      const coordinates = await Geolocation.getCurrentPosition()
      setUserLocation({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      })
    }
    getUserLocation()
  }, [])

  useEffect(() => {
    store.set("HISTORY", history)
  }, [store, history, HISTORY])

  const saveData = async (data: WeatherProps) => {
    let d = new Date().toLocaleString()
    let [date, time] = d.split(", ")
    setHistory([...history, { id: Date.now(), data, time, date }])
    store.set("HISTORY", history)
  }

  const getWeather = async () => {
    setIsLoading(true)
    if (userLocation) {
      const { longitude, latitude } = userLocation
      const URL = `current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no&lang=pt`
      const { data } = await instance.get(URL)
      setWeather(data)
      saveData(data)
    }
    setIsLoading(false)
  }

  const clearHistory = () => {
    store.clear()
    setHistory([])
    setIsHistoryVisible(false)
  }

  const toggleHistory = () => setIsHistoryVisible((prevState) => !prevState)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>App Clima Tempo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <IonHeader>
          <IonTitle>Suas coordenadas</IonTitle>
        </IonHeader>

        {userLocation && <UserLocation {...userLocation} />}

        <GetWeatherInfo onClick={getWeather} />

        {weather && <Weather {...weather} />}
        {isLoading && (
          <IonItem className="ion-text-center">Buscando dados...</IonItem>
        )}
      </IonContent>

      {history.length !== 0 && (
        <>
          <IonButton onClick={toggleHistory}>
            {isHistoryVisible ? "Ocultar" : "Mostrar"} Histórico
          </IonButton>

          <History
            clearHistory={clearHistory}
            isVisible={isHistoryVisible}
            history={history}
          />
        </>
      )}
    </IonPage>
  )
}

export default Home
