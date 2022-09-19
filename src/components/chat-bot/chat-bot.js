import { getQuotes } from '../../utils';
import styles from './chat-bot.scss';

const template = document.createElement('template');

template.innerHTML = `
  <div class="chat-bot">
    <div class="wrapper">
      <div class="header">
        <h1></h1>
        <button type="button">X</button>
      </div>
      <div class="messages"></div>
      <form>
        <input type="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
  <button class="chat-bot-button" type="button">Open Chat</button>
`;

export default class ChatBot extends HTMLElement {
  constructor() {
    super();
    
    if (!window.chatBot) {
      console.error('Missing chatBot external paramters');
      return;
    }
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(styles));
    shadowRoot.appendChild(styleElement);
    
    shadowRoot.querySelector('.header h1').innerText = window.chatBot.name;
    
    shadowRoot.querySelector('form')
      .addEventListener('submit', this.submit.bind(this));
    
    shadowRoot.querySelector('.chat-bot-button')
      .addEventListener('click', this.openChat.bind(this));
    
    shadowRoot.querySelector('.header button')
      .addEventListener('click', this.closeChat.bind(this));
  }
  
  openChat () {
    this.shadowRoot.querySelector('.chat-bot')
      ?.setAttribute('style', 'display: flex');
    
    this.shadowRoot.querySelector('.chat-bot-button')
      ?.setAttribute('style', 'display: none');
    
    this.shadowRoot.querySelector('input')
      ?.focus();
  }
  
  closeChat () {
    this.shadowRoot.querySelector('.chat-bot')
      ?.setAttribute('style', 'display: none');
    
    this.shadowRoot.querySelector('.chat-bot-button')
      ?.setAttribute('style', 'display: block');
  }
  
  async submit (e) {
    e.preventDefault();
    
    const text = this.shadowRoot.querySelector('input')?.value;
    
    if (!text) {
      return;
    }
    
    const quote = await getQuotes();
    
    const messages = this.shadowRoot.querySelector('.messages');
    
    const chatBotMessage = document.createElement('chat-bot-message');
    chatBotMessage.setAttribute('quote', quote.en);
    chatBotMessage.setAttribute('author', quote.author);
    chatBotMessage.setAttribute('color', messages.childElementCount % 2 ? 'salmon' : 'aquamarine');
    messages.appendChild(chatBotMessage);

    messages.scrollTo(0, messages.scrollHeight);
    
    this.shadowRoot.querySelector('input').value = '';
  }
}