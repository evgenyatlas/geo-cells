const earthRadius = 6371008.8

export const units = {
    meters: earthRadius,
    kilometers: earthRadius / 1000
}

export type IUnit = keyof typeof units