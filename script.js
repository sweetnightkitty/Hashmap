function hashMap() {
    let defaultArray = new Array(16); // Array.apply(null, Array(16).map(function() {}));
    return {
        buckets: defaultArray,

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

            //how to compare this key, to the key at the index, if that index exists
            this.buckets[index] = value;
        },

        get: function(key) {
            const index = this.hash(key);

            if(this.buckets[index]) {
                return this.buckets[index];
            } else {
                return null;
            }
        },

        has: function(key) {
            const index = this.hash(key);

            if(this.buckets[index]) {
                return true;
            } else {
                return false;
            }
        }

    }
}

const hashing = hashMap();
