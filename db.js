const mongoose = require('mongoose');

// Replace the old connection code
mongoose.connect('mongodb://localhost:27017/products', {
        // Remove deprecated options
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));