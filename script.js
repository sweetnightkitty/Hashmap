function hashMap() {
    const defaultArray = new Array(16); // Array.apply(null, Array(16).map(function() {}));
    const keys = [];
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
            const primeNumber = 49;
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

            if(this.buckets[index] && this.buckets[index].key != key) {
                throw new Error(`Collision with a pre-existing key ${this.buckets[index].key} at index ${index}`);
            } else {
                this.buckets[index] = newEntry;
            }
        },

        get: function(key) {
            const index = this.hash(key);

            if(this.buckets[index]) {
                return this.buckets[index].value;
            } else {
                return null;
            }
        },

        has: function(key) {
            const index = this.hash(key);

            if(this.buckets[index] && this.buckets[index].key == key) {
                return true;
            } else {
                return false;
            }

        },

        remove: function(key) {
            const index = this.hash(key);

            if(this.buckets[index] && this.buckets[index].key == key) {
                delete this.buckets[index];
                return true;
            } else {
                return false;
            }
        },

        length: function() {
            let length = 0;
            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[i]) {
                    length++;
                }
            }
            return length;
        },

        clear: function() {
            for(let i = 0; i < defaultArray.length; i++) {
                delete defaultArray[i];
            }
            this.buckets = defaultArray;
        },

    }
}

const hashing = hashMap();
