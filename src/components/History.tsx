import {
  IonButton,
  IonContent,
  IonImg,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
} from "@ionic/react"

import { HistoryProps } from "../types"

type HistoryArray = {
  history: HistoryProps[]
  isVisible: boolean
  clearHistory: () => void
}

function History({
  history = [],
  isVisible = false,
  clearHistory,
}: HistoryArray) {
  return (
    <IonContent className={!isVisible ? "ion-hide" : undefined}>
      <IonList>
        {history.map(({ id, data, date, time }: HistoryProps) => {
          const { location, current } = data
          const { icon, text } = current.condition

          return (
            <IonItemGroup key={id}>
              <IonItemDivider className="ion-padding">
                <IonLabel>
                  {location.name}, {location.country} - {date},{time}
                </IonLabel>
              </IonItemDivider>

              <IonItem>
                <IonImg src={icon} />
                <IonLabel>
                  {current.temp_c.toFixed(0)} ºC - {text}
                </IonLabel>
              </IonItem>
            </IonItemGroup>
          )
        })}
      </IonList>

      <IonButton
        className="ion-float-end"
        color="danger"
        onClick={clearHistory}
      >
        Limpar histórico
      </IonButton>
    </IonContent>
  )
}

export default History
