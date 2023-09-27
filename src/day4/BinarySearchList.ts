export default function bs_list(haystack: number[], needle: number): boolean {
    let left = 0;
    let right = haystack.length;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (haystack[mid] === needle) {
            return true;
        }

        if (haystack[mid] > needle) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return false;
}
