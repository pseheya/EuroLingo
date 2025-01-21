import Phaser from "phaser";
import HouseCollisionBlocks from "../imports/houseCollisionBlocks";

class HouseScene4 extends Phaser.Scene {
  constructor() {
    super({ key: "House4" });
    this.leftWords = []; // Left words (English)
    this.rightWords = []; // Right words (Target language)
    this.matchedPairs = [];
    this.rightWordData = [];
    this.leftWordData = [];
    this.isComplete = false;
    this.interaction = false;
    this.roundCount = 0;
    this.guideMessageDisplayed = false;
    this.countMatches = 0;
  }

  preload() {
    this.load.image("house2", "assets/house2.png");
    this.load.spritesheet("guy", "assets/guy.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("chest", "game_folder/assets/Chest_Anim.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("test", "game_folder/assets/Ukr_Congrats.png");
    this.load.image("exMark", "game_folder/assets/Look_At_Me.png");
    this.load.image("collision", "assets/collision.png");
    this.doorOpenSound = this.sound.add("doorOpen", { volume: 0.2 });
    this.load.image("EifelT", "game_folder/assets/Eifel_Tower.png");
    this.load.audio("ukrSong", "assets/ukrSong.mp3");
    this.load.image("guide", "game_folder/assets/Guide.png");
    this.load.image("journal", "game_folder/assets/Learn_Journal.png");
    this.load.image("back", "game_folder/assets/Back_BTN.png");
    this.load.image("speech", "game_folder/assets/Speech Bubble.png");
  }

  create() {
    this.welcomeFunction();
    // Stop BG Music in House

    const backgroundMusic = this.sound.get("backgroundMusic");
    if (backgroundMusic) {
      backgroundMusic.stop();
    }

    if (!this.sound.get("ukrSong")) {
      this.backgroundMusic = this.sound.add("ukrSong", {
        loop: true,
        volume: 0,
      });
      this.backgroundMusic.play();
    } else {
      const backgroundMusic = this.sound.get("ukrSong");
      if (!backgroundMusic.isPlaying) {
        backgroundMusic.play();
      }
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    // House image
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    const houseImage = this.add
      .image(gameWidth / 2, gameHeight / 2, "house2")
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

    this.player = this.physics.add
      .sprite(350, 300, "guy")
      .setSize(18, 10)
      .setScale(3.5)
      .setOrigin(0, 0)
      .setOffset(6.5, 14);

    this.guide = this.physics.add
      .staticImage(320, 290, "guide")
      .setDepth(2)
      .setScale(0.18)
      .setAlpha(0.9);

    this.guide.body.setSize(20, 20); // Set width and height of the collision box
    this.guide.body.setOffset(230, 170);

    this.player.setCollideWorldBounds(true);

    // House collision and door data for HouseScene
    const houseCollisionBlocks = new HouseCollisionBlocks(this);
    const houseCollisionGroup = houseCollisionBlocks.getHouseBlocks();
    this.physics.add.collider(this.player, houseCollisionGroup);

    // Door Area for HouseScene
    this.doorArea = this.physics.add.staticGroup();
    const houseDoor = this.doorArea
      .create(465, 170, "collision")
      .setSize(10, 70);
    houseDoor.visible = false;

    this.physics.add.collider(
      this.player,
      this.doorArea,
      function (player, doorArea) {
        console.log("You are at the door!");
        this.doorOpenSound.play();
        this.scene.start("Main", { x: 1185, y: 1135 });
        this.countMatches = 0;
      },
      null,
      this
    );

    this.Book_exMark = this.physics.add
      .staticSprite(308, 360, "exMark")
      .setScale(0.06)
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
      this.guide,
      this.guideInteraction,
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

    this.physics.world.setBounds(0, 0, 750, 800);
    this.cameras.main.setBounds(0, 0, 800, 800);
  }

  welcomeFunction() {
    console.log("Hello, welcome");

    if (this.reminder && this.speech) {
      this.reminder.destroy();
      this.speech.destroy();
    }

    if (this.roundCount > 4) {
      this.speech = this.add
        .image(420, 200, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(310, 154, `Hey!\nYou comleted this house!`, {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        })
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
        .image(420, 200, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(310, 154, `Hey !\nIt's one round left!`, {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        })
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
        .image(420, 200, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(310, 154, `Hey!\nWelcome to Ukraine!`, {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        })
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
        .image(420, 200, "speech")
        .setScale(0.15)
        .setDepth(9);
      this.reminder = this.add
        .text(310, 154, `Hey!\nWelcome back!`, {
          fontSize: "18px",
          color: "#ffffff",
          align: "center",
          padding: {
            x: 10,
            y: 5,
          },
        })
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
      console.log("we are in line 183");
      this.speech = this.add.image(420, 200, "speech").setScale(0.15);
      this.reminder = this.add.text(
        310,
        154,
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
      console.log("we are in line 183");
      this.speech = this.add.image(420, 200, "speech").setScale(0.15);
      this.reminder = this.add.text(
        310,
        154,
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
      console.log("box");
      this.speech = this.add.image(420, 200, "speech").setScale(0.15);
      this.reminder = this.add.text(
        310,
        154,
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
      this.speech = this.add.image(420, 200, "speech").setScale(0.15);
      this.reminder = this.add.text(
        310,
        154,
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

  lookAtJournal() {
    if (this.journalTriggered) return;

    this.journalTriggered = true;
    this.Chest_exMark = this.physics.add
      .staticSprite(540, 223, "exMark")
      .setScale(0.06)
      .setDepth(2)
      .refreshBody();
    this.chest = this.physics.add
      .staticSprite(540, 223, "chest")
      .setScale(4)
      .refreshBody();
    this.physics.add.collider(
      this.player,
      this.chest,
      this.openChest,
      null,
      this
    );
    this.journal_Block = this.physics.add
      .staticSprite(540, 223, "collision")
      .setScale(7)
      .setOffset(0, -15)
      .refreshBody();
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

  openChest(player, chest) {
    if (!this.chestOpened) {
      this.interaction = true;
      this.chestOpened = true; // Set the flag to true
      chest.anims.play("openChest", true);
      console.log("Chest opened!");
      this.triggerWordMatching(); // Start word matching after chest is opened
    }
  }

  // inspsectApi() {
  //   // Store references to text objects in arrays
  //   this.leftWords = [];
  //   this.rightWords = [];

  //   this.journalImage = this.add.image(500, 310, "journal").setDepth(3);
  //   this.journalImage.displayWidth = 1200;
  //   this.journalImage.displayHeight = 1050;

  //   fetch("https://eurolingo.onrender.com/api/ukrainian", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched data:", data); // Log the data to check its structure

  //       const randomWords = this.getRandomWords(data, 5);
  //       const leftWordsData = randomWords.map((item) => ({
  //         text: item.englishWord,
  //         rank: item.rank,
  //       }));
  //       const rightWordsData = randomWords.map((item) => ({
  //         text: item.targetWord,
  //         rank: item.rank,
  //       }));

  //       // Verify that the data is being assigned properly
  //       console.log("Left Words Data:", leftWordsData);
  //       console.log("Right Words Data:", rightWordsData);

  //       this.rightWordData = rightWordsData;
  //       this.leftWordData = leftWordsData;

  //       leftWordsData.forEach((leftItem, index) => {
  //         const leftText = this.add
  //           .text(170, 60 + index * 70, leftItem.text, {
  //             fontSize: "50px",
  //             color: "#8B0000",
  //           })
  //           .setDepth(3);
  //         leftText.rank = leftItem.rank;

  //         const rightText = this.add
  //           .text(590, 60 + index * 70, rightWordsData[index].text, {
  //             fontSize: "50px",
  //             color: "#000000",
  //           })
  //           .setDepth(3);
  //         rightText.rank = rightWordsData[index].rank;

  //         // Store the text objects in arrays
  //         this.leftWords.push(leftText);
  //         this.rightWords.push(rightText);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("API Error:", error);
  //     });

  //   this.back_btn = this.add
  //     .image(860, 565, "back")
  //     .setDepth(3)
  //     .setInteractive();

  //   // Add pointerdown event to the back button
  //   this.back_btn.on("pointerdown", () => {
  //     this.bookDestroy();
  //   });
  // }

  // bookDestroy() {
  //   if (this.back_btn) {
  //     this.back_btn.destroy();
  //   }
  //   if (this.journalImage) {
  //     this.journalImage.destroy();
  //   }
  //   if (this.leftWords) {
  //     this.leftWords.forEach((leftText) => {
  //       leftText.destroy();
  //     });

  //     if (this.rightWords) {
  //       this.rightWords.forEach((rightText) => {
  //         rightText.destroy();
  //       });
  //     }
  //   }
  // }

  fetchAndDisplayWords() {
    this.journalImage = this.add.image(500, 310, "journal").setDepth(3);
    this.journalImage.displayWidth = 1200;
    this.journalImage.displayHeight = 1050;
    fetch("https://eurolingo.onrender.com/api/ukrainian", {
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
    console.log(this.leftWords);
    console.log(this.rightWords);
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
    // this.journalTriggered = false;

    if (!this.Chest_exMark) {
      this.Chest_exMark = this.physics.add
        .staticSprite(540, 223, "exMark")
        .setScale(0.06)
        .setDepth(2)
        .refreshBody();
    }
  }

  triggerWordMatching() {
    if (this.interaction === true) {
      // Clear previous matched pairs
      this.matchedPairs = [];
      console.log("Left Word Data:", this.leftWordData);
      console.log("Right Word Data:", this.rightWordData);

      // Shuffle left and right word arrays for random order
      Phaser.Utils.Array.Shuffle(this.leftWordData);
      Phaser.Utils.Array.Shuffle(this.rightWordData);

      // Map the shuffled left and right word data to arrays of text
      this.leftWordData.forEach((leftWordData, index) => {
        const leftItem = leftWordData.text; // Get the text for the left word
        const rightWordData = this.rightWordData[index]; // Use the same index for right word data
        const rightItem = rightWordData.text; // Get the text for the right word

        console.log("Left Word:", leftItem); // Check what's being logged
        console.log("Right Word:", rightItem);

        const startX = this.chest.x;
        const startY = this.chest.y - 20;

        // Left Side (English words)
        const leftText = this.add
          .text(startX, startY, leftItem, {
            fontSize: "20px",
            color: "#FFFFFF",
          })
          .setDepth(5)
          .setAlpha(0)
          .setInteractive();
        this.input.setDraggable(leftText);

        // Assign rank and wordName properties correctly
        leftText.wordName = leftWordData.englishWord; // Set the English word
        leftText.rank = leftWordData.rank; // Set the rank for matching

        this.leftWords.push(leftText);

        // Right Side (Shuffled Target language words)
        const rightText = this.add
          .text(startX, startY, rightItem, {
            fontSize: "20px",
            color: "#FFFFFF",
          })
          .setDepth(5)
          .setAlpha(0)
          .setInteractive();
        this.input.setDraggable(rightText);

        // Assign rank and wordName properties correctly
        rightText.wordName = rightWordData.targetWord; // Set the target word
        rightText.rank = rightWordData.rank; // Set the same rank as the left item for matching

        this.rightWords.push(rightText);

        const leftTargetX = 50;
        const rightTargetX = 850;
        const targetY = 50 + index * 70;

        // Animate left words
        this.tweens.add({
          targets: leftText,
          x: leftTargetX,
          y: targetY,
          alpha: 1,
          duration: 1000,
          ease: "Power2",
        });

        // Animate right words
        this.tweens.add({
          targets: rightText,
          x: rightTargetX,
          y: targetY,
          alpha: 1,
          duration: 1000,
          ease: "Power2",
        });
      });

      // Add drag events for interaction
      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        // Check for matches as player drags words
        this.checkForMatches();
      });

      this.Chest_exMark.destroy();
    }
  }

  getRandomWords(array, count) {
    // Shuffle the array
    const shuffled = Phaser.Utils.Array.Shuffle(array);
    // Return the first count elements
    return shuffled.slice(0, count);
  }

  checkForMatches() {
    // Iterate through all left and right Phaser text objects
    this.leftWords.forEach((leftWord) => {
      this.rightWords.forEach((rightWord) => {
        // Log positions of left and right words
        console.log("Left Text:", leftWord.x, leftWord.y); // Log position of left word
        console.log("Right Text:", rightWord.x, rightWord.y); // Log position of right word

        // Get their bounds for overlap detection
        const leftBounds = leftWord.getBounds();
        const rightBounds = rightWord.getBounds();

        // Log bounds to help debug if they overlap correctly

        // Check for overlap
        const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
          leftBounds,
          rightBounds
        );
        console.log(leftWord.rank);

        if (overlap) {
          console.log("Overlap Detected!");

          // Check if ranks match
          if (leftWord.rank === rightWord.rank) {
            const pairKey = `${leftWord.text}-${rightWord.text}`;

            // Ensure the pair isn't already matched
            if (!this.matchedPairs.includes(pairKey)) {
              console.log("Matched Pair:", pairKey);
              this.matchedPairs.push(pairKey);
              this.countMatches++;
              // Destroy matched words
              leftWord.destroy();
              rightWord.destroy();

              // Remove matched objects from arrays
              Phaser.Utils.Array.Remove(this.leftWords, leftWord);
              Phaser.Utils.Array.Remove(this.rightWords, rightWord);

              this.showWellDoneMessage();
            }
          }
        }
      });
    });

    // Check if all pairs have been matched
    if (this.matchedPairs.length === this.leftWords.length) {
      this.roundComplete();
    }
  }

  // Check if all pairs for the current round are matche

  showWellDoneMessage() {
    const message = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Well done!", {
        fontSize: "40px",
        color: "#00ff00",
      })
      .setOrigin(0.5)
      .setDepth(10);

    // Fade out the message after 2 seconds
    this.tweens.add({
      targets: message,
      alpha: 0,
      duration: 2500,
      onComplete: () => {
        message.destroy();
      },
    });
  }

  // round complete function, triggered after this.matchedPairs.length === 5 i.e all words matched
  // new image
  roundComplete() {
    if (this.isComplete) {
      return; // Prevent triggering multiple times
    }

    this.isComplete = true; // Mark as complete
    console.log("Round Complete!");
    const message = "Well done!\nSee you soon!";
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

    // Display the round completion imag   // Reset round state for next round
    this.matchedPairs = [];
    this.leftWords = [];
    this.rightWords = [];
    this.roundCount++;
    this.isComplete = false;
    console.log(this.roundCount);
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

export default HouseScene4;
