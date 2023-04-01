// entry point for the application
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const productsRoutes = require('./routes/productsRoutes');
const filesRoutes = require('./routes/filesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Routes
app.get('/', (req, res) => {
    res.send('Plantis API');
});

app.use('/api/products', productsRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/categories', categoriesRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});