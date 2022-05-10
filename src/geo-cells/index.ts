import { getAngle } from "lib/getAngle"
import { magnitude } from "lib/magnitute"
import { distance } from "lib/geo/distance"
import { IUnit } from "lib/geo/units"
import { move } from "lib/geo/move"
import { IGeoPos, IVector2 } from "types"
import squareGrid from '@turf/square-grid'

export class GeoCells {
    constructor(
        //cell size based on unit
        private cellSize: number,
        private startPos: IGeoPos,
        private unit: IUnit = 'meters'
    ) {
    }
    /**
     * transform cell to geo pos
     */
    cellToPos(cell: IVector2): IGeoPos {
        const cellDist: IVector2 = {
            x: cell.x * this.cellSize,
            y: cell.y * this.cellSize
        }

        //Move to the required position based on:
        const pos = move(
            //Grid starting position
            this.startPos,
            //Distances from start position to end point
            magnitude(cellDist),
            //Rotation angle from start position to end point
            90 - getAngle(cellDist),
            this.unit
        )

        return pos
    }
    /**
    * transform geo pos to cell
    */
    posToCell(pos: IGeoPos): IVector2 {
        //Distance from start position to pos.lng
        const xDist = distance(this.startPos, { lng: pos.lng, lat: this.startPos.lat }, this.unit)
        //Distance from start position to pos.lat
        const yDist = distance(this.startPos, { lng: this.startPos.lng, lat: pos.lat }, this.unit)

        //Distance / cell size = x,y
        return {
            x: Math.round(xDist / this.cellSize),
            y: Math.round(yDist / this.cellSize)
        }
    }
    gridDebug() {
        const bbox = [this.startPos.lng, this.startPos.lat, 30.2708101272583, 60.02500483633538]
        const grid = squareGrid(bbox as [number, number, number, number], this.cellSize, {
            units: this.unit
        })

        return grid
    }
}