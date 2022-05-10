import { radiansToLength } from "./radiansToLength";
import { degreesToRadians } from "./degreesToRadians";
import { IUnit, units } from "./units";
import { IGeoPos } from "types";

export function distance(pos1: IGeoPos, pos2: IGeoPos, unit: IUnit = 'meters'): number {

    const dLat = degreesToRadians(pos2.lat - pos1.lat);
    const dLon = degreesToRadians(pos2.lng - pos1.lng);
    const lat1 = degreesToRadians(pos1.lat);
    const lat2 = degreesToRadians(pos2.lat);
    const a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    return radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), unit);
}