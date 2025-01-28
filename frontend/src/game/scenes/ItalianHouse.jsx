import HouseBase from "./MainHouse";

class ItalianHouse extends HouseBase {
  constructor() {
    super(
      "ItalianHouse",
      "italian",
      "Italy",
      0,
      0,
      "assets/italySong.mp3",
      "house2",
      {
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
        jornalBlocX: 540,
        journalBlockY: 223,
        chestExMarkX: 540,
        chestExMarkY: 223,
        chestX: 540,
        chestY: 223,
      }
    );
  }

  preload() {
    super.preload();
  }
  create() {
    super.create();
  }
}

export default ItalianHouse;
