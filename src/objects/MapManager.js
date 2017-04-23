import { CursorLength } from '../Constants.js';

const LengthAnimation = 100;

class MapManager {

  constructor(map, mapLayer) {
    this.removedBlock = [];
    this.map = map;
    this.maxMapLayer = mapLayer;
  }

  findLayerToDestroy(x, y, lengthX, lengthY) {
    //layer can be deleted 3 and 2
    let layerIndex = this.maxMapLayer;
    for(let index = this.maxMapLayer; index > 1; index--) {
      if( this.map.getTile(x, y, index) === null &&
          this.map.getTile(x + lengthX-1, y + lengthY-1, index) === null) {
        layerIndex--;
      } else {
        break;
      }
    }
    //impossibe
    if(layerIndex <= 1) {
      return -1;
    }
    return layerIndex;
  }

  setUpCollisionLayer(colissionLayer) {
    colissionLayer.layer.data.forEach(column => {
      column.forEach(tile => {
         if(tile.properties.layer_index == 1) {
          tile.isVisible = true;
         } else {
          tile.isVisible = false;
         }
         tile.alpha = 0;
      });
    });
  }

  eraseBlock(x, y) {
    const lengthY = CursorLength;
    const lengthX = CursorLength;
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
        let collidedTile = this.map.getTile(xAxis, yAxis, "colissionLayer");
        if(collidedTile) {
          collidedTile.isVisible = collidedTile.isVisible ? false : true;
        }
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

  sortByLayerIndex(a, b) {
    return a.layerIndex > b.layerIndex;
  }

  undoBlock(x, y) {
    const lengthX = CursorLength;
    const lengthY = CursorLength;
    const redoElements = this.removedBlock.find(list => list.x === x && list.y === y );
    if(redoElements) {
      let indexRemoval = CursorLength;
      redoElements.tiles.forEach(tile => {
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

}

export default MapManager;