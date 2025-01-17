import Phaser from "phaser";
import House2CollisionBlocks from "../imports/house2CollisionBlocks";
import { frenchWords } from "../../../game_folder/assets/test.data";

class HouseScene3 extends Phaser.Scene {
    constructor() {
        super({ key: "House3" });
        this.leftWords = []; // Left words (English)
        this.rightWords = []; // Right words (Target language)
        this.matchedPairs = []; // Matched word pairs
    }

    preload() {
        this.load.image("house1", "assets/house1.png");
        this.load.spritesheet("guy", "assets/guy.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('chest', 'game_folder/assets/Chest_Anim.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image("exMark","game_folder/assets/Look_At_Me.png");
        this.load.image("collision", "assets/collision.png");
        this.load.audio("gerSong", "assets/gerSong.mp3");
        this.doorOpenSound = this.sound.add("doorOpen", { volume: 0.5 });
    }

    create() {
        // Stop BG Music in House
        const backgroundMusic = this.sound.get("backgroundMusic");
        if (backgroundMusic) {
            backgroundMusic.stop();
        }

        if (!this.sound.get("gerSong")) {
            this.backgroundMusic = this.sound.add("gerSong", {
              loop: true,
              volume: 0.2,
            });
            this.backgroundMusic.play();
          } else {
            const backgroundMusic = this.sound.get("gerSong");
            if (!backgroundMusic.isPlaying) {
              backgroundMusic.play();
            }
          }

        this.cursors = this.input.keyboard.createCursorKeys();

        // House image
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;
        const houseImage = this.add
            .image(gameWidth / 2, gameHeight / 2, "house1")
            .setOrigin(0.5, 0.5)
            .setScale(0.5);

        this.player = this.physics.add
            .sprite(350, 300, "guy")
            .setSize(18, 10)
            .setScale(3.5)
            .setOrigin(0, 0)
            .setOffset(6.5, 14);

        this.player.setCollideWorldBounds(true);

        // House collision and door data for HouseScene
        const house2CollisionBlocks = new House2CollisionBlocks(this);
        const house2CollisionGroup = house2CollisionBlocks.getHouse2Blocks();
        this.physics.add.collider(this.player, house2CollisionGroup);

        // Door Area for HouseScene
        this.doorArea = this.physics.add.staticGroup();
        const houseDoor = this.doorArea
            .create(613, 205, "collision")
            .setSize(10, 70);
        houseDoor.visible = false;

        this.physics.add.collider(
            this.player,
            this.doorArea,
            function (player, doorArea) {
                console.log("You are at the door!");
                this.doorOpenSound.play();
                this.scene.start("Main", { x: 1275, y: 715 });
            },
            null,
            this
        );

        // Chest and exclamation mark
        this.chestOpened = false;
        this.chest = this.physics.add.staticSprite(460, 360, 'chest')
            .setScale(4)
            .setOffset(0, -15)
            // .setAngle(180)
            .refreshBody();
        this.chest.body.setSize(40, 75, true);
        this.exMark = this.physics.add.staticSprite(460, 360, 'exMark')
            .setScale(0.06)
            .refreshBody();
        this.physics.add.collider(this.player, this.chest, this.openChest, null, this);

        this.anims.create({
            key: 'openChest',
            frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: 0,
        });

        // World bounds and camera
        this.physics.world.setBounds(0, 0, 725, 800);
        this.cameras.main.setBounds(0, 0, 800, 800);
    }

    openChest(player, chest) {
        if (!this.chestOpened) {
            this.chestOpened = true; // Set the flag to true
            chest.anims.play('openChest', true);
            console.log('Chest opened!');
            this.triggerWordMatching();
        }
    }

    triggerWordMatching() {
        console.log("Triggering word matching!");
        fetch("https://eurolingo.onrender.com/api/german", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("API Response:", data);
            // Generate 5 random word pairs
            const randomWords = this.getRandomWords(data, 5);
            // Split the words into left and right arrays
            const leftWordsData = randomWords.map((item) => ({
              text: item.englishWord,
              rank: item.rank,
            }));
            const rightWordsData = randomWords.map((item) => ({
              text: item.targetWord,
              rank: item.rank,
            }));
            // Shuffle the right words to mix them up
            Phaser.Utils.Array.Shuffle(rightWordsData);
            leftWordsData.forEach((leftItem, index) => {
              // Calculate starting position near the chest
              const startX = this.chest.x;
              const startY = this.chest.y - 20;
              // Left Side (English words)
              const leftText = this.add
                .text(startX, startY, leftItem.text, {
                  fontSize: "20px",
                  color: "#FFFFFF",
                })
                .setDepth(5)
                .setAlpha(0) // Start fully transparent
                .setInteractive(); // Enable interaction for the text
              this.input.setDraggable(leftText);
              leftText.wordName = leftItem.text; // Store the word's name
              leftText.rank = leftItem.rank; // Store the rank for matching
              this.leftWords.push(leftText); // Add to leftWords array
              // Right Side (Shuffled Target language words)
              const rightItem = rightWordsData[index];
              const rightText = this.add
                .text(startX, startY, rightItem.text, {
                  fontSize: "20px",
                  color: "#FFFFFF",
                })
                .setDepth(5)
                .setAlpha(0) // Start fully transparent
                .setInteractive(); // Enable interaction for the text
              this.input.setDraggable(rightText);
              rightText.wordName = rightItem.text; // Store the word's name
              rightText.rank = rightItem.rank; // Store the rank for matching
              this.rightWords.push(rightText); // Add to rightWords array
              // Animate the words to their respective sides
              const leftTargetX = 50; // Target X position for left words
              const rightTargetX = 850; // Target X position for right words
              const targetY = 50 + index * 70; // Calculate target Y position based on index
              // Animate left words
              this.tweens.add({
                targets: leftText,
                x: leftTargetX,
                y: targetY,
                alpha: 1, // Fade in
                duration: 1000,
                ease: "Power2",
              });
              // Animate right words
              this.tweens.add({
                targets: rightText,
                x: rightTargetX,
                y: targetY,
                alpha: 1, // Fade in
                duration: 1000,
                ease: "Power2",
              });
            });
            // Add drag events
            this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
              gameObject.x = dragX;
              gameObject.y = dragY;
              // Check for matches
              this.checkForMatches();
            });
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }

    getRandomWords(array, count) {
        // Shuffle the array
        const shuffled = Phaser.Utils.Array.Shuffle(array);
        // Return the first count elements
        return shuffled.slice(0, count);
    }

    checkForMatches() {
        this.leftWords.forEach((leftWord) => {
            this.rightWords.forEach((rightWord) => {
                const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
                    leftWord.getBounds(),
                    rightWord.getBounds()
                );

                // Match based on overlapping and the same rank
                if (overlap && leftWord.rank === rightWord.rank) {
                    const pairKey = `${leftWord.wordName}-${rightWord.wordName}`;

                    // Check if the pair has already been matched
                    if (!this.matchedPairs.includes(pairKey)) {
                        this.matchedPairs.push(pairKey); // Mark as matched

                        // Optionally, destroy the words
                        leftWord.destroy();
                        rightWord.destroy();

                        // Display "Well done" message
                        this.showWellDoneMessage();
                    }
                }
            });
        });
    }

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

export default HouseScene3;
