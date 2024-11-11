const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all origins
app.use(cors());

// Add JSON body parser middleware
app.use(express.json());

// Proxy route to forward requests to Ollama
app.use('/v1/*', async (req, res) => {
    console.log(`Forwarding request to Ollama: ${req.method} ${req.originalUrl}`);
    try {
        const ollamaResponse = await axios({
            method: req.method,
            url: `http://localhost:11434${req.originalUrl}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json',
                // Include only essential headers
                'Authorization': req.headers['authorization'] || '',
            },
        });
        console.log("Ollama Response:", ollamaResponse.data); // Log response from Ollama for debugging
        res.json(ollamaResponse.data);
    } catch (error) {
        console.error("Error forwarding request:", error); // Log errors for debugging
        res.status(error.response?.status || 500).json(error.response?.data || { error: "Unknown error" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
