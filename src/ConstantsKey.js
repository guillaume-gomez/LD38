const Key = "Test";

export const Tileset = {
  path: "tileset.png",
  key: "tileset"
  };

export const Level1 = {
  path: "LVL_1.json",
  key: Key,
  lastLayer: 3,
  text: "",
  playerPosition: {x: 64, y: 352}
};

export const Level2 = {
  path: "LVL_6.json",
  key: Key,
  lastLayer: 3,
  text: "",
  playerPosition: {x: 64, y: 20}
};

export const Level3 = {
  path: "LVL_2.json",
  key: Key,
  lastLayer: 2,
  text: "The gap seems too large. You might want to use your power",
  playerPosition: {x: 64, y: 352}
};

export const Level4 = {
  path: "LVL_7.json",
  key: Key,
  lastLayer: 2,
  text: "",
  playerPosition: {x: 64, y: 20}
};


export const Level5 = {
  path: "LVL_3.json",
  key: Key,
  lastLayer: 2,
  text: "A layer can help you, but it could stop you too. Press Shift to rollback.",
  playerPosition: {x: 64, y: 352}
};

export const Level6 = {
  path: "LVL_4.json",
  key: Key,
  lastLayer: 1,
  text: "You may need to remove more than one layer",
  playerPosition: {x: 64, y: 352}
};

export const Level666 = {
  path: "LVL_final_cut_scene.json",
  key: Key,
  lastLayer: 1
};



export const Levels = {
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
  Level666
};

export const HeroSprite = {
  key: "hero",
  path: "hero.png"
}