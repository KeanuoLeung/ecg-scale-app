import React from 'react';

function Bg() {
  const WIDTH = window.innerWidth - 40;
  const HEIGHT = 650;
  const SIZE = 10;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={WIDTH} height={HEIGHT}>
        {Array.from({ length: Math.floor(HEIGHT / SIZE) }).map((_, row) => {
          return Array.from({ length: Math.floor(WIDTH / SIZE) }).map(
            (_, col) => (
              <rect
                key={`${row}_${col}`}
                x={col * SIZE}
                y={row * SIZE}
                width={SIZE}
                height={SIZE}
                stroke="#f84c4c"
                fill="#fff"
                strokeWidth={1}
              />
            )
          );
        })}
      </svg>
    </>
  );
}

export default Bg;
