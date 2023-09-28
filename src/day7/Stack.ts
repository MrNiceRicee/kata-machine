type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    // [A] <-- [B] <-- [C] <-- [D]
    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    // [A] <-- [B] <-- [C] <-- [D] <-- [newNode]
    //                                 ^ head
    push(item: T): void {
        const newNode: Node<T> = {
            value: item,
        };
        if (!this.head) {
            this.head = newNode;
            this.length++;
            return;
        }
        newNode.prev = this.head;
        this.head = newNode;
        this.length++;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (this.length === 0) {
            // []
            // ^ head
            const headValue = this.head?.value;
            this.head = undefined;
            return headValue;
        }
        // [A] <-- [B] <-- [C] <-- [D]
        //                         ^ head. prev = [C]
        const headValue = this.head?.value;
        // [A] <-- [B] <-- [C] <-- [D]
        //                 ^ head
        this.head = this.head?.prev;

        return headValue;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
