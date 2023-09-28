type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = {
            value: item,
        };
        this.length++;
        // no head
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        // [newNode] -> [A]
        //              ^head
        node.next = this.head;
        // [newNode] <-> [A]
        //              ^head
        this.head.prev = node;

        // [newNode] <-> [A]
        // ^head
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("cannot insert out of bounds.");
        }
        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        const current = this.getAt(idx) as Node<T>;

        const node: Node<T> = {
            value: item,
        };

        node.next = current;
        node.prev = current.prev;
        current.prev = node;

        if (node.prev) {
            node.prev.next = current;
        }
    }

    append(item: T): void {
        this.length++;
        const node: Node<T> = {
            value: item,
        };
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let current = this.head;
        for (let i = 0; i < this.length && current; ++i) {
            if (current.value === item) {
                break;
            }
            current = current.next;
        }

        if (!current) {
            return undefined;
        }

        return this.removeNode(current);
    }
    get(idx: number): T | undefined {
        const node = this.getAt(idx)?.value;
        return node;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return undefined;
        }

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;
        return node.value;
    }

    private getAt(index: number): Node<T> | undefined {
        let current = this.head;
        for (let i = 0; i < index && current; ++i) {
            current = current.next;
        }

        return current;
    }
}
