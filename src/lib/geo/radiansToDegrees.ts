export function radiansToDegrees(radians: number) {
    const degrees = radians % (2 * Math.PI)
    return degrees * 180 / Math.PI
}