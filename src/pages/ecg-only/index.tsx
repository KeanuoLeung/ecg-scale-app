import React, { useContext, useEffect } from 'react';
import { IonPage, useIonViewDidLeave } from '@ionic/react';
import { EcgDeviceContext } from '../../tools/ecg-plugin';
import { useHistory } from 'react-router';
import ECGChart from '../../components/Chart';

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
  } = useContext(EcgDeviceContext);

  useIonViewDidLeave(() => {
    if (deviceState === 'online') {
      cancelMonitor();
    }
  });

  console.log('near raw datas', nearRawData);

  useEffect(() => {
    window.addEventListener('stop-monitor', () => {
      history.goBack();
    });
  }, []);

  return (
    <IonPage>
      <div className="list">
        <div className="list-title">
          <span>❤️ 心率变异性测试中...</span>
        </div>
        <div>
          <div
            style={{
              height: '100px',
              background: '#fff',
              borderRadius: 15,
              padding: 20,
              fontSize: '36px',
              border: '2px solid #000',
            }}
          >
            当前心率!：{bpm}
          </div>
        </div>
        <ECGChart />
      </div>
    </IonPage>
  );
}

export default EcgOnly;
