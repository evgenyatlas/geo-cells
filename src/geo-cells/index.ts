import { getAngle } from "lib/getAngle"
import { magnitude } from "lib/magnitute"
import { distance } from "lib/geo/distance"
import { IUnit } from "lib/geo/units"
import { move } from "lib/geo/move"
import { IGeoPos, IVector2 } from "types"
import squareGrid from '@turf/square-grid'

export class GeoCells {
    private unit: IUnit
    constructor(
        //метры
        private cellSize: number,
        private startPos: IGeoPos,
        typeDist: IUnit = 'meters'
    ) {
        this.unit = typeDist as IUnit
    }
    //Переводим ячейку в позицию
    cellToPos(cell: IVector2): IGeoPos {
        //Дистанция по x,y в метрах
        const cellDist: IVector2 = {
            x: cell.x * this.cellSize,
            y: cell.y * this.cellSize
        }

        //Двигаем на необходимую позицию исходя из
        const pos = move(
            //Стартовой позиции сетки
            this.startPos,
            //Расстояния от стартовой позиции до конечной точки
            magnitude(cellDist),
            //Угол поворота от стартовой позиции до конечной точки
            90 - getAngle(cellDist),
            this.unit
        )

        return pos
    }
    posToCell(pos: IGeoPos): IVector2 {
        //Дистанция (в метрах) по X (от startPos)
        const xDist = distance(this.startPos, { lng: pos.lng, lat: this.startPos.lat }, this.unit)
        //Дистанция (в метрах) по Y (от startPos)
        const yDist = distance(this.startPos, { lng: this.startPos.lng, lat: pos.lat }, this.unit)

        return {
            //Дистанция / размер ячейки = x,y
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