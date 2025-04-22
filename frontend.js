const chatList = document.getElementById('chatList');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const searchInput = document.querySelector('.search-input');

let activeChat = null;
let allChats = [];

async function fetchChats() {
    try {
        const response = await fetch('http://localhost:3000/api/chats');
        if (!response.ok) {
            throw new Error('Failed to fetch chats');
        }
        allChats = await response.json();
        if (allChats.length > 0) {
            activeChat = allChats[0];
            renderChatList();
            renderMessages();
            updateChatHeader();
        }
    } catch (error) {
        console.error('Error fetching chats:', error);
        allChats = getSampleChats();
        if (allChats.length > 0) {
            activeChat = allChats[0];
            renderChatList();
            renderMessages();
            updateChatHeader();
        }
    }
}

function getSampleChats() {
    return [
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
    ];
}


function renderChatList(searchTerm = '') {
    chatList.innerHTML = '';
    const filteredChats = searchTerm 
        ? allChats.filter(chat => 
            chat.name.toLowerCase().includes(searchTerm.toLowerCase())
         ): allChats;

    filteredChats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${chat.unread ? 'unread' : ''}`;
        chatItem.innerHTML = `
            <div class="chat-avatar">${chat.avatar}</div>
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">${chat.lastMessage}</div>
            </div>
            <div class="chat-time">${chat.time}</div>
        `;
        chatItem.addEventListener('click', async () => {
            activeChat = chat;
            if (chat.unread) {
                chat.unread = false;
                await markChatAsRead(chat.id);
            }
            renderMessages();
            updateChatHeader();
        });
        chatList.appendChild(chatItem);
    });
}

async function markChatAsRead(chatId) {
    try {
        await fetch(`http://localhost:3000/api/chats/${chatId}/read`, {
            method: 'PATCH'
        });
    } catch (error) {
        console.error('Error marking chat as read:', error);
    }
}

function renderMessages() {
    chatMessages.innerHTML = '';
    if (!activeChat) return;

    activeChat.messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div>${message.text}</div>
            <div class="message-time">${message.time}</div>
        `;
        chatMessages.appendChild(messageDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateChatHeader() {
    const chatHeader = document.querySelector('.chat-header');
    if (!activeChat) return;

    chatHeader.innerHTML = `
        <div class="chat-avatar">${activeChat.avatar}</div>
        <div style="flex: 1; margin-left: 12px;">
            <div style="font-weight: 500;">${activeChat.name}</div>
            <div style="font-size: 12px; color: #667781;">
                ${activeChat.name === 'Meta AI' ? 'online' : 'last seen today'} 
                <span class="status-indicator ${activeChat.name === 'Meta AI' ? 'online' : 'offline'}"></span>
            </div>
        </div>
        <div style="margin-left: auto;">⋮</div>
    `;
}

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !activeChat) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMessage = {
        text: text,
        time: timeString,
        sent: true
    };

    try {
        activeChat.messages.push(newMessage);
        activeChat.lastMessage = text;
        activeChat.time = timeString;
        renderMessages();
        renderChatList();
        messageInput.value = '';

        const response = await fetch(`http://localhost:3000/api/chats/${activeChat.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const updatedChat = await response.json();
        activeChat = updatedChat;
        allChats = allChats.map(c => c.id === updatedChat.id ? updatedChat : c);
        
        if (activeChat.name === 'Meta AI') {
            setTimeout(async () => {
                const replies = [
                    "I understand. Is there anything else I can help with?",
                    "That's interesting! Tell me more.",
                    "How does that make you feel?",
                    "I'm here to assist you with any questions.",
                    "Thanks for sharing that with me."
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                
                const replyMessage = {
                    text: randomReply,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    sent: false
                };

                activeChat.messages.push(replyMessage);
                activeChat.lastMessage = randomReply;
                renderMessages();
                renderChatList();

                await fetch(`http://localhost:3000/api/chats/${activeChat.id}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(replyMessage)
                });
            }, 1000);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        activeChat.messages.pop();
        renderMessages();
        alert('Failed to send message. Please try again.');
    }
}

searchInput.addEventListener('input', (e) => {
    renderChatList(e.target.value);
});

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.querySelector('.notification-link').addEventListener('click', async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            alert('Desktop notifications enabled!');
        } else {
            alert('Please enable notifications in your browser settings.');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetchChats();
    
    setInterval(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/chats');
            if (response.ok) {
                const updatedChats = await response.json();
                allChats = updatedChats;
                if (activeChat) {
                    activeChat = updatedChats.find(c => c.id === activeChat.id) || activeChat;
                }
                renderChatList(searchInput.value);
                if (activeChat) {
                    renderMessages();
                }
            }
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    }, 5000); 
});