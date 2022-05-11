import { IUnit, units } from "./units"

export function lengthToRadians(length: number, unit: IUnit = 'meters') {
    const factor = units[unit]
    return length / factor
}