
class ViewChat {

    #oChatConnection;

    #oElements = {};

    constructor() {
        this.#setChatConnection(new SocketConnection());
    }

    #setChatConnection(oChatConnection) {
        this.#oChatConnection = oChatConnection;
        return this;
    }

    getChatConnection() {
        return this.#oChatConnection;
    }

    /**
     * 
     * @param {Object<HTMLElement>} oElements 
     * @returns {ViewChat}
     */
    #setElements(oElements) {
        this.#oElements = oElements;
        return this;
    }

    /**
     * 
     * @returns {Object<HTMLElement>}
     */
    getElements() {
        return this.#oElements;
    }

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

    #isEnterKey(iEventKey) {
        return iEventKey === 13;
    }

    /**
     * 
     * @param {String} sKey 
     * @returns {Boolean}
     */
    #isContactItem(sKey) {
        return sKey.match(/contact-/);
    }

    /**
     * 
     * @returns {ViewChat}
     */
    load() {
        this.#mapElements().#treatBehaviors().#loadContacts();
        return this;
    }

    /**
     * 
     * @returns {ViewChat}
     */
    remapElements() {
        return this.#mapElements();
    }

    /**
     * 
     * @returns {ViewChat}
     */
    #mapElements() {
        this.#setElements({
            oContactList: document.querySelector('.chat-side-bar-unordered-list'),
            oSideBarToggleButton: document.querySelector('.toggle-side-bar'),
            oChatContainer: document.querySelector('.chat-container'),
            oChatSelfIp: document.querySelector('.self-ip-address-span'),
            oChatInputMessage: document.querySelector('#chat-input-message'),
            oAddNewChat: document.querySelector('#add-contact')
        });
        return this;
    }

    #treatBehaviors() {
        this.#createSideBarToggleButtonBehavior();
        this.#createSelfIpMarker();
        this.#createInputMessageBehaviors();
        this.#createAddNewChatButtonBehaviors();
        return this;
    }

    async #createSideBarToggleButtonBehavior() {
       const { oSideBarToggleButton } = this.getElements();
       oSideBarToggleButton.addEventListener('click', this.#onClickToggleSideBarButton.bind(this));
       return this;  
    }

    #onClickToggleSideBarButton() {
        const oCheckToggle = document.querySelector('.toggle-side-bar input');
        const bShowSideBar = oCheckToggle?.checked || false;
        const oSideBar = document.querySelector('.side-bar');
        if(bShowSideBar) {
            oSideBar.classList.add('visible'); 
            return;
        }
        oSideBar.classList.remove('visible'); 
    }

    async #createSelfIpMarker() {
       const { oChatSelfIp } = this.getElements();
       let sLocalIp = await WebRtcApi.captureLocalIp() || '';
       sLocalIp = sLocalIp.match(/.local/) ? 'Unreachable IP' : sLocalIp;
       oChatSelfIp.textContent = `Local IP Address: ${sLocalIp}`;
       return this;  
    }

    #createSocketMessagesBehaviors(sIp) {
        if(this.getChatConnection().isConnected()) {
            return this;
        }
        this.getChatConnection().connect(sIp);
        const oSocket = this.getChatConnection().getSocket();
        oSocket.onmessage = this.#onSocketReceiverMessage.bind(this);
        return this;
    }

    #onSocketReceiverMessage(oEvent) {
        const oMessage = (new Message())
            .setData(oEvent?.data);
        this.addExitUserMessage(oMessage);
        return this;
    }

    #createInputMessageBehaviors() {
        const { oChatInputMessage } = this.getElements();
        oChatInputMessage.addEventListener('keypress', this.#onKeyPressInputMessage.bind(this));
        return this;
    }

    #onKeyPressInputMessage(oEvent) {
        if(!this.#isEnterKey(oEvent.keyCode)) {
            return this;
        }
        // this.#createSocketMessagesBehaviors(sIp);
        if(!this.getChatConnection().isConnected()) {
            alert('⚠️ Socket user ureachable!');
            return this;
        }
        const oChatInputMessage = oEvent.target;
        const oMessage = (new Message())
            .setData(oChatInputMessage.value?.trim());
        this.addEnterUserMessage(oMessage);
        this.getChatConnection().getSocket().send(oMessage.getData());
        oChatInputMessage.value = null;
        return this;
    }

    #createAddNewChatButtonBehaviors() {
        const { oAddNewChat } = this.getElements();
        oAddNewChat.addEventListener('click', this.#onClickAddNewChat.bind(this));
    }

    #onClickAddNewChat() {
        const oModal = new ModalFormNewChat();
        oModal.render().open();
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

    #loadContacts() {
        const { oContactList } = this.getElements();
        oContactList.innerHTML = null;
        LocalStorageRepository.getIterator().forEach(({sKey, xValue}) => {
            if(this.#isContactItem(sKey)) {
                const oContact = JSON.parse(xValue);
                this.#renderContactItem(oContact);
            }
        });
    }

    reloadContacts() {
        this.#loadContacts();
        return this;
    }

    #renderContactItem(oContact) {
        const { oContactList } = this.getElements();
        oContactList.appendChild(this.#createContactItem(oContact));
        return this;
    }

    #createContactItem({sIp, sName}) {
        const oItem = document.createElement('li');
        oItem.classList.add('chat-side-bar-item');
        oItem.textContent = `${sIp} - ${sName}`;
        return oItem;
    }

}

const oViewChat = (new ViewChat()).load();