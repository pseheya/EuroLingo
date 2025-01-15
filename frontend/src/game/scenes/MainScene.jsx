import Phaser from "phaser";
import CollisionBlocks from "../imports/collisionBlocks";

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "Main" });
    }
    init(data) {
        // Defaults guy start position to 900/800 unless switching scene
        this.startX = data && data.x ? data.x : 300; // Default to 900 if no position passed
        this.startY = data && data.y ? data.y : 900; // Default to 800 if no position passed
    }

    preload() {
        this.load.spritesheet("background", "assets/background.png", {
            frameWidth: 630,
            frameHeight: 500,
        });
        this.load.spritesheet("guy", "assets/Guy.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image("collision", "assets/collision.png");
        this.load.image("roof1", "assets/rooftop.png");
        this.load.image("roof2", "assets/Rooftop2.1.png");
        this.load.audio("backgroundMusic", "assets/backgroundMusic.mp3"); // Background music
        this.load.image("barn", "assets/BarnHouse.png");
        this.load.image("w_well", "assets/WishingWell.png");
        this.load.image("door", "assets/door.png");
        this.load.audio("doorOpen", "assets/doorOpen.mp3");
        this.load.image("bench", "assets/Bench.png");
        this.load.image("M_house", "assets/MainHouse.png");
        this.load.image("BR_House", "assets/BR_House.png");
        this.load.image("y_house", "assets/y_house.png");
        this.load.image("Hut", "assets/Hut.png");
        this.load.image("Pole", "assets/Pole.png");
        this.load.image("fountain", "assets/FountainSpout.png"); // Door sound
    }

    create() {
        // Character animations/frames

        this.anims.create({
            key: "guyidle",
            frames: this.anims.generateFrameNumbers("guy", {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
        });

        this.anims.create({
            key: "background",
            frames: this.anims.generateFrameNumbers("background", {
                start: 0,
                end: 79,
            }),
            frameRate: 8,
            repeat: -1, // Loops through indefinitely
        });

        const background = this.add
            .sprite(0, 0, "background")
            .setOrigin(0, 0)
            .setScale(3.2); // How zoomed in the map is

        background.play("background");

        this.roof = this.add
            .image(1251, 432, "roof1")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.5);

        this.roof = this.add
            .image(1098, 65, "y_house")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.69);

        this.roof1 = this.add
            .image(334, 943, "roof2")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.59);

        this.pole = this.add
            .image(550, 841, "Pole")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.59);

        this.roof1 = this.add
            .image(435, 378, "M_house")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.65);

        this.door = this.add
            .image(1165, 1060, "door")
            .setOrigin(0, 0)
            .setScale(1.57);

        this.barn = this.add
            .image(60, 628, "barn")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.59);
        this.well = this.add
            .image(1120, 535, "w_well")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.59);

        this.fountain = this.add
            .image(945, 820, "fountain")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.59);

        this.bench = this.add
            .image(1163, 749, "bench")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.65);

        this.BR_House = this.add
            .image(1152, 833, "BR_House")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.65);

        this.Hut = this.add
            .image(1635, 815, "Hut")
            .setOrigin(0, 0)
            .setDepth(10)
            .setScale(0.65);

        this.player = this.physics.add
            .sprite(this.startX, this.startY, "guy")
            .setSize(18, 10)
            .setScale(2.5) // Size of character
            .setOrigin(0, 0) // Do not change
            .setOffset(6.5, 14); // Do not change

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("guy", {
                start: 24,
                end: 29,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("guy", {
                start: 24,
                end: 29,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "up",
            frames: this.anims.generateFrameNumbers("guy", {
                start: 30,
                end: 35,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "down",
            frames: this.anims.generateFrameNumbers("guy", {
                start: 18,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Collision and door data for MainScene
        const collisionBlocks = new CollisionBlocks(this);
        const collisionGroup = collisionBlocks.getBlocks();
        this.physics.add.collider(this.player, collisionGroup);

        // Door Area for MainScene
        this.doorArea = this.physics.add.staticGroup();
        const door1 = this.doorArea
            .create(495, 665, "collision")
            .setSize(40, 60)
            .setOrigin(1, 1); // House door TL
        door1.visible = false;
        door1.setData("targetScene", "House1");

        const door2 = this.doorArea
            .create(1161, 355, "collision")
            .setSize(40, 60)
            .setOrigin(1, 1); // House door TR
        door2.visible = false;
        door2.setData("targetScene", "House2");

        const door3 = this.doorArea
            .create(1315, 700, "collision")
            .setSize(40, 60)
            .setOrigin(1, 1); // House door TR
        door3.visible = false;
        door3.setData("targetScene", "House3");

        const door4 = this.doorArea
            .create(1225, 1125, "collision")
            .setSize(40, 60)
            .setOrigin(1, 1); // House door TR
        door4.visible = false;
        door4.setData("targetScene", "House4");

        const door5 = this.doorArea
            .create(535, 1270, "collision")
            .setSize(40, 60)
            .setOrigin(1, 1); // House door TR
        door5.visible = false;
        door5.setData("targetScene", "House5");

        this.doorOpenSound = this.sound.add("doorOpen", { volume: 0.5 });

        this.physics.add.collider(
            this.player,
            this.doorArea,
            (player, doorArea) => {
                const targetScene = doorArea.getData("targetScene");
                if (targetScene) {
                    this.doorOpenSound.play();
                    console.log(`You are close to the ${targetScene} door!`);
                    this.scene.start(targetScene);
                }
            },
            null,
            this
        );

        // World bounds and camera
        this.physics.world.setBounds(0, 0, 2000, 1600);
        this.cameras.main.setBounds(0, 0, 2000, 1600);
        this.cameras.main.startFollow(this.player);

        this.cursors = this.input.keyboard.createCursorKeys();

        if (!this.sound.get("backgroundMusic")) {
            this.backgroundMusic = this.sound.add("backgroundMusic", {
                loop: true,
                volume: 0.0,
            });
            this.backgroundMusic.play();
        } else {
            const backgroundMusic = this.sound.get("backgroundMusic");
            if (!backgroundMusic.isPlaying) {
                backgroundMusic.play();
            }
        }
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
