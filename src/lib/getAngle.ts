import { IVector2, Vector2 } from "../types"

export function getAngle(v: Vector2) {
    return Math.atan2(v[0], v[1]) / Math.PI * 180
}