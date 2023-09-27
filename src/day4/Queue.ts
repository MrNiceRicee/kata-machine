type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = {
            value: item,
        } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        // we append to tail with the new node
        this.tail.next = node;
        // point the tail to the new node
        this.tail = node;
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        // tracker to have the value for head
        const head = this.head;
        // point the head to the next so we move from [A] -> [B]
        this.head = this.head.next;
        // ^ [A]        head is now [b]

        head.next = undefined;
        if (this.length === 0) {
            this.tail = undefined;
        }

        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
