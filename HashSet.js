class Node {
    constructor(key, nextNode = null) {
        this.key = key;
        this.nextNode = nextNode;
    }
}

class HashMap {
    #loadFactor = 0.75;
    #capacity = 16;
    #bucket;

    constructor() {
        this.#bucket = new Array(this.#capacity).fill(null);
    }

    get capacity() {
        return this.#capacity;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }

        return hashCode;
    }

    set(key) {
        let hashCode = this.hash(key);
        let current = this.#bucket[hashCode];

        if (current === null) {
            // console.log(`It reached HashMap method 'set' if block`);
            // Just created new linked list with key and value as first node, no overwrite should happen
            this.#bucket[hashCode] = new Node(key);
        } else {
            // console.log(`It reached HashMap method 'set' else block`);
            while (current !== null) {
                if (current.nextNode === null) {
                    // console.log(`Creating new node with key '${key}' and value '${value}'.`);
                    let newNode = new Node(key);
                    current.nextNode = newNode;
                    break;
                }
                current = current.nextNode;
            }
        }

        if (this.length() > this.#capacity * this.#loadFactor) {
            this.#expand();
        }
    }

    #expand() {
        this.#capacity = this.#capacity * 2;
        let oldArray = this.#bucket;
        let newArray = new Array(this.#capacity).fill(null);
        this.#bucket = newArray;

        oldArray.forEach((current) => {
            while (current !== null) {
                this.set(current.key);
                current = current.nextNode;
            }
        });
    }

    has(key) {
        let hashCode = this.hash(key);
        let current = this.#bucket[hashCode];

        while (current !== null) {
            if (current.key === key) {
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }

    remove(key) {
        let hashCode = this.hash(key);
        let current = this.#bucket[hashCode];
        let previous = null;

        if (current === null) {
            return false;
        }
        if (current.key === key && previous === null) {
            this.#bucket[hashCode] = current.nextNode;
            return true;
        }
        while (current !== null) {
            if (current.key === key) {
                previous.nextNode = current.nextNode;
                return true;
            }
            previous = current;
            current = current.nextNode;
        }
        return false;
    }

    length() {
        let counter = 0;
        this.#bucket.forEach((current) => {
            while (current !== null) {
                counter++;
                current = current.nextNode;
            }
        });
        return counter;
    }

    clear() {
        this.#bucket = new Array(this.#capacity).fill(null);
    }

    keys() {
        let keysArr = [];
        this.#bucket.forEach((current) => {
            while (current !== null) {
                keysArr.push(current.key);
                current = current.nextNode;
            }
        });
        return keysArr;
    }

    entries() {
        let entriesArr = [];
        this.#bucket.forEach((current) => {
            while (current !== null) {
                entriesArr.push(current.key);
                current = current.nextNode;
            }
        });
        return entriesArr;
    }
}

// let hashMap = new HashMap(16);
// hashMap.set(`apple`, `red`);
// hashMap.set(`apple`, `red2`);
// hashMap.set(`banana`, `yellow`);
// hashMap.set(`mango`, `yellow`);
// hashMap.set(`guava`, `green`);
// hashMap.set(`orange`, `orange`);
// hashMap.set(`lemon`, `yellow`);
// hashMap.set(`tomato`, `red`);
// hashMap.set(`grapes`, `purple`);
// hashMap.set(`watermelon`, `green`);
// hashMap.set(`cherry`, `red`);
// hashMap.set(`blueberry`, `purple`);
// hashMap.set(`pineapple`, `orange`);
// hashMap.set(`rambutan`, `red`);

// console.log(hashMap.get(`apple`));
// // hashMap.clear();
// console.log(hashMap.length());
// console.log(hashMap.keys());
// console.log(hashMap.values());
// console.log(hashMap.entries());
// console.log("Capacity is: " + hashMap.capacity);

const test = new HashMap(); // or HashMap() if using a factory
test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.set("moon");

test.set("apple");
test.set("moon");
console.log(test.has("apple"));
console.log(test.has("moon"));

console.log(test.remove("moon"));

console.log("Length is: " + test.length());
console.log("Capacity is: " + test.capacity);
console.log(test.entries());
