const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// API endpoint to get MCQs by topic
app.get('/api/mcqs', (req, res) => {
    const topic = req.query.topic;
    
    // Path to your Python script
    const pythonScript = path.join(__dirname, 'mcq.py');
    
    // Create Python process
    const pythonProcess = spawn('python', [pythonScript, topic]);
    
    let mcqs = [];
    
    // Collect data from Python script
    pythonProcess.stdout.on('data', (data) => {
        try {
            const mcqData = JSON.parse(data.toString());
            mcqs.push(mcqData);
        } catch (error) {
            console.error('Error parsing MCQ data:', error);
        }
    });
    
    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
        res.status(500).json({ error: 'Error processing request' });
    });
    
    // When Python process completes
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        res.json(mcqs);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 