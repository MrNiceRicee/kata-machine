type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

// [A] <-> [B] <-> [C] <-> [D]
// head                     tail
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = {
            value: item,
        };
        // EX [A] <-> [B]
        // A.prev = undefined
        // [1] <-> [A] <-> [B]
        // A.prev = newNode;
        // newNode.next = [A]

        if (this.head) {
            node.next = this.head;
            this.head.prev = node;
        }

        this.length++;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        const node: Node<T> = {
            value: item,
        };

        // inserting at start, or head does not exist
        if (idx === 0 || !this.head) {
            this.prepend(item);
            return;
        }
        if (idx >= this.length) {
            this.append(item);
            return;
        }
        // get the current head as a reference
        let current = this.head;
        for (let i = 0; i < idx - 1; ++i) {
            current = current.next!; // we know that
        }
        //  0       1       2
        // [A] <-> [B] <-> [C]
        // go in between B & C
        // target 2
        //  0       1       (2 - 1)           3
        // [A] <-> [B] <-> [node] <-> [C]
        //          ^ current
        //                  node.next = current.next [C]
        //                  node.prev = current [B]
        //          B.next.prev = node
        //          [B].next(C)'s.prev = node
        //          [B].next = node
        node.next = current.next;
        node.prev = current;
        current.next!.prev = node;
        current.next = node;

        this.length++;
    }
    append(item: T): void {
        // adding to tail
        const node: Node<T> = {
            value: item,
        };
        if (!this.head) {
            // there is nothing []
            // so we can put the new node just at the head
            // [new Node]
            // ^ head
            this.head = node;
        } else {
            // we need to traverse until we reach the very end!
            let current = this.head;
            // keep moving forward until we no longer (current.next === undefined)
            while (current.next) {
                current = current.next;
            }
            // set the last Node [D] to the new node
            // [D] <-> [new node]
            // D.next = [new node]
            // [new node].prev = current (D)

            //  0       1       2
            // [A] <-> [B] <-> [C]
            //  ^ head
            //                  ^ newNode
            //                      newNode.prev = current
            //          ^ current
            //              current.next = newNode
            current.next = node;
            node.prev = current;
        }
        this.length++;
    }
    //  0       1       2
    // [A] <-> [B] <-> [C]
    // example: remove B
    // [A] <---------> [C]
    remove(item: T): T | undefined {
        // nothing to show
        if (!this.head) return undefined;

        // if head is the target
        // [A] <-> [B] <-> [C]
        // remove A
        if (this.head.value === item) {
            // [A] <-----> [B]
            // ^ head
            if (this.head.next) {
                // this.head.next [B]
                // [A] <-> [B]
                this.head.next.prev = undefined;
                // [A] -> [B]
                // B's prev is undefined, but [A] still has a next connection, but no reference to IT
                // so A will be garbo collected
            }

            this.head = this.head.next;
            this.length--;
            return item;
        }

        // we should iterate the list if the item is not Head
        // [A] <-> [B] <-> [C]
        // remove B

        // keep reference to head
        let current: Node<T> | undefined = this.head as Node<T> | undefined;

        // keep going until we reach the end of the list or the target
        // [A] <-> [B] <-> [C]
        // ^ current
        //         ^ current
        //                 ^ current
        while (current && current.value !== item) {
            current = current.next;
        }
        // [A] <-> [B] <-> [C]
        //                  ^ current
        if (current && current.value === item) {
            if (current.next) {
                // in this instance, imagine item is B
                // [A] <-> [B] <-> [C]
                //         ^ current

                // current.next [C]'s prev is now [A]
                current.next.prev = current.prev;
                // [A] <-> [C]
            }
            if (current.prev) {
                // [A] <-> [B] <-> [C]
                //         ^ current
                // current.prev [A]'s next is now [C]
                current.prev.next = current.next;
                // [A] <-> [C]
            }
            this.length--;
            return current.value;
        }

        // nothing found
        return undefined;
    }
    // 0       1       2
    // [A] <-> [B] <-> [C]
    // example: get C
    get(idx: number): T | undefined {
        // if the idx is lower than 0, undefined
        // if the idx is greater than or equal to the length, undefined
        if (idx < 0 || idx >= this.length) return undefined;
        // get the current head as a reference
        let current = this.head;

        // keep going until we reach the end of the list or the target
        // [A] <-> [B] <-> [C]
        // ^ current
        //         ^ current
        //                 ^ current
        for (let i = 0; i < idx && current; ++i) {
            current = current.next;
        }

        // return [C].value
        return current?.value;
    }
    // 0       1       2
    // [A] <-> [B] <-> [C]
    removeAt(idx: number): T | undefined {
        // if the idx is lower than 0, undefined
        // if the idx is greater than or equal to the length, undefined
        if (idx < 0 || idx >= this.length) return undefined;

        // if we want to remove the head
        if (idx === 0) {
            // Visual: Before removal
            // [A] <-> [B] <-> [C]
            // ^ head

            // keep reference to head
            const value = this.head?.value;
            // move head to the next node
            this.head = this.head?.next;
            // Visual: After removing [A]
            // [B] <-> [C]
            // ^ head
            if (this.head) {
                // [A] <-> [B] <-> [C]
                //          ^ head
                this.head.prev = undefined;
                // [B] <-> [C]
            }

            // subtract from length
            this.length--;
            return value;
        }

        // get the current head as a reference
        let current = this.head;

        // keep going until we reach the end of the list or the target
        // [A] <-> [B] <-> [C]
        // ^ current
        //         ^ current
        for (let i = 0; i < idx && current; ++i) {
            current = current.next;
        }

        // safety check, but this should never happen because of the boundary check above
        if (!current) return undefined;

        // store the value we want to remove
        const removedValue = current.value;

        // visual: Before removal
        // [A] <-> [B] <-> [C]
        //         ^ current
        if (current.prev) {
            // [A] <-> [B] <-> [C]
            //  ^ current.prev
            // point current.prev [A] to current.next [C]
            current.prev.next = current.next;
            // [A] <- [B] <-> [C]
            //  \--------------^
        }

        if (current.next) {
            // potential visual: Before removal
            // [A] <- [B] <-> [C]
            //  \--------------^
            current.next.prev = current.prev;
            // potential visual: After removal
            // [A] <-> [C]
        }

        this.length--;
        return removedValue;
    }
}
