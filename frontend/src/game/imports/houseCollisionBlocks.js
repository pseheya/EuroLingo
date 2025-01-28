export default class HouseCollisionBlocks {
  constructor(scene) {
    this.scene = scene;
    this.HouseCollisionBlocks = scene.physics.add.staticGroup();

    // array of parameters for collisions
    const collisionConfigs = [
      { x: 910, y: 600, size: { width: 10, height: 50 } },
      { x: 510, y: 190, size: { width: 400, height: 1 } },
      { x: 610, y: 375, size: { width: 200, height: 1 } },
      { x: 348, y: 510, size: { width: 250, height: 1 } },
      { x: 275, y: 300, size: { width: 1, height: 500 } },
      { x: 505, y: 448, size: { width: 1, height: 150 } },
      { x: 338, y: 485, size: { width: 100, height: 30 } },
      { x: 300, y: 400, size: { width: 40, height: 100 } },
      { x: 680, y: 280, size: { width: 40, height: 120 } },
      { x: 570, y: 220, size: { width: 130, height: 40 } },
      { x: 320, y: 225, size: { width: 50, height: 50 } },
      { x: 390, y: 220, size: { width: 40, height: 50 } },
      { x: 470, y: 485, size: { width: 30, height: 30 } },
    ];
    collisionConfigs.forEach(({ x, y, size }) => {
      this.HouseCollisionBlocks.create(x, y, "collision")
        .setSize(size.width, size.height)
        .setOrigin(1, 1)
        .setVisible(false);
    });
  }

  getHouseBlocks() {
    return this.HouseCollisionBlocks;
  }
}
