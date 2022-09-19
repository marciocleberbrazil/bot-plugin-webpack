import ChatBotMessage from './components/chat-bot-message/chat-bot-message';
import ChatBot from './components/chat-bot/chat-bot';

let customElementRegistry = window.customElements;

// Register components
customElementRegistry.define('chat-bot-message', ChatBotMessage);
customElementRegistry.define('chat-bot', ChatBot);

const chatBot = document.createElement('chat-bot');
document.body.appendChild(chatBot);