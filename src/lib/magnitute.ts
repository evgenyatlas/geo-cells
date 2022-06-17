import { IVector2, Vector2 } from "../types";

export function magnitude(v: Vector2) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1])
}