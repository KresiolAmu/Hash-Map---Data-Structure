class Node {
    constructor(key, value, nextNode = null) {
        this.key = key;
        this.value = value;
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

    set(key, value) {
        let hashCode = this.hash(key);
        let current = this.#bucket[hashCode];

        if (current === null) {
            // console.log(`It reached HashMap method 'set' if block`);
            // Just created new linked list with key and value as first node, no overwrite should happen
            this.#bucket[hashCode] = new Node(key, value);
        } else {
            // console.log(`It reached HashMap method 'set' else block`);
            while (current !== null) {
                if (current.key === key) {
                    // console.log(`Changing ${current.key}'s current value of '${current.value}'to '${value}'.`);
                    current.value = value;
                } else if (current.nextNode === null) {
                    // console.log(`Creating new node with key '${key}' and value '${value}'.`);
                    let newNode = new Node(key, value);
                    current.nextNode = newNode;
                    break;
                }
                current = current.nextNode;
            }
        }

        if (this.length() > this.#capacity * this.#loadFactor) {
            this.expand();
        }
    }

    expand() {
        this.#capacity = this.#capacity * 2;
        let oldArray = this.#bucket;
        let newArray = new Array(this.#capacity).fill(null);
        this.#bucket = newArray;

        oldArray.forEach((current) => {
            while (current !== null) {
                this.set(current.key, current.value);
                current = current.nextNode;
            }
        });
    }

    get(key) {
        let hashCode = this.hash(key);
        let current = this.#bucket[hashCode];

        while (current !== null) {
            if (current.key === key) {
                return current.value;
            }
            current = current.nextNode;
        }
        return null;
    }

    has(key) {
        return this.get(key) !== null;
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

    values() {
        let valuesArr = [];
        this.#bucket.forEach((current) => {
            while (current !== null) {
                valuesArr.push(current.value);
                current = current.nextNode;
            }
        });
        return valuesArr;
    }

    entries() {
        let entriesArr = [];
        this.#bucket.forEach((current) => {
            while (current !== null) {
                entriesArr.push([current.key, current.value]);
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
// console.log("#capacity is: " + hashMap.#capacity);

const test = new HashMap(); // or HashMap() if using a factory
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

test.set("apple", "red2");
test.set("moon", "silver2");
console.log(test.get("apple"));
console.log(test.get("moon"));

console.log(test.remove("moon"));

console.log("Length is: " + test.length());
console.log("#capacity is: " + test.capacity);
console.log(test.entries());
