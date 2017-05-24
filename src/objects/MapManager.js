import { CursorLength, Width, Height, Size, WidthLevel, HeightLevel } from '../Constants.js';

const LengthAnimation = 50;
const MaxLayer = 3;
const DefaultTiles = [{layer_index: 3, tile: 1152}, {layer_index: 2, tile: 1184}, {layer_index: 1, tile: 1216}]

class MapManager {

  constructor(map, lastLayerAvailable) {
    this.removedBlock = [];
    this.cacheCollisionLayer = [];
    this.lastLayerAvailable = lastLayerAvailable;
    this.map = map;
    this.nbGems = 0;
    this.currentGems = 0;
    this.doorSprites = [];
    this.visibleDoor = false;
  }

  shouldPicked(tile) {
    return tile.properties.is_gem == 1 || tile.properties.layer_gem == 1 || tile.properties.trigger === true;
  }

  findLayerToDestroy(x, y, lengthX, lengthY) {
    //layer can be deleted 3 and 2
    let layerIndex = MaxLayer;
    for(let index = MaxLayer; index > 1; index--) {
      if( this.map.getTile(x, y, index) === null &&
          this.map.getTile(x + lengthX-1, y + lengthY-1, index) === null) {
        layerIndex--;
      } else {
        break;
      }
    }
    //impossible
    if(layerIndex <= 1 ||  layerIndex <= this.lastLayerAvailable) {
      return -1;
    }
    return layerIndex;
  }

  setUpCollisionLayer(colissionLayer) {
    colissionLayer.layer.data.forEach(column => {
      column.forEach(tile => {
        if(tile.properties.layer_index && tile.properties.layer_index != MaxLayer) {
          this.cacheCollisionLayer.push(tile);
          this.map.removeTile(tile.x, tile.y, "colissionLayer");
         }

         if(tile.properties.layer_index) {
          tile.alpha = 0;
         }

        if(this.shouldPicked(tile)) {
          if(tile.properties.layer_index == MaxLayer) {
            tile.alpha = 1;
          } else {
            tile.alpha = 0;
          }
        }

        if(tile.properties.is_gem == 1) {
          this.nbGems++;
        }

        if(tile.properties.portal == 1) {
          this.doorSprites.push(tile);
          tile.alpha = 0;
        }
      });
    });
  }

  eraseBlock(x, y, nbTiles = CursorLength) {
    const lengthY = nbTiles;
    const lengthX = nbTiles;
    //check the layers associated to the deletion;
    let objectsRemoves = [];
    let indexRemoval = 0;
    const layerIndex = this.findLayerToDestroy(x, y, lengthX, lengthY);
    //cannot destroy
    if(layerIndex == -1) {
      return;
    }
    for(let xAxis = x; xAxis < x + lengthX; xAxis++) {
      for(let yAxis = y; yAxis < y + lengthY; yAxis++) {
        this.handleCollisionBlockOnErase(xAxis, yAxis, layerIndex);

        const fn = () => {
          const tile = this.map.removeTile(xAxis, yAxis, layerIndex);
          objectsRemoves.push(tile);
        }
        setTimeout(fn, indexRemoval * LengthAnimation);
        indexRemoval++;
        if(indexRemoval > CursorLength) {
          indexRemoval = 0;
        }
      }
    }
    this.removedBlock.push({tiles: objectsRemoves, layerIndex: layerIndex, x, y});
    this.removedBlock.sort(this.sortByLayerIndex);
  }

  removeLayer() {
    for(let x = 0; x < WidthLevel / Size; x++) {
      for(let y = 0; y < HeightLevel / Size; y++) {
        this.eraseBlock(x,y, 1);
      }
    }
  }

  undoLayer() {
    for(let x = 0; x < WidthLevel / Size; x++) {
      for(let y = 0; y < HeightLevel / Size; y++) {
        this.undoBlock(x,y, 1);
      }
    }
  }

  handleCollisionBlockOnErase(x,y, layerIndex) {
    let collidedTile = this.map.getTile(x, y, "colissionLayer");
    if(collidedTile && collidedTile.properties) {
      if(collidedTile.properties.layer_index >= layerIndex) {
        if(!collidedTile.properties || !collidedTile.properties.portal) {
          this.cacheCollisionLayer.push(collidedTile);
          this.map.removeTile(x, y, "colissionLayer");
        }
      }
    } else{
      //dont find the tile in the layer, so the tile might be in the deleted tiles
      let indexRemoveCollisionBlock = 0;
      const tileToInsert = this.cacheCollisionLayer.find((tile, index) => {
        indexRemoveCollisionBlock = index;
        return tile.x === x && tile.y === y;
      });
      if(!tileToInsert) {
        return;
      }
      if(tileToInsert.properties.layer_index == layerIndex - 1) {
        let newTile = this.map.putTile(tileToInsert, tileToInsert.x, tileToInsert.y, "colissionLayer");
        //copy property
        newTile.properties = Object.assign({}, tileToInsert.properties);
        if(!this.shouldPicked(newTile)) {
          newTile.alpha = 0;
        }
        this.cacheCollisionLayer.splice(indexRemoveCollisionBlock, 1);
      }
    }
  }

  handleCollisionBlockOnUndo(x,y, layerIndex) {
    let collidedTile = this.map.getTile(x, y, "colissionLayer");
    if(collidedTile && collidedTile.properties) {
      //remove collision block
      if(collidedTile.properties.layer_index < layerIndex) {
        this.cacheCollisionLayer.push(collidedTile);
        this.map.removeTile(x, y, "colissionLayer")
      }
    } else {
      //dont find the tile in the layer, so the tile might be in the deleted tiles
      let indexRemoveCollisionBlock = 0;
      const tileToInsert = this.cacheCollisionLayer.find((tile, index) => {
        indexRemoveCollisionBlock = index;
        return tile.x === x && tile.y === y;
      });
      if(!tileToInsert) {
        return;
      }
      if(tileToInsert.properties.layer_index == layerIndex) {
        let newTile = this.map.putTile(tileToInsert, tileToInsert.x, tileToInsert.y, "colissionLayer");
        //copy property
        newTile.properties = Object.assign({}, tileToInsert.properties);
        if(!this.shouldPicked(newTile)) {
          newTile.alpha = 0;
        }
        this.cacheCollisionLayer.splice(indexRemoveCollisionBlock, 1);
      }
    }
  }

  sortByLayerIndex(a, b) {
    return a.layerIndex > b.layerIndex;
  }

  undoBlock(x, y, nbTiles = CursorLength) {
    const lengthX = nbTiles;
    const lengthY = nbTiles;
    const redoElementsArray = this.removedBlock.filter(list => list.x === x && list.y === y );
    const redoElements = redoElementsArray.reduce((acc, elm) => {
      if(elm.layerIndex < acc.layerIndex) {
        return elm;
      }
      return acc;
    });
    if(redoElements) {
      let indexRemoval = CursorLength;
      redoElements.tiles.forEach(tile => {
        this.handleCollisionBlockOnUndo(tile.x, tile.y, redoElements.layerIndex);
        let collidedTile = this.map.getTile(tile.x, tile.y, "colissionLayer");
        if(collidedTile) {
          collidedTile.isVisible = collidedTile.isVisible ? false : true;
        }
        const fn = () => {
          this.map.putTile(tile, tile.x, tile.y, redoElements.layerIndex);
        };
        setTimeout(fn, indexRemoval * LengthAnimation);
        indexRemoval--;
        if(indexRemoval < 0) {
          indexRemoval = CursorLength;
        }
      });
      //remove the element after
      const newArray = this.removedBlock.filter(elmt => elmt !== redoElements);
      this.removedBlock = newArray.sort(this.sortByLayerIndex);
    }
  }

  killGem() {
    this.currentGems++;
    if(this.nbGems === this.currentGems) {
      this.showDoor();
    }
  }

  portalEnable() {
    return this.visibleDoor;
  }

  showDoor() {
    this.visibleDoor = true;
    this.doorSprites.forEach((tile, index) => {
      tile.alpha = 1;
    });
  }

  removeCollisionsAndAddElements(layerIndex) {
    let props = [];
    this.map.forEach((tile) => {
      if(tile.properties && tile.properties.layer_index == layerIndex && tile.properties.removed_block) {
        props.push({x:tile.x, y: tile.y});
      }
    });
    props.forEach(coord => {
      this.map.removeTile(coord.x, coord.y, "colissionLayer");
      //this.map.removeTile(coord.x, coord.y, layerIndex); CHECK IF CORRECT
      const defaultTile = DefaultTiles.find(object => object.layer_index == layerIndex);
      console.log(defaultTile.tile)
      this.map.putTile(defaultTile.tile, coord.x, coord.y, layerIndex);
    });
  }
}

export default MapManager;