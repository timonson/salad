function getRadian(degree) {
    return Math.PI * degree / 180;
}
function getX(r, radian, Cx = 0) {
    return Cx + r * Math.cos(radian);
}
function getY(r, radian, Cy = 0) {
    return Cy + r * Math.sin(radian);
}
function getEqualParts(amount) {
    const range = 360 / amount;
    return Array.from(Array(amount), (e, i)=>i * range
    );
}
function getCirclePoints1(amount, radius, [Cx, Cy] = [
    0,
    0
]) {
    return getEqualParts(amount).map((degree)=>[
            Math.round(getX(radius, getRadian(degree), Cx)),
            Math.round(getY(radius, getRadian(degree), Cy)), 
        ]
    );
}
export { getCirclePoints1 as getCirclePoints };
function mix1(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}
export { mix1 as mix };
function carryRatio1(value, biggestValue, actualLength) {
    return value / biggestValue * actualLength;
}
export { carryRatio1 as carryRatio };

