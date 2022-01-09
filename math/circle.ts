function getRadian(degree: number): number {
  return (Math.PI * degree) / 180;
}

function getDegree(radian: number): number {
  return (radian * 180) / Math.PI;
}

function getX(r: number, radian: number, Cx = 0): number {
  return Cx + r * Math.cos(radian);
}

function getY(r: number, radian: number, Cy = 0): number {
  return Cy + r * Math.sin(radian);
}

function getEqualParts(amount: number): number[] {
  const range = 360 / amount;
  return Array.from(Array(amount), (e, i) => i * range);
}

/**
 * getCirclePoints(10, 100)
 */
export function getCirclePoints(
  amount: number,
  radius: number,
  [Cx, Cy] = [0, 0],
): [number, number][] {
  return getEqualParts(amount).map((degree) => [
    Math.round(getX(radius, getRadian(degree), Cx)),
    Math.round(getY(radius, getRadian(degree), Cy)),
  ]);
}
