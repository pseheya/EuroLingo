import Phaser from "phaser";
import House2CollisionBlocks from "../imports/house2CollisionBlocks";

class HouseScene3 extends Phaser.Scene {
    constructor() {
        super({ key: "House3" });
    }

    preload() {
        this.load.image("house1", "assets/house1.png");
        this.load.spritesheet("guy", "assets/guy.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image("collision", "assets/collision.png");
        this.doorOpenSound = this.sound.add("doorOpen", { volume: 0.5 });
    }

    create() {
        // Stop BG Music in House
        const backgroundMusic = this.sound.get("backgroundMusic");
        if (backgroundMusic) {
            backgroundMusic.stop();
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

        // World bounds and camera
        this.physics.world.setBounds(0, 0, 725, 800);
        this.cameras.main.setBounds(0, 0, 800, 800);
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
