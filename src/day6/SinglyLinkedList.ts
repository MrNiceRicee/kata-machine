type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    // [A]0 --> [B]1 --> [C]2 --> [D]3
    // this function will add a new node to the start of the list
    // [newNode]0 --> [A]1 --> [B]2 --> [C]3 --> [D]4
    prepend(item: T): void {
        const node: Node<T> = {
            value: item,
        };

        // if the list is empty
        if (!this.head) {
            this.head = node;
            this.length++;
            return;
        }

        // [A]0 --> [B]1 --> [C]2 --> [D]3
        // ^ head
        // [newNode]0 --> [A]1 --> [B]2 --> [C]3 --> [D]4
        // ^ head
        // set newNode.next to the current head
        node.next = this.head;
        // set head to the newNode
        this.head = node;
        // increment length
        this.length++;
    }
    // [A]0 --> [B]1 --> [C]2 --> [D]3
    insertAt(item: T, idx: number): void {
        // check if idx is out of bounds
        if (idx < 0 || idx > this.length) {
            return undefined;
        }

        const node: Node<T> = {
            value: item,
        };

        // inserting at start, or head does not exist
        if (idx === 0 || !this.head) {
            this.prepend(item);
            return;
        }

        // get the current head as a reference
        let current = this.head;

        // iterate to the node at idx - 1
        // ex: idx = 2
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        // ^ current
        //         ^ current, we will stop here. idx - 1 = 1
        for (let i = 0; i < idx - 1 && current && current.next; ++i) {
            current = current.next;
        }

        if (!current || !current.next) {
            return undefined;
        }

        // before insertion
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //         ^ current
        node.next = current.next;
        current.next = node;
        // after insertion
        // [A]0 --> [B]1 --> [node]2 --> [C]3 --> [D]4
        //         ^ current     ^ node.next = current.next
        //         ^    current.next = node
        this.length++;
    }
    // [A]0 --> [B]1 --> [C]2 --> [D]3
    // this function will add a new node to the end of the list
    // [A]0 --> [B]1 --> [C]2 --> [D]3 --> [newNode]4
    append(item: T): void {
        const node: Node<T> = {
            value: item,
        };
        // base case, if the list is empty
        if (!this.head) {
            this.head = node;
            this.length++;
            return;
        }

        // get the current head as a reference
        let current = this.head;
        // iterate to the last node
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        // ^ current
        //         ^ current
        //                   ^ current
        //                           ^ current
        while (current.next) {
            current = current.next;
        }
        // visual: After iteration
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //                           ^ current
        // set current [D].next to the new node
        current.next = node;
        // [A]0 --> [B]1 --> [C]2 --> [D]3 --> [newNode]4
        // increment length
        this.length++;
    }
    // [A]0 --> [B]1 --> [C]2 --> [D]3
    remove(item: T): T | undefined {
        // base case if the list is empty
        if (!this.head) {
            return undefined;
        }

        // if the head is the target
        if (this.head.value === item) {
            // keep a reference to the head
            const removeValue = this.head.value;
            // before removal
            // [A] --> [B] --> [C] --> [D]
            // ^ head
            // remove A
            // set head to point to the next note
            this.head = this.head.next;
            // after removal
            // [B] --> [C] --> [D]

            // decrement length
            this.length--;
            return removeValue;
        }

        // get the current head as a reference
        let current = this.head;
        // iterate to the node before the target
        // we will keep iterating
        // while the next node exist & if the next node's value is not the target
        // target = C
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        // ^ current
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //         ^ current
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //         ^ current, current[next] is [C], so we stop iterating
        while (current.next && current.next.value !== item) {
            current = current.next;
        }

        // if we reach the end of the list and we did not find the target
        if (current.next === undefined || current.next.value !== item) {
            return undefined;
        }
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //        ^ current, we will be removing [C]

        // keep a reference to the removed value
        const removedValue = current.next.value;

        current.next = current.next.next;
        this.length--;

        return removedValue;
    }

    // [A] --> [B] --> [C] --> [D]
    //  0       1       2       3
    get(idx: number): T | undefined {
        // if idx is out of bounds, return undefined
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        // get the current head as a reference
        let current = this.head;

        // target idx = 2
        // iterate to the node at idx
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        // ^ current
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //         ^ current
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //                   ^ current: target found
        for (let i = 0; i < idx && current; ++i) {
            current = current.next;
        }
        // visual: After iteration
        // [A]0 --> [B]1 --> [C]2 --> [D]3
        //                    ^ current: target found

        // return the value at idx [C]
        return current?.value;
    }
    // [A] --> [B] --> [C] --> [D]
    //  0       1       2       3
    removeAt(idx: number): T | undefined {
        // out of bounds check
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        // if idx is 0, return head
        if (idx === 0) {
            // [A] --> [B] --> [C] --> [D]
            // ^ head
            // remove A
            // keep a link to head
            const head = this.head;
            // set head to point to the next note
            // [A] --> [B] --> [C] --> [D]
            //         ^ head
            this.head = this.head?.next;
            // decrement length
            this.length--;
            return head?.value;
        }

        let current = this.head;
        // iterate to the node at idx - 1
        // 0       1       2       3
        // [A] --> [B] --> [C] --> [D]
        //         ^ current
        //        idx = 2 -> idx - 1 = 1
        for (let i = 0; i < idx - 1 && current; ++i) {
            current = current.next;
        }

        // if current is undefined,
        if (!current || !current.next) {
            return undefined;
        }

        const removedValue = current.next.value;
        // visual: Before removal
        // example: remove C
        // [A] --> [B] --> [C] --> [D]
        //        ^ current
        // [B].current next should point to [C]'s next which is [D]
        current.next = current.next.next;
        // visual: After removal
        // [A] --> [B] --> [D]
        //        ^ current

        this.length--;
        return removedValue;
    }
}
