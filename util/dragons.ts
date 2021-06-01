import { delay } from "./tools.js";

export class Dragon {
  fireDragons = [
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
  ];
  iceDragons = [
    "Ice",
    "Frost",
    "Crystal",
    "Glacier",
    "Iceberg",
    "Hailstone",
    "Haily",
    "Freeze",
  ];
  lightningDragons = ["Bolt", "Electron", "Sparky", "Volt", "Thunder"];
  all = [
    ...this.fireDragons,
    ...this.iceDragons,
    ...this.lightningDragons,
  ];

  getRandom() {
    return this.all[Math.floor(this.all.length * Math.random())];
  }

  getRandomDelayed() {
    return delay(this.getRandom(), 500);
  }
}
