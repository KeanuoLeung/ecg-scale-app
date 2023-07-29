import { useEffect, useState } from 'react';
import { ScaleEvaluation } from '../__generated__/graphql';
import localforage from 'localforage';
import { getList, getScaleDetail } from '.';

function useEvaList() {
  const [evaList, setEvaList] = useState<Partial<ScaleEvaluation>[]>([]);

  useEffect(() => {
    async function run() {
      const items =
        (await localforage.getItem<Partial<ScaleEvaluation>[]>('evaList')) ??
        [];
      setEvaList(items);
      const result = await getList(3);
      setEvaList(result);
      localforage.setItem('evaList', result);
      for (const eva of result) {
        const uuid = eva.uuid;
        if (uuid) {
          const detail = await getScaleDetail(uuid);
          localforage.setItem(`scale-${uuid}`, detail);
        }
      }
    }

    run();
  }, []);

  return evaList;
}

export default useEvaList;
