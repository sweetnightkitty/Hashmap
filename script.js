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
                    entries.push(this.buckets[i]);
                }
            }
            
            return entries;
        }

    }
}





function createNode() {
    return {
        key: null,
        value: null,
        next: null,
    };
}

function createLinkedList() {
    return {
        firstNode: null, //by default

        lastNode: function() {
            let currentNode = this.firstNode;
            while(currentNode) {
                if(!currentNode.next) {
                    return currentNode;
                }
                currentNode = currentNode.next;
            }
        },

        head: function() {
            if(!this.firstNode) {
                return "List is empty";
            } else {
                return this.firstNode.value;
            }
        },

        //Appends new value but no linking
        append: function(key, value) {
            let newNode = createNode();
            newNode.key = key;
            newNode.value = value;

            if(!this.firstNode) {
                this.firstNode = newNode;
                return;
            }

            //iterate over the list - if the currentNode.key = key; replace value
            //if the key does not exist append

            let currentNode = this.firstNode;
            while(currentNode.next) {
                currentNode = currentNode.next
            }

            currentNode.next = newNode
        },


        tail: function() {
            let currentNode = this.firstNode;
            if(currentNode.next == null) {
                return currentNode.value;
            }

            while(currentNode) {
                if(currentNode.next == null) {
                    return currentNode.value;
                }
                currentNode = currentNode.next;
            }
        },

        size: function() {
            if(!this.firstNode) {
                return 0;
            }

            let currentNode = this.firstNode;
            let total = 0;
            while(currentNode) {
                total++;
                currentNode = currentNode.next;
            }
            return total;
        },


        //Checks if the key exists
        contains: function(key) {
            let currentNode = this.firstNode;

            while(currentNode) {
                if(currentNode.key == key) {
                    return true;
                }
                currentNode = currentNode.next
            }
            return false;
        },

        //Returns the node at that index
        at: function(index) {
            let currentNode = this.firstNode;
            const length = this.size();

            for(let i = 0; i < length; i++) {
                if(i == index) {
                    return currentNode;
                }
                currentNode = currentNode.next;

            }
            return undefined;

        },

        //Finds the index for that key
        find: function(key) {
            let currentNode = this.firstNode;
            const length = this.size();
            for(let i = 0; i < length; i++) {
                if(currentNode.key == key) {
                    return i;
                }
                currentNode = currentNode.next;
            }
            return null;
        },


        print: function() {
            let currentNode = this.firstNode;
            while(currentNode) {
                console.log(currentNode.value);
                currentNode = currentNode.next;
            }
        },

        toString: function() {
            let currentNode = this.firstNode;
            let string = "";
            while(currentNode) {
                if(currentNode.next) {
                    const value = `( ${currentNode.value} ) -> `;
                    string += value;
                } else {
                    const value = `( ${currentNode.value} ) -> null`;
                    string += value;
                }
                currentNode = currentNode.next;
            }
            console.log(string);
        },

        changeValue: function(index, value) {
            let currentNode = this.firstNode;
            const length = this.size();
            
            for(let i = 0; i < length; i++) {
                if(i == index) {
                    currentNode.value = value;
                }
                currentNode = currentNode.next;
            }
        },

        removeAt: function(index) {
            let currentNode = this.firstNode;
            const length = this.size();
            let leftNode;
            let targetNode;

            if(!this.firstNode) {
                return;
            } else if(index == 0) {
                this.firstNode = this.firstNode.next;
                return;
            }

            for(let i = 0; i < length; i++) {
                if(i == (index - 1)) {
                    leftNode = currentNode;
                };
                if(i == index) {
                    targetNode = currentNode;
                }
                currentNode = currentNode.next;
            }

            leftNode.next = targetNode.next;
        }

    }
}




const test = hashMap();
test.set("dog", "tramp");
test.set("god", "religion");

