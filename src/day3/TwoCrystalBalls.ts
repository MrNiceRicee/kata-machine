export default function two_crystal_balls(breaks: boolean[]): number {
    const steps = Math.floor(Math.sqrt(breaks.length));

    let i = 0;
    for (; i < breaks.length; i += steps) {
        if (breaks[i]) break;
    }

    i -= steps;

    for (let j = 0; j < steps && i < breaks.length; i++, j++) {
        if (breaks[i]) return i;
    }

    return -1;
}
