import { useEffect, useState } from 'react';
import { ScaleEvaluation } from '../__generated__/graphql';
import localforage from 'localforage';
import { UserInfo, getList, getScaleDetail } from '.';
import { useHistory } from 'react-router';

function useEvaList(): [list: Partial<ScaleEvaluation>[], refresh: () => void] {
  const history = useHistory();
  const [evaList, setEvaList] = useState<Partial<ScaleEvaluation>[]>([]);
  async function run() {
    const items =
      (await localforage.getItem<Partial<ScaleEvaluation>[]>('evaList')) ?? [];
    setEvaList(items);
    const r = await localforage.getItem<UserInfo>('user');
    if (!r?.user?.id && location.href !== '/settings') {
      history.push('/login');
      return;
    }
    const result = await getList(Number(r?.user?.id));
    console.log('this is list', result);
    setEvaList(result);
    localforage.setItem('evaList', result);
    for (const eva of result) {
      const uuid = eva.uuid;
      if (uuid) {
        const detail = await getScaleDetail(uuid);
        localforage.setItem(`scale-${eva.test_uuid}`, detail);
      }
    }
  }
  useEffect(() => {
    run();
  }, []);

  return [evaList, run];
}

export default useEvaList;
