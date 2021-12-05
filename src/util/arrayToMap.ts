import { IObject } from "../data/types"

export const arrayToMap = <T extends IObject>(input: T[]): Record<number, T> => input.reduce((acc, cur) => ({...acc, [cur.id]: cur}), {} as Record<number, T>);