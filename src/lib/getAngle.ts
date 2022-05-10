import { IVector2 } from "../types"

export function getAngle(v: IVector2) {
    return Math.atan2(v.y, v.x) / Math.PI * 180
}