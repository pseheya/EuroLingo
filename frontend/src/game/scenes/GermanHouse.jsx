import HouseBase from "./MainHouse";

class GermanHouse extends HouseBase {
  constructor() {
    super("GermanHouse", "german", "Germany", "assets/gerSong.mp3", "house1", {
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
      jornalBlocX: 460,
      journalBlockY: 450,
      chestExMarkX: 460,
      chestExMarkY: 450,
      chestX: 460,
      chestY: 450,
      mainX: 1275,
      mainY: 700,
    });
  }
}

export default GermanHouse;
