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
function getCirclePoints(amount, radius, [Cx, Cy] = [
    0,
    0
]) {
    return getEqualParts(amount).map((degree)=>[
            Math.round(getX(radius, getRadian(degree), Cx)),
            Math.round(getY(radius, getRadian(degree), Cy)), 
        ]
    );
}
const mod = function() {
    return {
        getCirclePoints: getCirclePoints
    };
}();
function mix(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}
const mod1 = function() {
    return {
        mix: mix
    };
}();
export { mod as circle };
export { mod1 as linearInterpolation };

