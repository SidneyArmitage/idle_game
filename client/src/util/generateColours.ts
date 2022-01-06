
export const interpolate = (steps: number, start: number = 255, end: number = 0) => {
  const distance = (end - start) / steps;
  return Array(steps).fill(0).map((_, cur) => start + (cur + 1) * distance);
};

// 0 is steps 1 is end
export const interpolateVia = (points: [number, number][], start: number = 0) => {
  return points.reduce((acc, cur, index) => [
    ...acc, 
    ...interpolate(cur[0], (points[index - 1] ?? [0, start])[1], cur[1])], [] as number[]);
};

export const interpolate3 = (steps: number, start: [number, number, number] = [0, 0, 0], end: [number, number, number] = [0, 0, 0]): [number, number, number][] => {
  const y = interpolate(steps, start[1], end[1]);
  const z = interpolate(steps, start[2], end[2]);
  return interpolate(steps, start[0], end[0]).map((x, index) => [x, y[index], z[index]] as [number, number, number]);
};

export const interpolateVia3 = (points: [number, [number, number, number]][], start: [number, number, number] = [0, 0, 0]): [number, number, number][] => {
  return points.reduce((acc, cur, index) => [
    ...acc, 
    ...interpolate3(cur[0], (points[index - 1] ?? [0, start])[1], cur[1]),
  ], [] as [number, number, number][]);
};