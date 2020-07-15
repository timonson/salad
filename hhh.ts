function foo({
  name,
  newValue,
  isRendering = true,
}: {
  name?: string
  newValue?: string | null
  isRendering?: boolean
} = {}) {
  console.log(name, newValue, isRendering)
}
foo({ name: "huhu" })
foo()
