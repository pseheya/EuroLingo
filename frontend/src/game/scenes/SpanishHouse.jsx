import HouseBase from "./MainHouse";

class SpanishHouse extends HouseBase {
  constructor() {
    super(
      "SpanishHouse",
      "spanish",
      "Spain",
      "assets/spainSong.mp3",
      "house1",
      {
        playerX: 350,
        playerY: 300,
        guideX: 310,
        guideY: 380,
        boolExMarkX: 420,
        bookExMarkY: 280,
        speachX: 420,
        speachY: 300,
        reminderX: 310,
        reminderY: 254,
        chestExMarkX: 460,
        chestExMarkY: 450,
        chestX: 460,
        chestY: 450,
        mainX: 1100,
        mainY: 375,
      }
    );
  }
}

export default SpanishHouse;
