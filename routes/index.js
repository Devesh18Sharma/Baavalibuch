app.get('/', async (req, res) => {
    connectionCount++;
  
    // Insert into LogEntry model
    const newLog = new LogEntry({ message: `Connection made: ${connectionCount}` });
    await newLog.save();
    
    res.send(`Connected ${connectionCount} times`);
  });
  
  app.post('/send-text', async (req, res) => {
    const { text } = req.body;
  
    // Insert into TextEntry model
    const newText = new TextEntry({ text });
    await newText.save();
    
    // Call Django API
    try {
      const response = await axios.get('http://localhost:8000/api/ngrams');
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error contacting Django API' });
    }
  });
  