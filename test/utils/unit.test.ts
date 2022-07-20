import { convertValueUnit } from '../../src/utils/units.utile'


test('convert 1 arec to m2', () => {
    const result = convertValueUnit(1, 4046.8, 1)
    expect(result).toBe(4046.8)
});

test('convert 1 arec to rai', () => {
    const result = Number(convertValueUnit(1, 4046.8, 1600).toFixed(2))
    expect(result).toBe(2.53)
})