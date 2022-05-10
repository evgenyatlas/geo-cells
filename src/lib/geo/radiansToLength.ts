import { IUnit, units } from "./units";

export function radiansToLength(radians: number, unit: IUnit = 'meters') {
    const factor = units[unit]
    return radians * factor
}