import HouseBase from "./MainHouse";

class FrenchHouse extends HouseBase {
  constructor() {
    super("FrenchHouse", "french", "France", "assets/frrSong.mp3", "house2", {
      playerX: 350,
      playerY: 300,
      guideX: 320,
      guideY: 290,
      boolExMarkX: 320,
      bookExMarkY: 370,
      speachX: 420,
      speachY: 200,
      reminderX: 310,
      reminderY: 154,
      chestExMarkX: 540,
      chestExMarkY: 223,
      chestX: 540,
      chestY: 223,
      mainX: 500,
      mainY: 1300,
    });
  }
}

export default FrenchHouse;
