import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { MainScene } from "./game/scenes/MainScene";
import ItalianHouse from "./game/scenes/ItalianHouse";
import SpanishHouse from "./game/scenes/SpanishHouse";
import GermanHouse from "./game/scenes/GermanHouse";
import FrenchHouse from "./game/scenes/FrenchHouse";
import "./PhaserGame.css";
import BridgeScene from "./game/scenes/BridgeScene";
import CaveScene from "./game/scenes/CaveScene";
import UkrainianHouse from "./game/scenes/UkrainianHouse";

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
        SpanishHouse,
        GermanHouse,
        UkrainianHouse,
        FrenchHouse,
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
