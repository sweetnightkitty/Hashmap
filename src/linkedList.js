export function createLinkedList() {
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


function createNode() {
    return {
        key: null,
        value: null,
        next: null,
    };
}

