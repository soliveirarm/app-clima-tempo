import { IonItem, IonList } from "@ionic/react"
import { Coordinates } from "../types"

function UserLocation({ longitude, latitude }: Coordinates) {
  return (
    <IonList>
      <IonItem>Longitude: {longitude}</IonItem>
      <IonItem>Latitude: {latitude}</IonItem>
    </IonList>
  )
}

export default UserLocation
