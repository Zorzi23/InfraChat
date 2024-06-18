
class ViewChat extends ViewArchitect {

    /**
     * 
     * @param {Message} oMessage 
     */
    addEnterUserMessage(oMessage) {
        const oMessageBox = this.#createEnterUserMessageBox(oMessage.getData());
        this.#renderMessage(oMessageBox);
        return this;
    }
    
    /**
     * 
     * @param {Message} oMessage 
     */
    addExitUserMessage(oMessage) {
        const oMessageBox = this.#createExitUserMessageBox(oMessage.getData());
        this.#renderMessage(oMessageBox);
        return this;
    }

    load() {
        super.load();
        this.createBehaviors();
        return this;
    }

    /**
     * 
     * @returns {Object}
     */
    mapElements() {
        return {
            oChatHeaderInfoContact: document.querySelector('.chat-header-info-contact'),
            oChatContainer: document.querySelector('.chat-container'),
            oChatSelfIp: document.querySelector('.self-ip-address-span'),
            oChatInputMessage: document.querySelector('#chat-input-message'),
        }
    }

    createBehaviors() {
        this.#createSelfIpMarker();
        this.#createInputMessageBehaviors();
        return this;
    }

    async #createSelfIpMarker() {
       const { oChatSelfIp } = this.getElements();
       let sLocalIp = await WebRtcApi.captureLocalIp() || '';
       sLocalIp = sLocalIp.match(/.local/) ? 'Unreachable IP' : sLocalIp;
       oChatSelfIp.textContent = `Local IP Address: ${sLocalIp}`;
       return this;  
    }

    #createInputMessageBehaviors() {
        const { oChatInputMessage } = this.getElements();
        oChatInputMessage.addEventListener('keypress', this.#onKeyPressInputMessage.bind(this));
        return this;
    }

    #onKeyPressInputMessage(oEvent) {
        if(oEvent.keyCode != 13) {
            return;
        } 
        const oChatInputMessage = oEvent.target;
        const oMessage = (new Message())
            .setData(oChatInputMessage.value?.trim());
        this.addEnterUserMessage(oMessage);
        this.getChatConnection().getSocket().send(oMessage.getData());
        oChatInputMessage.value = null;
        return this;
    }

    /**
     * 
     * @param {HTMLElement} oMessageBox 
     * @returns {ViewChat}
     */
    #renderMessage(oMessageBox) {
        const { oChatContainer } = this.getElements();
        oChatContainer.appendChild(oMessageBox);
        return this;
    }

    /**
     * 
     * @param {String} sText 
     * @returns {HTMLElement}
     */
    #createEnterUserMessageBox(sText) {
        const oMessageBox = this.#createMessageBox(sText);
        oMessageBox.classList.add('chat-container-message-enter-user');
        return oMessageBox;
    }

    /**
     * 
     * @param {String} sText 
     * @returns {HTMLElement}
     */
    #createExitUserMessageBox(sText) {
        const oMessageBox = this.#createMessageBox(sText);
        oMessageBox.classList.add('chat-container-message-exit-user');
        return oMessageBox;
    }

    /**
     * 
     * @param {String} sText 
     * @returns {HTMLElement}
     */
    #createMessageBox(sText) {
        const oMessageBox = document.createElement('li');
        oMessageBox.textContent = sText;
        return oMessageBox;
    }

}

const oViewChat = (new ViewChat()).load();