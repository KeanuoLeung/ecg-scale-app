import React, { useContext, useEffect, useState } from 'react';
import localforage from 'localforage';

import './index.css';
import { useHistory } from 'react-router';
import {
  IonActionSheet,
  IonLoading,
  IonPage,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from '@ionic/react';
import { db } from '../../db';
import { EcgDeviceContext } from '../../tools/ecg-plugin';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import base64ToFile from '../../tools/base64ToFile';
import {
  UserInfo,
  getList,
  saveHrvReport,
  saveOriginalCsv,
  saveReport,
} from '../../api';
import useEvaList from '../../api/useEvaList';
import { ReleaseType } from '../../constants/type';

type Evaluation = {
  scaleName: string;
  uuid: string;
  createdAt: string;
  isTest: boolean;
  releaseType: number;
  effectiveStartTime: string;
  effectiveEndTime: string;
  isEnable: boolean;
};

function SyncList() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [list, setList] = useState<any[]>([]);
  const [evaluations, setEvalutions] = useState<Evaluation[]>([]);
  const [evalist, refresh] = useEvaList();
  console.log(list);
  useEffect(() => {
    async function run() {
      const reports = await db.reports.toArray();

      setList(reports);
    }

    run();
  }, []);

  console.log('evalist', evalist);

  return (
    <IonPage style={{ overflow: 'scroll' }}>
      <div className="list">
        <div className="list-title">
          <span>同步状态</span>
        </div>
        {list.map((record) => (
          <div className={`list-card`} key={record.uuid}>
            <div>
              {
                evalist.find((item) => item.uuid === record.scaleUUId)
                  ?.scaleName
              }
            </div>
            <div>{record.synced ? '已同步' : '未同步'}</div>
            <div>提交时间: {new Date(record.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </IonPage>
  );
}

export default SyncList;
