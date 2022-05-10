import { IVector2 } from "../types";

export function magnitude(v: IVector2) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}