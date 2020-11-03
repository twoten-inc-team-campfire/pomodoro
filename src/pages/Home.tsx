import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import HelloWorld from '../components/HelloWorld';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pomodoro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <HelloWorld />
      </IonContent>
    </IonPage>
  );
};

export default Home;
