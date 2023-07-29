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

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  return (
    <IonPage>
      <div className="setting-content">
        <div id="reader" style={{ width: 600, display: 'none' }}></div>
        <input
          className="url-input"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          className="url-input"
          placeholder="密码"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <div
          className="save-button"
          style={{ marginTop: 40 }}
          //  onClick={() => {}}
        >
          登录
        </div>
      </div>
    </IonPage>
  );
}

export default Login;