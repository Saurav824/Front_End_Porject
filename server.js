const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let chats = [
    {
        id: 1,
        name: "Meta AI",
        lastMessage: "Hello! How are you today?",
        time: "2/10/2025",
        unread: false,
        avatar: "M",
        messages: [
            { id: 1, text: "Hello! How are you today?", time: "2:45 PM", sent: false },
            { id: 2, text: "I'm doing well, thanks for asking!", time: "2:46 PM", sent: true },
            { id: 3, text: "How can I assist you today?", time: "2:46 PM", sent: false }
        ]
    },
    {
        id: 2,
        name: "Ujwal",
        lastMessage: "Thank you 😊",
        time: "2/9/2025",
        unread: true,
        avatar: "U",
        messages: [
            { id: 1, text: "Hey, can you help me with something?", time: "2:30 PM", sent: false },
            { id: 2, text: "Sure, what do you need?", time: "2:31 PM", sent: true },
            { id: 3, text: "Thank you 😊", time: "2:32 PM", sent: false }
        ]
    },
    {
        id: 3,
        name: "Dr.SPR Faculty Group",
        lastMessage: "~PRAVIN: 💤️ Dean All, PFA the Tomorrow's(Feb 08, ...)",
        time: "2/8/2025",
        unread: false,
        avatar: "D",
        messages: [
            { id: 1, text: "~PRAVIN: Meeting tomorrow at 10 AM", time: "9:00 AM", sent: false },
            { id: 2, text: "~JOHN: I'll be there", time: "9:05 AM", sent: false },
            { id: 3, text: "~PRAVIN: 💤️ Dean All, PFA the Tomorrow's(Feb 08, ...)", time: "9:10 AM", sent: false }
        ]
    },
    {
        id: 4,
        name: "Dhanush",
        lastMessage: "Hey there! Thank you for showing interest in our Re...",
        time: "2/7/2025",
        unread: false,
        avatar: "P",
        messages: [
            { id: 1, text: "Hey there! Thank you for showing interest in our Re...", time: "11:00 AM", sent: false }
        ]
    },
    {
        id: 5,
        name: "Manjunath",
        lastMessage: "How was your experience with us?",
        time: "2/4/2025",
        unread: false,
        avatar: "P",
        messages: [
            { id: 1, text: "Your policy has been renewed", time: "10:00 AM", sent: false },
            { id: 2, text: "How was your experience with us?", time: "10:05 AM", sent: false }
        ]
    }
];


app.get('/api/chats', (req, res) => {
    res.json(chats);
});

app.get('/api/chats/:id', (req, res) => {
    const chat = chats.find(c => c.id === parseInt(req.params.id));
    if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
    }
    res.json(chat);
});

app.patch('/api/chats/:id/read', (req, res) => {
    const chat = chats.find(c => c.id === parseInt(req.params.id));
    if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
    }
    chat.unread = false;
    res.json(chat);
});

app.post('/api/chats/:id/messages', (req, res) => {
    const chat = chats.find(c => c.id === parseInt(req.params.id));
    if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
    }

    const newMessage = {
        id: chat.messages.length + 1,
        text: req.body.text,
        time: req.body.time,
        sent: req.body.sent
    };

    chat.messages.push(newMessage);
    chat.lastMessage = newMessage.text;
    chat.time = new Date().toLocaleDateString();
    
    if (!newMessage.sent) {
        chat.unread = true;
    }

    res.json(chat);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});