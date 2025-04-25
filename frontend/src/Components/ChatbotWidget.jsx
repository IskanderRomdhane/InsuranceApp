import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'bot', message: 'Hello! How can I help you today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!message.trim()) return;

        // Add user message to chat
        const userMessage = message;
        setChatHistory(prev => [...prev, { sender: 'user', message: userMessage }]);
        setMessage('');
        setIsLoading(true);

        try {
            // Create URL with properly encoded parameter
            const url = `http://localhost:8081/api/chatbot/send-message?userMessage=${encodeURIComponent(userMessage)}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            // Handle the response based on your backend's response structure
            let botResponse = 'Sorry, I couldn\'t process your request.';

            if (data && (data.answer || data.response)) {
                botResponse = data.answer || data.response;
            }

            setChatHistory(prev => [...prev, {
                sender: 'bot',
                message: botResponse
            }]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory(prev => [...prev, {
                sender: 'bot',
                message: 'Sorry, there was an error connecting to the chat service. Please try again later.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to test connection with API
    const testConnection = async () => {
        try {
            const response = await fetch('/api/chatbot/send-message?userMessage=test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log('Connection to chatbot API successful');
            } else {
                console.error('Connection to chatbot API failed with status:', response.status);
            }
        } catch (error) {
            console.error('Could not connect to chatbot API:', error);
        }
    };

    // Test connection when widget opens
    useEffect(() => {
        if (isOpen) {
            testConnection();
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
            {isOpen && (
                <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden border border-gray-200">
                    <div className="bg-blue-600 text-white p-3 font-medium flex justify-between items-center">
                        <span>Chat Support</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 text-xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`mb-3 ${chat.sender === 'user' ? 'text-right' : ''}`}
                            >
                                <div
                                    className={`inline-block rounded-lg px-4 py-2 max-w-xs break-words ${
                                        chat.sender === 'user' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-200 text-gray-800'
                                    }`}
                                >
                                    {chat.message}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="mb-3">
                                <div className="inline-block rounded-lg px-4 py-2 bg-gray-200 text-gray-800">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !message.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg px-3 py-2 disabled:bg-blue-400"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-105"
                aria-label="Open chat"
            >
                <MessageSquare size={24} />
            </button>
        </div>
    );
}
