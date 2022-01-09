import { interpolate } from "../../util/generateColours";

interface IProps {
  dataPoints: number[];
  colours?: number[];
  gap?: number;
}

export default ({ dataPoints, gap = 0, colours = interpolate(dataPoints.length) }: IProps) => {
  const scale = (100 / (dataPoints.reduce((acc, cur) => acc + cur + gap, 0) - gap)) ?? 0;
  let current = 0;
  return (
    <svg viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
      {dataPoints.map((point, index) => {
        const out = <rect key={index} x={current} y={0} width={point * scale} height={10} fill={`#${colours[index % colours.length].toString(16).padStart(6, "0")}`}/>;
        current += point * scale + gap;
        return out;
      })}
    </svg>
  );
};
