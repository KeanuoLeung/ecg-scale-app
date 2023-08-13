import React, { useEffect, useState } from 'react';
import { IonPage, useIonViewDidEnter } from '@ionic/react';

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
import { UserInfo, login } from '../../api';
import localforage from 'localforage';
import { LoginMutation } from '../../__generated__/graphql';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useIonViewDidEnter(() => {
    if (!localStorage.getItem('endpoint')) {
      history.replace('/settings');
    }
  });

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
          onClick={async () => {
            console.log(username, password);
            const result = await login(username, password);
            localStorage.setItem('token', result?.accessToken);
            localforage.setItem('user', result);
            location.href = '/eva-list'
          }}
        >
          登录
        </div>
      </div>
    </IonPage>
  );
}

export default Login;
