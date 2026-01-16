class Node {
    constructor(key, value, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

// class LinkedList {
//     constructor(key, value) {
//         this.node = new Node(key, value);
//     }

//     setNode(key, value) {
//         let current = this.node;
//         while (current !== null) {
//             console.log(current.key);
//             if (current.key === key) {
//                 console.log(
//                     `Changing ${current.key}'s current value of '${current.value}'to '${value}'.`
//                 );
//                 current.value = value;
//             } else if (current.nextNode === null) {
//                 console.log(
//                     `Creating new node with key '${key}' and value '${value}'.`
//                 );
//                 let newNode = new Node(key, value);
//                 current.nextNode = newNode;
//                 break;
//             }
//             current = current.nextNode;
//         }
//     }

//     getNode(key) {
//         let current = this.node;
//         while (current !== null) {
//             if (current.key === key) {
//                 return current.value;
//             }
//             current = current.nextNode;
//         }
//         return null;
//     }

//     hasNode() {}
// }

class HashMap {
    constructor(capacity) {
        if (capacity === null || capacity === undefined) return `Must insert HashMap size, recommended is 16`;
        this.loadFactor = 0.75;
        this.capacity = capacity ?? 16;
        this.bucket = new Array(this.capacity).fill(null);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let hashCode = this.hash(key);
        let current = this.bucket[hashCode];

        if (current === null) {
            console.log(`It reached HashMap method 'set' if block`);
            // Just created new linked list with key and value as first node, no overwrite should happen
            this.bucket[hashCode] = new Node(key, value);
        } else {
            console.log(`It reached HashMap method 'set' else block`);
            while (current !== null) {
                if (current.key === key) {
                    console.log(`Changing ${current.key}'s current value of '${current.value}'to '${value}'.`);
                    current.value = value;
                } else if (current.nextNode === null) {
                    console.log(`Creating new node with key '${key}' and value '${value}'.`);
                    let newNode = new Node(key, value);
                    current.nextNode = newNode;
                    break;
                }
                current = current.nextNode;
            }
        }
    }

    get(key) {
        let hashCode = this.hash(key);
        let current = this.bucket[hashCode];

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
        let current = this.bucket[hashCode];
        let previous = null;

        if (current === null) {
            return false;
        }
        if (current.key === key && previous === null) {
            this.bucket[hashCode] = current.nextNode;
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

    length() {}
}

let hashMap = new HashMap(16);
hashMap.set(`apple`, `red`);
hashMap.set(`apple`, `red2`);
console.log(hashMap.get(`apple`));

// let myArray = [];
// myArray.push({ a: "b" });
// console.log(myArray);
