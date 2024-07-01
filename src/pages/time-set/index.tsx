import React, { useState } from 'react';
import { IonPage, useIonViewDidLeave } from '@ionic/react';

import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

import './index.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Html5Qrcode } from 'html5-qrcode';
import base64ToFile from '../../tools/base64ToFile';
import { useHistory } from 'react-router';
import localforage from 'localforage';
import { UserInfo } from '../../api';

function TimeSet() {
  const [url, setUrl] = useState(localStorage.getItem('defaulttime') ?? '5');
  const history = useHistory();
  return (
    <IonPage>
      <div className="setting-content">
        <input
          className="url-input"
          placeholder="请输入时间"
          value={url}
          type="number"
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <div
          className="save-button"
          onClick={() => {
            if (Number(url) < 5) {
              alert('请设置不少于 5 分钟的时间');
              return;
            }
            localStorage.setItem('defaulttime', String(url));
            history.goBack();
          }}
        >
          保存设置
        </div>
      </div>
    </IonPage>
  );
}

export default TimeSet;
