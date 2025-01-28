export default class House2CollisionBlocks {
  constructor(scene) {
    this.scene = scene;
    this.House2CollisionBlocks = scene.physics.add.staticGroup();

    const collisionConfigs = [
      { x: 285, y: 250, size: { width: 10, height: 500 } },
      { x: 530, y: 230, size: { width: 500, height: 10 } },
      { x: 530, y: 490, size: { width: 500, height: 10 } },
      { x: 320, y: 290, size: { width: 50, height: 100 } },
      { x: 425, y: 270, size: { width: 125, height: 30 } },
      { x: 680, y: 380, size: { width: 50, height: 130 } },
      { x: 615, y: 415, size: { width: 40, height: 20 } },
      { x: 535, y: 250, size: { width: 45, height: 50 } },
      { x: 315, y: 460, size: { width: 40, height: 40 } },
      { x: 684, y: 265, size: { width: 35, height: 35 } },
    ];

    collisionConfigs.forEach(({ x, y, size }) => {
      this.House2CollisionBlocks.create(x, y, "collision")
        .setSize(size.width, size.height)
        .setOrigin(1, 1)
        .setVisible(false);
    });
  }

  getHouse2Blocks() {
    return this.House2CollisionBlocks;
  }
}
