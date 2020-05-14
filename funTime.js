// A specific date:
// setExpiration(new Date("2020-07-01"))
// One hour from now:
// setExpiration(new Date().getTime() + 60 * 60 * 1000)
function setExpiration(exp) {
  return (exp instanceof Date ? exp : new Date(exp)).getTime()
}

function isExpired(myExp) {
  return new Date(myExp) < new Date()
}

export { setExpiration, isExpired }
