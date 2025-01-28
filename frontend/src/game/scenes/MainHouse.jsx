import Phaser from "phaser";
import HouseCollisionBlocks from "../imports/houseCollisionBlocks";
import House2CollisionBlocks from "../imports/house2CollisionBlocks";

class HouseBase extends Phaser.Scene {
  constructor(
    key,
    language = "",
    country = "",
    musicFile = "",
    houseImage = "",
    position = {}
  ) {
    super({ key });

    this.player = null;
    this.country = country;
    this.backgroundMusic = null;
    this.houseImage = houseImage;
    this.musicFile = musicFile;
    this.language = language;
    this.position = position;

    this.leftWords = [];
    this.rightWords = [];
    this.matchedPairs = [];
    this.rightWordData = [];
    this.leftWOrdData = [];
    this.roundCount = 0;
    this.guideMessageDisplayed = false;
    this.countMatches = 0;
    this.barrierRemoved = false;
  }

  preload() {
    if (this.musicFile) {
      this.load.audio(this.key + this.language, this.musicFile);
    }

    this.load.spritesheet("guy", "assets/guy.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chest", "assets/Chest_Anim.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio("italy", "assets/italySong.mp3");
    this.load.audio("spain", "assets/spainSong.mp3");
    this.load.audio("gerSong", "assets/gerSong.mp3");
    this.load.audio("ukrSong", "assets/ukrSong.mp3");
    this.load.audio("frrSong", "assets/frrSong.mp3");

    this.load.image("house2", "assets/house2.png");
    this.load.image("house1", "assets/house1.png");
    this.load.image("exMark", "assets/Look_At_Me.png");
    this.load.image("collision", "assets/collision.png");
    this.load.image("rome", "assets/rome.png");
    this.doorOpenSound = this.sound.add("doorOpen", { volume: 0.2 });
    this.load.image("guide", "assets/Guide.png");
    this.load.image("journal", "assets/Learn_Journal.png");
    this.load.image("back", "assets/Back_BTN.png");
    this.load.image("speech", "assets/Speech Bubble.png");
  }

  create() {
    this.welcomeFunction();

    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    //set up an music block
    if (this.sound.get("backgroundMusic")) {
      this.sound.stopAll(); // Stops all sounds, including lingering background music
    }

    // Play the background music for this specific house
    if (this.musicFile) {
      this.backgroundMusic = this.sound.add(this.key + this.language, {
        loop: true,
        volume: 0.1,
      });
      this.backgroundMusic.play();
    }

    //set houseImage
    const houseImage = this.add
      .image(gameWidth / 2, gameHeight / 2, this.houseImage)
      .setOrigin(0.5, 0.5)
      .setScale(0.5);
    //create player
    this.player = this.physics.add
      .sprite(this.position.playerX || 350, this.position.playerY || 300, "guy")
      .setScale(3.5)
      .setSize(18, 10)
      .setOrigin(0, 0)
      .setOffset(6.5, 14);
    //guide area
    this.add
      .image(this.position.guideX, this.position.guideY, "guide")
      .setDepth(3)
      .setScale(0.18)
      .setAlpha(0.8);
    this.guideArea = this.physics.add.staticGroup();

    const guideCollision = this.guideArea
      .create(this.position.guideX, this.position.guideY, "collision")
      .setSize(50, 50);
    guideCollision.setAlpha(0);
    this.physics.add.collider(
      this.player,
      guideCollision,
      this.guideInteraction,
      null,
      this
    );

    //speach and reminder

    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    //house collision block

    if (this.houseImage === "house2") {
      const houseCollisionBlocks = new HouseCollisionBlocks(this);
      const houseCollisionGroup = houseCollisionBlocks.getHouseBlocks();
      this.physics.add.collider(this.player, houseCollisionGroup);

      this.doorArea = this.physics.add.staticGroup();
      const houseDoor = this.doorArea
        .create(470, 160, "collision")
        .setSize(30, 70);
      houseDoor.visible = false;
      this.physics.add.collider(
        this.player,
        this.doorArea,
        function (player, doorArea) {
          this.doorOpenSound.play();
          this.scene.start("Main", {
            x: this.position.mainX,
            y: this.position.mainY,
          });
          this.countMatches = 0;
        },

        null,
        this
      );
    }
    if (this.houseImage === "house1") {
      const house2CollisionBlocks = new House2CollisionBlocks(this);
      const house2CollisionGroup = house2CollisionBlocks.getHouse2Blocks();
      this.physics.add.collider(this.player, house2CollisionGroup);

      this.doorArea = this.physics.add.staticGroup();
      const houseDoor = this.doorArea
        .create(613, 205, "collision")
        .setSize(10, 70);
      houseDoor.visible = false;

      this.physics.add.collider(
        this.player,
        this.doorArea,
        function (player, doorArea) {
          this.doorOpenSound.play();
          this.scene.start("Main", {
            x: this.position.mainX,
            y: this.position.mainY,
          });
          this.countMatches = 0;
        },
        null,
        this
      );
    }

    //chest and books mark

    this.chestOpened = false;

    this.Book_exMark = this.physics.add
      .staticSprite(
        this.position.boolExMarkX,
        this.position.bookExMarkY,
        "exMark"
      )
      .setScale(0.06)
      .refreshBody();
    this.physics.add.collider(
      this.player,
      this.Book_exMark,
      this.lookAtJournal,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.chest,
      this.openChest,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.Book_exMark,
      this.lookAtJournal,
      null,
      this
    );
    this.journalTriggered = false;

    this.anims.create({
      key: "openChest",
      frames: this.anims.generateFrameNumbers("chest", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: 0,
    });

    this.physics.world.setBounds(0, 0, 725, 800);
    this.cameras.main.setBounds(0, 0, 800, 800);
  }

  //welcome function and count
  welcomeFunction() {
    if (this.reminder && this.speech) {
      this.reminder.destroy();
      this.speech.destroy();
    }

    if (this.roundCount > 4) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(
          this.position.reminderX,
          this.position.reminderY,
          `Hey!\nYou comleted this house!`,
          {
            fontSize: "18px",
            color: "#ffffff",
            align: "center",
            padding: {
              x: 10,
              y: 5,
            },
          }
        )
        .setDepth(10);
      this.time.delayedCall(3000, () => {
        if (this.reminder && this.speech) {
          this.reminder.destroy();
          this.speech.destroy();
          this.reminder = null;
        }
      });
    }

    if (this.roundCount === 4) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(
          this.position.reminderX,
          this.position.reminderY,
          `Hey !\nIt's one round left!`,
          {
            fontSize: "18px",
            color: "#ffffff",
            align: "center",
            padding: {
              x: 10,
              y: 5,
            },
          }
        )
        .setDepth(10);
      this.time.delayedCall(3000, () => {
        if (this.reminder && this.speech) {
          this.reminder.destroy();
          this.speech.destroy();
          this.reminder = null;
        }
      });
    } else if (this.roundCount === 0) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(
          this.position.reminderX,
          this.position.reminderY,
          `Hey!\nWelcome to ${this.country}!`,
          {
            fontSize: "18px",
            color: "#ffffff",
            align: "center",
            padding: {
              x: 10,
              y: 5,
            },
          }
        )
        .setDepth(10);

      this.time.delayedCall(3000, () => {
        if (this.reminder && this.speech) {
          this.reminder.destroy();
          this.speech.destroy();
          this.reminder = null;
        }
      });
    } else if (this.roundCount < 4) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(
          this.position.reminderX,
          this.position.reminderY,
          `Hey!\nWelcome back!`,
          {
            fontSize: "18px",
            color: "#ffffff",
            align: "center",
            padding: {
              x: 10,
              y: 5,
            },
          }
        )
        .setDepth(10);

      this.time.delayedCall(3000, () => {
        if (this.reminder && this.speech) {
          this.reminder.destroy();
          this.speech.destroy();
          this.reminder = null;
        }
      });
    }
  }

  guideInteraction() {
    const username = this.game.registry.get("username");
    if (this.reminder && this.speech) {
      this.reminder.destroy();
      this.speech.destroy();
    }

    if (this.countMatches < 5 && this.chestOpened === true) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15);
      this.reminder = this.add.text(
        this.position.reminderX,
        this.position.reminderY,
        `Hey ${username}!\nYou need to match\na words!`,
        {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        }
      );
      this.time.delayedCall(3000, () => {
        if (this.reminder && this.speech) {
          this.reminder.destroy();
          this.speech.destroy();
          this.reminder = null;
        }
      });
    }

    if (
      this.chestOpened === true &&
      this.journalTriggered === true &&
      this.leftWords.length === 0
    ) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15);
      this.reminder = this.add.text(
        this.position.reminderX,
        this.position.reminderY,
        `Hey ${username}!\nTry different houses\nbefore next round!`,
        {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        }
      );
      return;
    }

    if (this.journalTriggered === true && this.chestOpened === false) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15);
      this.reminder = this.add.text(
        this.position.reminderX,
        this.position.reminderY,
        `Hey ${username}!\nI think you should\nlook in the box!`,
        {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        }
      );
      this.time.delayedCall(3000, () => {
        if (this.reminder && this.speech) {
          this.reminder.destroy();
          this.speech.destroy();
          this.reminder = null;
        }
      });
    }

    if (this.journalTriggered === false) {
      this.speech = this.add
        .image(this.position.speachX, this.position.speachY, "speech")
        .setScale(0.15);
      this.reminder = this.add.text(
        this.position.reminderX,
        this.position.reminderY,
        `Hey ${username}!\nI think you should\nlook in the book!`,
        {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        }
      );

      this.time.delayedCall(3000, () => {
        if (this.reminder && this.speech) {
          this.reminder.destroy();
          this.speech.destroy();
          this.reminder = null;
        }
      });
    }
  }

  guideZone() {
    this.guideMessageDisplayed = false;
    this.showGuideMessage();
  }

  lookAtJournal() {
    if (this.journalTriggered) return;

    this.journalTriggered = true;

    this.journal_Block = this.physics.add
      .staticSprite(this.position.chestX, this.position.chestY, "collision")
      .setScale(9)
      .setOffset(0, -15)
      .refreshBody();
    this.Chest_exMark = this.physics.add
      .staticSprite(
        this.position.chestExMarkX,
        this.position.chestExMarkY,
        "exMark"
      )
      .setScale(0.06)
      .setDepth(2)
      .refreshBody();

    this.chest = this.physics.add
      .staticSprite(this.position.chestX, this.position.chestY, "chest")
      .setScale(4)
      .setOffset(0, -15)
      .refreshBody();
    this.physics.add.collider(
      this.player,
      this.chest,
      this.openChest,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.journal_Block,
      this.createBackButton,
      null,
      this
    );
    this.interaction = true;
    this.chestOpened = false;
    this.fetchAndDisplayWords();
    this.Book_exMark.destroy();
  }

  fetchAndDisplayWords() {
    this.journalImage = this.add.image(500, 310, "journal").setDepth(3);
    this.journalImage.displayWidth = 1200;
    this.journalImage.displayHeight = 1050;
    fetch(`https://eurolingo.onrender.com/api/${this.language}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const randomWords = this.getRandomWords(data, 5);
        this.displayWords(randomWords);
      })
      .catch((error) => console.error("API Error:", error));
  }

  displayWords(data) {
    const leftWordsData = data.map((item) => ({
      text: item.englishWord,
      rank: item.rank,
    }));
    const rightWordsData = data.map((item) => ({
      text: item.targetWord,
      rank: item.rank,
    }));

    this.leftWordData = leftWordsData;
    this.rightWordData = rightWordsData;

    leftWordsData.forEach((leftItem, index) => {
      this.createLeftText(
        leftItem.text,
        170,
        60 + index * 70,
        leftItem.rank,
        "#8B0000",
        this.leftWords
      );
      this.createRightText(
        rightWordsData[index].text,
        590,
        60 + index * 70,
        rightWordsData[index].rank,
        "#000000",
        this.rightWords
      );
    });

    this.createBackButton();
  }

  createLeftText(text, x, y, rank, color) {
    const word = this.add
      .text(x, y, text, { fontSize: "50px", color })
      .setDepth(3);
    word.rank = rank;
    this.leftWords.push(word);
  }
  createRightText(text, x, y, rank, color) {
    const word = this.add
      .text(x, y, text, { fontSize: "50px", color })
      .setDepth(3);
    word.rank = rank;
    this.rightWords.push(word);
  }

  createBackButton() {
    this.back_btn = this.add
      .image(860, 565, "back")
      .setDepth(3)
      .setInteractive();
    this.back_btn.on("pointerdown", () => {
      this.cleanJournal();
      this.journal_Block.destroy();
      this.barrier.destroy();
      this.barrierRemoved = true;
    });
  }

  cleanJournal() {
    [
      this.back_btn,
      this.journalImage,
      ...this.leftWords,
      ...this.rightWords,
    ].forEach((item) => item?.destroy());

    this.interaction = false;

    if (!this.Chest_exMark) {
      this.Chest_exMark = this.physics.add
        .staticSprite(540, 223, "exMark")
        .setScale(0.06)
        .setDepth(2)
        .refreshBody();
    }
  }

  openChest(player, chest) {
    if (!this.chestOpened) {
      this.interaction = true;
      this.chestOpened = true;
      chest.anims.play("openChest", true);
      this.triggerWordMatching();
    }
  }

  triggerWordMatching() {
    if (this.interaction === true) {
      this.matchedPairs = [];
      Phaser.Utils.Array.Shuffle(this.leftWordData);
      Phaser.Utils.Array.Shuffle(this.rightWordData);
      this.leftWordData.forEach((leftWordData, index) => {
        const leftItem = leftWordData.text;
        const rightWordData = this.rightWordData[index];
        const rightItem = rightWordData.text;

        const startX = this.chest.x;
        const startY = this.chest.y - 20;

        const leftText = this.add
          .text(startX, startY, leftItem, {
            fontSize: "20px",
            color: "#FFFFFF",
          })
          .setDepth(5)
          .setAlpha(0)
          .setInteractive();
        this.input.setDraggable(leftText);

        leftText.wordName = leftWordData.englishWord;
        leftText.rank = leftWordData.rank;

        this.leftWords.push(leftText);

        const rightText = this.add
          .text(startX, startY, rightItem, {
            fontSize: "20px",
            color: "#FFFFFF",
          })
          .setDepth(5)
          .setAlpha(0)
          .setInteractive();
        this.input.setDraggable(rightText);

        rightText.wordName = rightWordData.targetWord;
        rightText.rank = rightWordData.rank;

        this.rightWords.push(rightText);

        const leftTargetX = 50;
        const rightTargetX = 850;
        const targetY = 50 + index * 70;

        this.tweens.add({
          targets: leftText,
          x: leftTargetX,
          y: targetY,
          alpha: 1,
          duration: 1000,
          ease: "Power2",
        });

        this.tweens.add({
          targets: rightText,
          x: rightTargetX,
          y: targetY,
          alpha: 1,
          duration: 1000,
          ease: "Power2",
        });
      });

      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        this.checkForMatches();
      });

      this.Chest_exMark.destroy();
    }
  }

  checkForMatches() {
    const chestBounds = this.chest.getBounds();

    this.leftWords.forEach((leftWord) => {
      this.rightWords.forEach((rightWord) => {
        const leftBounds = leftWord.getBounds();
        const rightBounds = rightWord.getBounds();

        const leftOverlapChest = Phaser.Geom.Intersects.RectangleToRectangle(
          leftBounds,
          chestBounds
        );
        const rightOverlapChest = Phaser.Geom.Intersects.RectangleToRectangle(
          rightBounds,
          chestBounds
        );

        if (leftOverlapChest && rightOverlapChest) {
          if (leftWord.rank === rightWord.rank) {
            const pairKey = `${leftWord.text}-${rightWord.text}`;

            if (!this.matchedPairs.includes(pairKey)) {
              this.matchedPairs.push(pairKey);
              this.countMatches++;

              leftWord.destroy();
              rightWord.destroy();

              Phaser.Utils.Array.Remove(this.leftWords, leftWord);
              Phaser.Utils.Array.Remove(this.rightWords, rightWord);

              this.showWellDoneMessage();
            }
          }
        }
      });
    });

    if (this.matchedPairs.length === this.leftWords.length) {
      this.roundComplete();
    }
  }

  getRandomWords(array, count) {
    const shuffled = Phaser.Utils.Array.Shuffle(array);

    return shuffled.slice(0, count);
  }

  showWellDoneMessage() {
    const message = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Well done!", {
        fontSize: "40px",
        color: "#00ff00",
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.tweens.add({
      targets: message,
      alpha: 0,
      duration: 2500,
      onComplete: () => {
        message.destroy();
      },
    });
  }

  roundComplete() {
    const username = this.game.registry.get("username");
    if (this.isComplete) {
      return;
    }
    this.roundCount++;
    this.isComplete = true;
    const message = `Well done ${username}!\nSee you soon!`;
    this.speech = this.add.image(420, 200, "speech").setScale(0.15);

    this.reminder = this.add.text(310, 154, message, {
      fontSize: "18px",
      color: "#ffffff",
      align: "center",
      padding: {
        x: 10,
        y: 5,
      },
    });
    this.time.delayedCall(3000, () => {
      if (this.reminder && this.speech) {
        this.reminder.destroy();
        this.speech.destroy();
        this.reminder = null;
      }
    });

    if (this.roundCount === 5) {
      fetch(`https://eurolingo.onrender.com/api/users/${username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "spanish",
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
    }

    this.matchedPairs = [];
    this.leftWords = [];
    this.rightWords = [];

    this.isComplete = false;
  }

  update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("right", true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
      this.player.setFlipX(false);
    }

    if (this.player.body.velocity.x === 0) {
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
        this.player.anims.play("up", true);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
        this.player.anims.play("down", true);
      }
    }

    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0
    ) {
      this.player.anims.play("guyidle", true);
    }
  }
}

export default HouseBase;
