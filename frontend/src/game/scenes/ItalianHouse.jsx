import HouseBase from "./MainHouse";

class ItalianHouse extends HouseBase {
  constructor() {
    super(
      "ItalianHouse",
      "italian",
      "Italy",
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
        chestExMarkX: 540,
        chestExMarkY: 223,
        chestX: 540,
        chestY: 223,
        mainX: 500,
        mainY: 685,
      }
    );
  }
}

export default ItalianHouse;
