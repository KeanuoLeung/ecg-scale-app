import React, { useState } from 'react';
import { IonPage } from '@ionic/react';

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

function Settings() {
  const [url, setUrl] = useState(localStorage.getItem('endpoint') ?? '');
  const history = useHistory();
  const scanSingleBarcode: () => Promise<{
    displayValue: string;
  }> = async () => {
    return new Promise((resolve) => {
      document.querySelector('body')?.classList.add('barcode-scanner-active');

      const listener = BarcodeScanner.addListener(
        'barcodeScanned',
        async (result) => {
          await listener.remove();
          document
            .querySelector('body')
            ?.classList.remove('barcode-scanner-active');
          await BarcodeScanner.stopScan();
          resolve(result.barcode);
        }
      );

      BarcodeScanner.startScan();
    });
  };
  return (
    <IonPage>
      <div className="setting-content">
        <div id="reader" style={{ width: 600, display: 'none' }}></div>
        <input
          className="url-input"
          placeholder="请输入服务器地址"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <div
          className="scan-button"
          onClick={async () => {
            const url = await scanSingleBarcode();
            setUrl(url.displayValue);
          }}
        >
          扫描二维码
        </div>
        <div
          className="save-button"
          onClick={() => {
            alert(url);
            localStorage.setItem('endpoint', url);
            const target = localStorage.getItem('userId');
            if (!target) {
              history.replace('/login');
            } else {
              history.replace('/eva-list');
            }
          }}
        >
          保存设置
        </div>
      </div>
    </IonPage>
  );
}

export default Settings;
