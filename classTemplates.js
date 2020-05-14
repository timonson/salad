class Dragon {
  constructor() {
    this.fireDragons = [
      "Blaze",
      "Heat",
      "Inferno",
      "Nova",
      "Ember",
      "Flare",
      "Pyro",
      "Lumi",
      "Scorch",
      "Burnie",
      "Tinder",
      "Igny",
    ]
    this.iceDragons = [
      "Ice",
      "Frost",
      "Crystal",
      "Glacier",
      "Iceberg",
      "Hailstone",
      "Haily",
      "Freeze",
    ]
    this.lightningDragons = ["Bolt", "Electron", "Sparky", "Volt", "Thunder"]
    this.all = [
      ...this.fireDragons,
      ...this.iceDragons,
      ...this.lightningDragons,
    ]
  }
  getRandom() {
    return this.all[Math.floor(this.all.length * Math.random())]
  }
}

export { Dragon }
