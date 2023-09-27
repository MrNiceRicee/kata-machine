type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        this.length++;

        const node = {
            value: item,
        } as Node<T>;

        if (!this.head) {
            this.head = node;
            return;
        }

        node.prev = this.head;
        this.head = node;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (this.length === 0) {
            const head = this.head;
            this.head = undefined;

            return head?.value;
        }

        // [A] [B]
        // this head = B
        // head.prev = A

        // save "head" so we can have a reference
        const head = this.head as Node<T>;
        // move this.head to point to Prev [A]
        this.head = head.prev

        // return teh value of the reference to [B]
        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
