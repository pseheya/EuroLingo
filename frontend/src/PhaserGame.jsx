import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { MainScene } from "./game/scenes/MainScene";
import ItalianHouse from "./game/scenes/ItalianHouse";
import HouseScene2 from "./game/scenes/HouseScene2";
import HouseScene3 from "./game/scenes/HouseScene3";
import HouseScene4 from "./game/scenes/HouseScene4";
import HouseScene5 from "./game/scenes/HouseScene5";
import "./PhaserGame.css";
import BridgeScene from "./game/scenes/BridgeScene";
import CaveScene from "./game/scenes/CaveScene";

const PhaserGame = ({ username }) => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scene: [
        MainScene,
        ItalianHouse,
        HouseScene2,
        HouseScene3,
        HouseScene4,
        HouseScene5,
        BridgeScene,
        CaveScene,
      ],
      parent: gameContainer.current,
      dom: {
        createContainer: true,
      },
    };

    const game = new Phaser.Game(config);

    game.registry.set("username", username);

    game.scene.start("Main");

    gameContainer.current.appendChild(game.canvas);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} className="gameContainer"></div>;
};

export default PhaserGame;
