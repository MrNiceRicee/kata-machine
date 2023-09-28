type Node<T> = {
    value: T;
    next?: Node<T>;
};

// [A] --> [B] --> [C] --> [D]
// ^ head                  ^ tail
export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    // [A] --> [B] --> [C] --> [D]
    // ^ head                  ^ tail
    enqueue(item: T): void {
        const newNode: Node<T> = {
            value: item,
        };
        if (!this.tail) {
            // []
            // ^ tail and head
            this.tail = this.head = newNode;
            // [newNode]
            // ^ tail and head
            this.length++;
            return;
        }

        // [newNode]
        // [A] --> [B] --> [C] --> [D]
        // ^ head                  ^ tail

        this.tail.next = newNode;
        this.tail = newNode;
        // [A] --> [B] --> [C] --> [D] --> [newNode]
        // ^ head                          ^ tail
        this.length++;
    }
    // [A] --> [B] --> [C] --> [D]
    // ^ head                  ^ tail
    // remove head
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        const head = this.head;
        this.length--;

        // [A] --> [B] --> [C] --> [D]
        // ^ head                  ^ tail
        this.head = this.head.next;
        // [B] --> [C] --> [D]
        // ^ head         ^ tail
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
