
class ViewSideBar extends ViewArchitect {

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
     * @returns {ViewSideBar}
     */
    load() {
        super.load();
        this.#loadContacts();
        return this;
    }

    /**
     * 
     * @returns {Object<HTMLElement>}
     */
    mapElements() {
        return {
            oSideBar: this.#mapSideBar(),
            oContactList: this.#mapContactList(),
            oToggleButton: this.#mapToggleButton(),
            oAddUserButton: this.#mapAddContactButton()
        }
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    #mapSideBar() {
        return document.querySelector('.side-bar');
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    #mapContactList() {
        return document.querySelector('.chat-side-bar-unordered-list');
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    #mapToggleButton() {
        const oToggleButton = document.querySelector('.toggle-side-bar');
        oToggleButton.addEventListener('click', this.#onClickToggleSideBarButton.bind(this));
        document.addEventListener('keydown', this.#createSideBarShortcut.bind(this))
        return oToggleButton;
    }

    #onClickToggleSideBarButton() {
        const oCheckToggle = document.querySelector('.toggle-side-bar input');
        const bShowSideBar = oCheckToggle?.checked || false;
        const oSideBar = this.#mapSideBar();
        bShowSideBar ? oSideBar.classList.add('visible') : oSideBar.classList.remove('visible');
        return this;
    }

    #createSideBarShortcut(oEvent) {
        if(oEvent.ctrlKey && oEvent.keyCode === 66) {
            oEvent.target.click();
        }
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    #mapAddContactButton() {
        const oAddContact = document.querySelector('#add-contact');
        oAddContact.addEventListener('click', this.#onClickAddContact.bind(this));
        return this;
    }

    #onClickAddContact() {
        const oModal = new ModalFormMaintainUser();
        oModal.render().open();
    }

    reloadContacts() {
        this.#loadContacts();
        return this;
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

    #renderContactItem(oContact) {
        const { oContactList } = this.getElements();
        oContactList.appendChild(this.#createContactItem(oContact));
        return this;
    }

    #createContactItem({sIp, sName}) {
        const oItem = document.createElement('li');
        oItem.classList.add('chat-side-bar-item');
        oItem.contact = {sIp, sName};
        oItem.appendChild(this.#createContactIconDescription(oItem.contact));
        oItem.appendChild(this.#createContactIconActions());
        oItem.addEventListener('click', this.#onClickContactItem.bind(this, oItem))
        return oItem;
    }
    
    #createContactIconDescription(oContact) {
        const {sIp, sName} = oContact;
        const oDescription = document.createElement('span');
        oDescription.classList.add('chat-side-bar-item-description');
        oDescription.textContent = `${sIp} - ${sName}`;
        return oDescription;
    }

    #createContactIconActions() {
        const oContainer = document.createElement('div');
        oContainer.classList.add('chat-side-bar-item-actions');
        oContainer.appendChild(this.#createRemoveContactIcon());
        oContainer.appendChild(this.#createEditContactIcon());
        return oContainer;
    }

    #createRemoveContactIcon() {
        const oIcon = document.createElement('i');
        oIcon.classList.add('ri-delete-bin-5-line');
        oIcon.addEventListener('click', this.#onClickRemoveContactIcon.bind(this))
        return oIcon;
    }

    #createEditContactIcon() {
        const oIcon = document.createElement('i');
        oIcon.classList.add('ri-pencil-fill');
        oIcon.addEventListener('click', this.#onClickEditContactIcon.bind(this))
        return oIcon;
    }

    #onClickRemoveContactIcon(oEvent) {
        const { sIp, sName } = oEvent.target.parentElement.parentElement?.contact;
        const bConfirm = confirm(`Do you want remove contact: ${sIp} - ${sName}?`);
        if(!bConfirm) {
            return;
        }
        localStorage.removeItem(`contact-${sIp}`);
        this.reloadContacts();
    }

    #onClickEditContactIcon(oEvent) {
        const { sIp, sName } = oEvent.target.parentElement.parentElement?.contact;
        const oModal = new ModalFormMaintainUser();
        oModal.render().open();
        oModal.setContactIpValue(sIp)
            .setContactNameValue(sName);
    }

    #onClickContactItem(oItem) {
        const { oChatHeaderInfoContact } = oViewChat.getElements();
        oChatHeaderInfoContact.textContent = oItem.textContent;
        const sClass = 'chat-side-bar-item-selected';
        const bSelected = oItem.classList.contains(sClass); 
        this.#clearSelectedUserContactItens(sClass);
        if(!bSelected) {
            oItem.classList.add(sClass);
            return;
        }
        oChatHeaderInfoContact.textContent = '-';
        oItem.classList.remove(sClass);
    }

    #clearSelectedUserContactItens(sClass) {
        document.querySelectorAll(`.${sClass}`)
            .forEach(oContact => {
                oContact.classList.remove(sClass);
            });
    }


}

const oViewSideBar = (new ViewSideBar()).load();