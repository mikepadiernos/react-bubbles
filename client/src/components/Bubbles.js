import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";

//IMPORT CONTEXTS
// import BubbleContext from "../contexts/BubbleContext";

const Bubbles = ({ colors }) => {

  const [bubbleData, setBubbleData] = useState([]);

  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      {/*<h2>bubbles</h2>*/}
      <Svg
        width={850}
        height={750}
      >
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[850, 750]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
