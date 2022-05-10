import { IUnit, units } from "./units";

export function lengthToRadians(length: number, unit: IUnit = 'meters') {
    const factor = exports.factors[unit]
    return length / factor
}