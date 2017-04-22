//TO DESTROY LATER
const MaxLayer = 2

class MapManager {

  constructor(map) {
    this.removedBlock = [];
    this.map = map;
  }

  findLayerToDestroy(x, y, lengthX, lengthY) {
    let layerIndex = 0;
    for(let index = 0; index < MaxLayer; index++) {
      if( this.map.getTile(x, y, index) === null &&
          this.map.getTile(x + lengthX-1, y + lengthY-1, index) === null) {
        layerIndex++;
      } else {
        break;
      }
    }
    return layerIndex;
  }

  eraseBlock() {
    const x = 0;
    const y = 0;
    const lengthY = 10;
    const lengthX = 10;
    //check the layers associated to the deletion;
    let objectsRemoves = []
    const layerIndex = this.findLayerToDestroy(x, y, lengthX, lengthY);
    for(let xAxis = x; xAxis < lengthX; xAxis++) {
      for(let yAxis = y; yAxis < lengthY; yAxis++) {
        const tile = this.map.removeTile(xAxis, yAxis, layerIndex);
        objectsRemoves.push(tile);
      }
    }
    this.removedBlock.push({tiles: objectsRemoves, layerIndex: layerIndex, x, y});
    this.removedBlock.sort(this.sortByLayerIndex);
    console.log(this.removedBlock)
  }

  sortByLayerIndex(a, b) {
    return a.layerIndex < b.layerIndex;
  }

  undoBlock() {
    const x = 0;
    const y = 0;
    const lengthX = 10;
    const lengthY = 10;
    const redoElements = this.removedBlock.find(list => list.x === x && list.y === y );
    if(redoElements) {
      redoElements.tiles.forEach(tile => {
        this.map.putTile(tile, tile.x, tile.y, redoElements.layerIndex);
      });
      //remove the element after
      const newArray = this.removedBlock.filter(elmt => elmt !== redoElements);
      this.removedBlock = newArray.sort(this.sortByLayerIndex);
    }
  }

}

export default MapManager;