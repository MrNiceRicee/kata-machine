export default function two_crystal_balls(breaks: boolean[]): number {
    const step = Math.floor(Math.sqrt(breaks.length));
    let i = 0;
    for (; i < breaks.length; i += step) {
        if (breaks[i]) break;
    }

    i -= step;

    for (let j = 0; j < step && i < breaks.length; ++j, ++i) {
        if (breaks[i]) return i;
    }

    return -1;
}
