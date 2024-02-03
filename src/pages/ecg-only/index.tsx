import React, { useContext, useEffect } from 'react';
import { IonPage, useIonViewDidLeave } from '@ionic/react';
import { EcgDeviceContext } from '../../tools/ecg-plugin';
import { useHistory } from 'react-router';
import ECGChart from '../../components/Chart';
import './only.css';

function EcgOnly() {
  const a = 'hi';
  const history = useHistory();
  const {
    connectToDevice,
    debugMessages,
    deviceState,
    currentDeviceId,
    stopMonitor,
    cancelMonitor,
    addReportUUIDs: addScaleUUIDs,
    nearRawData,
    bpm,
    red,
  } = useContext(EcgDeviceContext);

  useIonViewDidLeave(() => {
    if (deviceState === 'online') {
      cancelMonitor();
    }
  });

  useEffect(() => {
    window.addEventListener('stop-monitor', () => {
      history.goBack();
    });

    const time = Number(localStorage.getItem('defaulttime') ?? '5');

    const start = Date.now();

    const inter = setInterval(() => {
      const duration = Math.floor((Date.now() - start) / 1000 / 60);
      console.log('duration', duration, time);
      if (duration >= time) {
        const event = new CustomEvent('out-stop');
        window.dispatchEvent(event);
        clearInterval(inter);
      }
    }, 1000);

    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <IonPage>
      <div className="list">
        <div className="only-title">
          <span>❤️ 心率变异性测试中...</span>
        </div>
        <div>
          <div
            style={{
              marginTop: 30,
              background: '#fff',
              borderRadius: 15,
              padding: '6px',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            当前心率：
            <span id='innerheart'>{bpm}</span>
          </div>
        </div>
        <ECGChart />
      </div>
    </IonPage>
  );
}

export default EcgOnly;
