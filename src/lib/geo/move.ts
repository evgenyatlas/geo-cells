import { IGeoPos } from "../../types";
import { degreesToRadians } from "./degreesToRadians";
import { lengthToRadians } from "./lengthToRadians";
import { radiansToDegrees } from "./radiansToDegrees";
import { radiansToLength } from "./radiansToLength";
import { IUnit } from "./units";


export function move(pos: IGeoPos, distance: number, bearing: number, unit: IUnit = 'meters') {

    const posRadians = {
        lng: degreesToRadians(pos.lng),
        lat: degreesToRadians(pos.lat)
    }
    const bearingRad = degreesToRadians(bearing)
    const distRadians = lengthToRadians(distance, unit)

    const latitude2 = Math.asin(Math.sin(posRadians.lat) * Math.cos(distRadians) +
        Math.cos(posRadians.lat) * Math.sin(distRadians) * Math.cos(bearingRad))
    const longitude2 = posRadians.lng +
        Math.atan2(Math.sin(bearingRad) * Math.sin(distRadians) * Math.cos(posRadians.lat), Math.cos(distRadians) - Math.sin(posRadians.lat) * Math.sin(latitude2))

    return { lng: radiansToDegrees(longitude2), lat: radiansToDegrees(latitude2) }
}