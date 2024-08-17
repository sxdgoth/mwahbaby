// File: UserManager.js

const UserManager = {
    users: {},
    currentUser: null,

    initialize: function() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        }
        this.currentUser = localStorage.getItem('currentUser');
    },

   createUser: function(username, password) {
    console.log('Creating user:', username); // Debug log
    if (!this.users[username]) {
        this.users[username] = {
            password: password,
            coins: 1000,
            inventory: [],
            avatarState: {
                appliedItems: [],
                skinTone: avatarConfig.skinTones[0]
            }
        };
        this.saveUsers();
        console.log('User created successfully'); // Debug log
    }
    return this.users[username];
},
    
    getCurrentUser: function() {
        return this.currentUser;
    },

    setCurrentUser: function(username) {
        this.currentUser = username;
        localStorage.setItem('currentUser', username);
    },

    getUserCoins: function(username) {
        return this.users[username] ? this.users[username].coins : 0;
    },

    setUserCoins: function(username, amount) {
        if (this.users[username]) {
            this.users[username].coins = amount;
            this.saveUsers();
        }
    },

  addItemToUserInventory: function(username, itemId) {
    if (this.users[username]) {
        if (!this.users[username].inventory) {
            this.users[username].inventory = [];
        }
        if (!this.users[username].inventory.includes(itemId)) {
            this.users[username].inventory.push(itemId);
            this.saveUsers();
        }
    }
},

getUserInventory: function(username) {
    return this.users[username] ? this.users[username].inventory || [] : [];
},

    getUserAvatarState: function(username) {
        return this.users[username] ? this.users[username].avatarState : null;
    },

    setUserAvatarState: function(username, avatarState) {
        if (this.users[username]) {
            this.users[username].avatarState = avatarState;
            this.saveUsers();
        }
    },

    saveUsers: function() {
        localStorage.setItem('users', JSON.stringify(this.users));
    },

  registerUser: function(username, password) {
    console.log('Registering user:', username); // Debug log
    if (!this.users[username]) {
        console.log('Creating new user'); // Debug log
        this.createUser(username, password);
        this.setCurrentUser(username);
        console.log('User registered successfully'); // Debug log
        return true;
    }
    console.log('User already exists'); // Debug log
    return false; // User already exists
},

    loginUser: function(username, password) {
        if (this.users[username] && this.users[username].password === password) {
            this.setCurrentUser(username);
            return true;
        }
        return false; // Invalid username or password
    },

    logoutUser: function() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
};

// Initialize UserManager
if (typeof UserManager !== 'undefined') {
    UserManager.initialize();
} else {
    console.error('UserManager is not defined. Make sure UserManager.js is loaded before logged.js');
}
