import { createLinkedList } from "./linkedList.js";

export function hashMap() {
    let capacity = 16;
    const defaultArray = new Array(capacity); // Array.apply(null, Array(16).map(function() {}));

    return {
        buckets: defaultArray,

        newKeyValue: function() {
            const template = {
                key: undefined,
                value: undefined,
            }
            return template;
        },

        hash: function(key) {
            let hashCode = 0;
            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
                hashCode = primeNumber * hashCode + key.charCodeAt(i);
                hashCode = hashCode % this.buckets.length;
            }
            
            return hashCode;
        },

        set: function(key, value) {
            const index = this.hash(key); 

            //Immediately appends the head when the bucket is empty
            if(!this.buckets[index]) {
                const list = createLinkedList()
                list.append(key, value);
                this.buckets[index] = list;
            } else if(this.buckets[index] && this.buckets[index].contains(key)) {
                    const listIndex = this.buckets[index].find(key);
                    this.buckets[index].changeValue(listIndex, value);
            } else {
                    this.buckets[index].append(key, value);
            }

            //capacity = length of the array - default 16; want to grow it by 2s
            const nodes = this.entries();
            if(nodes.length > capacity * this.loadFactor) {
                capacity *= 2;
                this.buckets = new Array(capacity);

                for(let i = 0; i < nodes.length; i++) {
                    const thisKey = nodes[i].key;
                    const thisValue = nodes[i].value;
                    this.set(thisKey, thisValue);
                }
            }


        },

        get: function(key) {
            const index = this.hash(key);

            if (index < 0 || index >= this.buckets.length) {
                throw new Error("Trying to access index out of bound");
            }
              
            if(this.buckets[index] && this.buckets[index].contains(key)) {
                const listIndex = this.buckets[index].find(key);
                const node = this.buckets[index].at(listIndex);
                return node.value;
            } else {
                return null;
            }
        },

        has: function(key) {
            const index = this.hash(key);

            if (index < 0 || index >= this.buckets.length) {
                throw new Error("Trying to access index out of bound");
            }

            if(this.buckets[index] && this.buckets[index].contains(key)) {
                return true;
            } else {
                return false;
            }

        },

        remove: function(key) {
            const index = this.hash(key);

            if (index < 0 || index >= this.buckets.length) {
                throw new Error("Trying to access index out of bound");
            }
              
            if(this.buckets[index] && this.buckets[index].contains(key)) {
                const listIndex = this.buckets[index].find(key);
                if(listIndex == 0 && this.buckets[index].size() == 1) {
                    delete this.buckets[index];
                } else {
                    this.buckets[index].removeAt(listIndex);
                }
                return true;
            } else {
                return false;
            }
        },

        //How many entries exist in the hashmap, regardless of if they are stored in linked lists or not
        length: function() {
            let length = 0;
            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    length += this.buckets[i].size();
                }
            }
            return length;
        },

        loadFactor: 0.75,

        clear: function() {
            for(let i = 0; i < defaultArray.length; i++) {
                delete defaultArray[i];
            }
            this.buckets = defaultArray;
        },

        keys: function() {
            const keys = [];

            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    const listLength = this.buckets[i].size();
                    for(let j = 0; j < listLength; j++) {
                        keys.push(this.buckets[i].at(j).key);
                    }
                }
            }
            return keys;
        },

        values: function() {
            const values = [];

            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    const listLength = this.buckets[i].size();
                    for(let j = 0; j < listLength; j++) {
                        values.push(this.buckets[i].at(j).value);
                    }
                }
            }
            return values;
        },

        entries: function() {
            const entries = [];

            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    const listLength = this.buckets[i].size();
                    for(let j = 0; j < listLength; j++) {
                        entries.push(this.buckets[i].at(j));
                    }
                }
            }
            
            return entries;
        }

    }
}




