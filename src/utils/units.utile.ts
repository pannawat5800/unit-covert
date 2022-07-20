
export const convertValueUnit = (value: number, fromISValue: number, toIsValue: number): number => {
    return value * fromISValue / toIsValue
}