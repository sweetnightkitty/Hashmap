function hashMap() {
    const defaultArray = new Array(16); // Array.apply(null, Array(16).map(function() {}));

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
            const newEntry = this.newKeyValue();
            newEntry.key = key;
            newEntry.value = value;

            if (index < 0 || index >= this.buckets.length) {
                throw new Error("Trying to access index out of bound");
            }
              
            if(this.buckets[index] && this.buckets[index].key != key) {
                throw new Error(`Collision with a pre-existing key ${this.buckets[index].key} at index ${index}`);
            } else {
                this.buckets[index] = newEntry;
            }

            const capacity = this.buckets.length;
            const numOfBuckets = this.length();

            if(numOfBuckets > capacity * this.loadFactor) {
                this.buckets.length = capacity * 2;
            }
        },

        get: function(key) {
            const index = this.hash(key);

            if (index < 0 || index >= this.buckets.length) {
                throw new Error("Trying to access index out of bound");
            }
              
            if(this.buckets[index]) {
                return this.buckets[index].value;
            } else {
                return null;
            }
        },

        has: function(key) {
            const index = this.hash(key);

            if (index < 0 || index >= this.buckets.length) {
                throw new Error("Trying to access index out of bound");
            }
              
            if(this.buckets[index] && this.buckets[index].key == key) {
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
              
            if(this.buckets[index] && this.buckets[index].key == key) {
                delete this.buckets[index];
                return true;
            } else {
                return false;
            }
        },

        //How many entries exist in the hashmap
        length: function() {
            let length = 0;
            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    length++;
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
                    keys.push(this.buckets[i].key);
                }
            }
            return keys;
        },

        values: function() {
            const values = [];

            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    values.push(this.buckets[i].value);
                }
            }

            return values;
        },

        entries: function() {
            const entries = [];

            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    entries.push(this.buckets[i]);
                }
            }
            
            return entries;
        }

    }
}

const test = hashMap();
