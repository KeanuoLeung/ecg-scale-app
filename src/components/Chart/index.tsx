import React, { useEffect, useRef, useState } from 'react';
import { EcgRawData } from '../../tools/ecg-plugin';

const ECGChart = () => {
  const [data, setData] = useState<EcgRawData[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stoped = false;
    let frame = 0;
    let prevStamp = 0;
    function animate() {
      requestAnimationFrame(() => {
        if ((window as any).ecgRawDatas && (window as any).ecgRawDatas.length) {
          const d = (window as any).ecgRawDatas.slice(
            Math.max(0, (window as any).ecgRawDatas.length - 50),
            (window as any).ecgRawDatas.length
          );
          console.log('latest timestamp', d[d.length - 1].time);
          d[d.length - 1].data = d[d.length - 1].data.slice(
            0,
            Math.floor(frame / 2)
          );

          if (frame < 20) {
            frame++;
          }
          if (d[d.length - 1].time !== prevStamp) {
            frame = 0;
          }

          console.log('run run!~', frame, Math.floor(frame / 2));
          const data: EcgRawData[] = d;
          prevStamp = d[d.length - 1].time;

          const canvas = canvasRef.current;
          if (!canvas) {
            return;
          }
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            return;
          }

          // 设置画布尺寸
          canvas.width = 1000;
          canvas.height = 500;

          // 解析数据
          const points = data.map((row) => {
            const { time, isLost, data } = row;
            return { time, isLost, data: data.map(Number) };
          });

          // 绘制心电图曲线
          let x = 0;
          let y = canvas.height / 2;

          ctx.beginPath();
          ctx.moveTo(x, y);

          points.forEach((row) => {
            row.data.forEach((value) => {
              x += 1;
              y = canvas.height / 2 - value;

              ctx.lineTo(x, y);
            });
          });

          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        if (stoped) {
          return;
        }
        animate();
      });
    }
    animate();

    return () => {
      stoped = true;
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default ECGChart;
