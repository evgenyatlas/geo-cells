import { getAngle } from "../lib/getAngle"
import { magnitude } from "../lib/magnitute"
import { distance } from "../lib/geo/distance"
import { IUnit } from "../lib/geo/units"
import { move } from "../lib/geo/move"
import { BBox, IGeoPos, IVector2, Vector2 } from "../types"
import squareGrid from '@turf/square-grid'

export class GeoCells {

    private bbox: BBox
    public get bboxs(): BBox {
        return this.bbox
    }

    private cellSize: number
    private typeDist: IUnit

    private _width: number
    get width(): number {
        return this._width
    }
    private _height: number
    public get height(): number {
        return this._height
    }

    get startPos(): IGeoPos {
        return { lng: this.bbox[0], lat: this.bbox[1] }
    }
    get endPos(): IGeoPos {
        return { lng: this.bbox[2], lat: this.bbox[3] }
    }

    constructor(
        bbox: BBox,
        cellSize: number,
        typeDist: IUnit = 'meters'
    ) {
        this.bbox = bbox
        this.cellSize = cellSize
        this.typeDist = typeDist as IUnit
        this._width = Math.ceil(distance({ lng: bbox[0], lat: bbox[1] }, { lng: bbox[2], lat: bbox[1] }, this.typeDist) / cellSize + cellSize)
        this._height = Math.ceil(distance({ lng: bbox[0], lat: bbox[1] }, { lng: bbox[0], lat: bbox[3] }, this.typeDist) / cellSize + cellSize)
    }
    /**
     * transform cell to geo pos
     */
    cellToPos(cell: Vector2): IGeoPos {
        const cellDist: Vector2 = [
            cell[0] * this.cellSize,
            cell[1] * this.cellSize
        ]

        //Move to the required position based on:
        const pos = move(
            //Grid starting position
            this.startPos,
            //Distances from start position to end point
            magnitude(cellDist),
            //Rotation angle from start position to end point
            90 - getAngle(cellDist),
            this.typeDist
        )

        return pos
    }
    /**
    * transform geo pos to cell
    */
    posToCell(pos: IGeoPos): Vector2 {
        //Distance from start position to pos.lng
        const xDist = distance(this.startPos, { lng: pos.lng, lat: this.startPos.lat }, this.typeDist)
        //Distance from start position to pos.lat
        const yDist = distance(this.startPos, { lng: this.startPos.lng, lat: pos.lat }, this.typeDist)

        return [
            //Distance / cell size = x,y
            Math.round(xDist / this.cellSize),
            Math.round(yDist / this.cellSize)
        ]
    }
}