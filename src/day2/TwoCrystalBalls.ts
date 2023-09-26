export default function two_crystal_balls(breaks: boolean[]): number {
    const steps = Math.floor(Math.sqrt(breaks.length));

    let i = steps;
    for (; i < breaks.length; i += steps) {
        if (breaks[i]) {
            break;
        }
    }

    i -= steps;
    for (let j = 0; j < steps && i < breaks.length; ++j, ++i) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}
