import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import "./Home.css"

import { Geolocation } from "@capacitor/geolocation"
import { useEffect, useState } from "react"
import axios from "axios"

import { Coordinates } from "../types/Coordinates"
import Weather from "../components/Weather/Weather"
import { WeatherProps } from "../types/Weather"

const API_KEY = import.meta.env.VITE_API_KEY

const instance = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
})

const Home: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [weather, setWeather] = useState<WeatherProps | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const getWeather = async () => {
    setIsLoading(true)
    if (userLocation) {
      const { longitude, latitude } = userLocation
      const { data } = await instance.get(
        `current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no&lang=pt`
      )
      setWeather(data)
    }
    setIsLoading(false)
  }

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

        {userLocation && (
          <IonList>
            <IonItem>Longitude: {userLocation.longitude}</IonItem>
            <IonItem>Latitude: {userLocation.latitude}</IonItem>
          </IonList>
        )}

        <IonButton onClick={getWeather}>
          Clique para obter informações sobre o clima
        </IonButton>

        {weather && <Weather {...weather} />}
        {isLoading && (
          <IonText className="ion-text-center">Buscando dados...</IonText>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Home
