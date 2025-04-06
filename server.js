const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const messagesFile = path.join(__dirname, 'src', 'messages.json');

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const data = await fs.readFile(messagesFile, 'utf8');
    const messages = JSON.parse(data);
    res.json(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ error: 'Error reading messages' });
  }
});

// Add a new message
app.post('/api/messages', async (req, res) => {
  try {
    const data = await fs.readFile(messagesFile, 'utf8');
    const messages = JSON.parse(data);
    const newMessage = req.body;
    messages.push(newMessage);
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Error saving message' });
  }
});

// Delete a message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const data = await fs.readFile(messagesFile, 'utf8');
    let messages = JSON.parse(data);
    messages = messages.filter(msg => msg.id !== req.params.id);
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Error deleting message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 