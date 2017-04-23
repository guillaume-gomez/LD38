import { CursorLength } from '../Constants.js';

class MapManager {

  constructor(map, mapLayer) {
    this.removedBlock = [];
    this.map = map;
    this.maxMapLayer = mapLayer;
  }

  findLayerToDestroy(x, y, lengthX, lengthY) {
    let layerIndex = 0;
    for(let index = 0; index < this.maxMapLayer; index++) {
      if( this.map.getTile(x, y, index) === null &&
          this.map.getTile(x + lengthX-1, y + lengthY-1, index) === null) {
        layerIndex++;
      } else {
        break;
      }
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
      });
    });
  }

  eraseBlock(x, y) {
    const lengthY = CursorLength;
    const lengthX = CursorLength;
    //check the layers associated to the deletion;
    let objectsRemoves = []
    const layerIndex = this.findLayerToDestroy(x, y, lengthX, lengthY);
    for(let xAxis = x; xAxis < x + lengthX; xAxis++) {
      for(let yAxis = y; yAxis < y + lengthY; yAxis++) {
        let collidedTile = this.map.getTile(xAxis, yAxis, this.map.layers.length - 1);
        if(collidedTile) {
          collidedTile.isVisible = collidedTile.isVisible ? false : true;
        }
        const tile = this.map.removeTile(xAxis, yAxis, layerIndex);
        objectsRemoves.push(tile);
      }
    }
    this.removedBlock.push({tiles: objectsRemoves, layerIndex: layerIndex, x, y});
    this.removedBlock.sort(this.sortByLayerIndex);
  }

  sortByLayerIndex(a, b) {
    return a.layerIndex < b.layerIndex;
  }

  undoBlock(x, y) {
    const lengthX = CursorLength;
    const lengthY = CursorLength;
    const redoElements = this.removedBlock.find(list => list.x === x && list.y === y );
    if(redoElements) {
      redoElements.tiles.forEach(tile => {
        let collidedTile = this.map.getTile(tile.x, tile.y, this.map.layers.length - 1);
        if(collidedTile) {
          collidedTile.isVisible = collidedTile.isVisible ? false : true;
        }
        this.map.putTile(tile, tile.x, tile.y, redoElements.layerIndex);
      });
      //remove the element after
      const newArray = this.removedBlock.filter(elmt => elmt !== redoElements);
      this.removedBlock = newArray.sort(this.sortByLayerIndex);
    }
  }

}

export default MapManager;