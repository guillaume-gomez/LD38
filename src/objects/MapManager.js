//TO DESTROY LATER
const MaxLayer = 2

class MapManager {

  constructor(map) {
    this.removedBlock = [];
    this.map = map;
  }

  findLayerToDestroy(map, x, y, lengthX, lengthY) {
    let layerIndex = 0;
    for(let index = 0; index < MaxLayer; index++) {
      if( map.getTile(x, y, index) === null &&
          map.getTile(x + lengthX-1, y + lengthY-1, index) === null) {
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
    const layerIndex = this.findLayerToDestroy(this.map, x, y, lengthX, lengthY);
    for(let xAxis = x; xAxis < lengthX; xAxis++) {
      for(let yAxis = y; yAxis < lengthY; yAxis++) {
        const tile = this.map.removeTile(xAxis, yAxis, layerIndex);
      }
    }
  }

}

export default MapManager;