import styles from './chat-bot-message.scss';

const template = document.createElement('template');

template.innerHTML = `
  <div class="item">
    <div class="quote"></div>
    <div class="author"></div>
  </div>
`;
export default class ChatBotMessage extends HTMLElement {
  constructor () {
    super();
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(styles));
    shadowRoot.appendChild(styleElement);
  }
  
  connectedCallback() {
    
    this.shadowRoot.querySelector('.item')
      .setAttribute('class', `item ${ this.getAttribute('color') }`);
      
    this.shadowRoot.querySelector('.quote')
      .innerText = this.getAttribute('quote');
      
    this.shadowRoot.querySelector('.author')
      .innerText = this.getAttribute('author');
  }
}