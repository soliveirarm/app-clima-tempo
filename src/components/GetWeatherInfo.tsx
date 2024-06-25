import { IonButton } from "@ionic/react"

type BtnProps = {
  onClick: () => void
}

function GetWeatherInfo({ onClick }: BtnProps) {
  return (
    <IonButton className="ion-padding" onClick={onClick}>
      Clique para obter informações sobre o clima
    </IonButton>
  )
}

export default GetWeatherInfo
