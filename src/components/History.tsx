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
        {history.map(({ id, data, date, time }: HistoryProps) => (
          <IonItemGroup key={id}>
            <IonItemDivider className="ion-padding">
              <IonLabel>
                {data.location.name}, {data.location.country} - {date},
                {time.substring(0, 5)}
              </IonLabel>
            </IonItemDivider>

            <IonItem>
              <IonImg src={data.current.condition.icon} />
              <IonLabel>
                {data.current.temp_c.toFixed(0)} ºC -{" "}
                {data.current.condition.text}
              </IonLabel>
            </IonItem>
          </IonItemGroup>
        ))}
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
