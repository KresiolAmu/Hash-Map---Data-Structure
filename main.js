class Node {
    constructor(value, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class HashMap {
    constructor(loadFactor, capacity) {
        if (
            loadFactor === null ||
            loadFactor === undefined ||
            capacity === null ||
            capacity === undefined
        )
            return `Load factor must not be null`;
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.bucket = new Array(this.capacity).fill(null);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let hashCode = hash(key);

        if (this.bucket[hashCode] === null) {
            let linkedList = new Node();
        }
    }
}

// let myArray = [];

// myArray.push({ a: "b" });
// console.log(myArray);
