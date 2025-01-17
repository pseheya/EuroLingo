export default class CollisionBlocks {
  constructor(scene) {
    this.scene = scene;
    this.collisionBlocks = scene.physics.add.staticGroup();
    this.houseCollisionBlocks = scene.physics.add.staticGroup();

    this.collisionBlocks
      .create(690, 1500, "collision")
      .setSize(10, 500)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(0, 1200, "collision")
      .setSize(280, 1)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(420, 1200, "collision")
      .setSize(400, 1)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(720, 1180, "collision")
      .setSize(10, 205)
      .setOrigin(1, 1)
      .setVisible(false);
    // TR Fencing
    this.collisionBlocks
      .create(1510, 530, "collision")
      .setSize(10, 445)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1870, 530, "collision")
      .setSize(10, 445)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1700, 330, "collision")
      .setSize(300, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1600, 750, "collision")
      .setSize(150, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1810, 750, "collision")
      .setSize(100, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    // CR House
    this.collisionBlocks
      .create(1395, 625, "collision")
      .setSize(100, 200)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1320, 625, "collision")
      .setSize(100, 200)
      .setOrigin(1, 1)
      .setVisible(false);
    // CL House
    this.collisionBlocks
      .create(175, 850, "collision")
      .setSize(180, 210)
      .setOrigin(1, 1)
      .setVisible(false);
    // BL House
    this.collisionBlocks
      .create(540, 1185, "collision")
      .setSize(375, 215)
      .setOrigin(1, 1)
      .setVisible(false);
    // TOP House
    this.collisionBlocks
      .create(1235, 267, "collision")
      .setSize(100, 220)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1165, 258, "collision")
      .setSize(100, 200)
      .setOrigin(1, 1)
      .setVisible(false);
    // Horse's House
    this.collisionBlocks
      .create(1260, 1037, "collision")
      .setSize(190, 200)
      .setOrigin(1, 1)
      .setVisible(false);
    //Hut
    this.collisionBlocks
      .create(1695, 955, "collision")
      .setSize(100, 115)
      .setOrigin(1, 1)
      .setVisible(false);

    //Pole
    this.collisionBlocks
      .create(572, 940, "collision")
      .setSize(10, 10)
      .setOrigin(1, 1)
      .setVisible(false);

    550, 841;
    //Bench
    this.collisionBlocks
      .create(1215, 790, "collision")
      .setSize(90, 20)
      .setOrigin(1, 1)
      .setVisible(false);
    // Fountain
    this.collisionBlocks
      .create(999, 900, "collision")
      .setSize(85, 60)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(999, 875, "collision")
      .setSize(90, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(999, 869, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    // TL House
    this.collisionBlocks
      .create(605, 540, "collision")
      .setSize(335, 180)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(590, 440, "collision")
      .setSize(140, 30)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(570, 670, "collision")
      .setSize(82, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(450, 665, "collision")
      .setSize(20, 70)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(500, 645, "collision")
      .setSize(80, 30)
      .setOrigin(1, 1)
      .setVisible(false); // House door
    // TL House Wall
    this.collisionBlocks
      .create(275, 560, "collision")
      .setSize(1, 150)
      .setOrigin(1, 1)
      .setVisible(false); // Left Wall
    this.collisionBlocks
      .create(320, 460, "collision")
      .setSize(1, 40)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(380, 400, "collision")
      .setSize(1, 30)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(350, 430, "collision")
      .setSize(10, 1)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(317, 670, "collision")
      .setSize(1, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(480, 800, "collision")
      .setSize(230, 1)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(350, 750, "collision")
      .setSize(1, 100)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(730, 800, "collision")
      .setSize(100, 1)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(800, 740, "collision")
      .setSize(0, 100)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(860, 690, "collision")
      .setSize(80, 1)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(900, 630, "collision")
      .setSize(1, 120)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(900, 450, "collision")
      .setSize(1, 120)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(635, 375, "collision")
      .setSize(480, 1)
      .setOrigin(1, 1)
      .setVisible(false);

    //wishingWell
    1120, 535;
    this.collisionBlocks
      .create(1178, 640, "collision")
      .setSize(50, 30)
      .setOrigin(1, 1)
      .setVisible(false);

    // Water Boundaries
    this.collisionBlocks
      .create(1160, 1310, "collision")
      .setSize(180, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1400, 1260, "collision")
      .setSize(250, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1580, 1160, "collision")
      .setSize(10, 110)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1780, 1100, "collision")
      .setSize(250, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1910, 1130, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1950, 1185, "collision")
      .setSize(1, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1975, 1205, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1615, 1215, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1525, 1225, "collision")
      .setSize(10, 100)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1555, 1160, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1265, 1290, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1650, 1160, "collision")
      .setSize(10, 110)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(800, 1600, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(905, 1495, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(955, 1440, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1005, 1390, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1060, 1340, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1040, 1365, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(830, 1570, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(930, 1470, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(980, 1420, "collision")
      .setSize(50, 10)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(850, 1540, "collision")
      .setSize(5, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.collisionBlocks
      .create(1060, 1340, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);

    this.collisionBlocks
      .create(880, 1520, "collision")
      .setSize(50, 5)
      .setOrigin(1, 1)
      .setVisible(false);

    this.houseCollisionBlocks
      .create(690, 600, "collision")
      .setSize(10, 50)
      .setOrigin(1, 1)
      .setVisible(false);
    this.houseCollisionBlocks
      .create(600, 600, "collision")
      .setSize(50, 1)
      .setOrigin(1, 1)
      .setVisible(false);
  }
  getBlocks() {
    return this.collisionBlocks;
  }
}
