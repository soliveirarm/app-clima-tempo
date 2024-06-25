import {
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react"

import { WeatherProps } from "../../types/Weather"

import "./Weather.css"

function Weather({ current, location }: WeatherProps) {
  const { condition, temp_c, humidity, wind_kph, precip_mm } = current
  const { country, region, name, localtime } = location

  const date = localtime.split(" ")[0]
  const [year, month, day] = date.split("-")

  return (
    <IonList>
      <IonItem>
        <IonImg className="icon" src={condition.icon} />
        <IonText className="temperature">{temp_c.toFixed(0)} ºC</IonText>
        <IonText>{condition.text}</IonText>
      </IonItem>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Cidade:</IonLabel>
        </IonItemDivider>
        <IonItem>
          {name}, {region}, {country}
        </IonItem>
      </IonItemGroup>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Data:</IonLabel>
        </IonItemDivider>
        <IonItem>
          {day}/{month}/{year}
        </IonItem>
      </IonItemGroup>
      <IonItemGroup className="details">
        <IonItemDivider>
          <IonLabel>Detalhes</IonLabel>
        </IonItemDivider>

        <IonItem>
          <IonLabel>Umidade:</IonLabel>
          <IonText>{humidity}%</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Precipitação:</IonLabel>
          <IonText>{precip_mm}%</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Vento:</IonLabel>
          <IonText>{wind_kph}km/h</IonText>
        </IonItem>
      </IonItemGroup>
    </IonList>
  )
}

export default Weather
