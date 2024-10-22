function hashMap() {
    let buckets = new Array(16); // Array.apply(null, Array(16).map(function() {}));
    return {
        buckets: buckets,

        hash: function(key) {
            let hashCode = 0;
            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
                hashCode = primeNumber * hashCode + key.charCodeAt(i);
            }
            
            return hashCode % buckets.length;
        },

        set: function(key, value) {
            const index = this.hash(key);

            buckets[index] = value;
        }

    }
}

const hashing = hashMap();