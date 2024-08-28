const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db');

const User = require('./models/User.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

// Get all users
app.get("/products", async(req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
});

// Get a specific user by ID
app.get("/products/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Error fetching user");
    }
});

// Add a new user
app.post("/products", async(req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send("Error adding user");
    }
});

// Update a user by ID
app.put("/products/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Error updating user");
    }
});

// Partially update a user by ID
app.patch("/products/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Error updating user");
    }
});

// Delete a user by ID
app.delete("/products/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.sendStatus(200);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Error deleting user");
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});