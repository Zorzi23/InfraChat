
class ModalFormNewChat {

    #oElement;

    getElement() {
        return this.#oElement;
    }

    setElement(oElement) {
        this.#oElement = oElement;
        return this;
    }

    #create() {
        const oDialog = document.createElement('dialog');
        oDialog.classList.add('modal-default-chat');
        oDialog.appendChild(this.#createHeader());
        oDialog.appendChild(this.#createContent());
        oDialog.appendChild(this.#createFooter());
        this.setElement(oDialog);
        return this;
    }
        
    #createHeader() {
        const oSection = document.createElement('section');
        oSection.classList.add('section-header-modal-default-chat');
        oSection.textContent = 'Add Contact';
        return oSection;
    }

    #createContent() {
        const oSection = document.createElement('section');
        oSection.classList.add('section-content-modal-default-chat');
        oSection.appendChild(this.#createContactIpInput());
        oSection.appendChild(this.#createContactNameInput());
        return oSection;
    }

    #createContactIpInput() {
        const oInput = document.createElement('input');
        oInput.id = 'contact-ip';
        oInput.type = 'text';
        oInput.placeholder = '192.0.0.1';
        oInput.classList.add('default-input-text');
        oInput.classList.add('font-sm');
        const oContainer = this.#createInputContainer();
        oContainer.appendChild(this.#createInputLabel('Contact IP Address:'));
        oContainer.appendChild(oInput);
        return oContainer;
    }

    #createContactNameInput() {
        const oInput = document.createElement('input');
        oInput.id = 'contact-name';
        oInput.type = 'text';
        oInput.placeholder = 'Name Surname';
        oInput.classList.add('default-input-text');
        oInput.classList.add('font-sm');
        const oContainer = this.#createInputContainer();
        oContainer.appendChild(this.#createInputLabel('Contact Name:'));
        oContainer.appendChild(oInput);
        return oContainer;
    }

    #createInputLabel(sLabel) {
        const oLabel = document.createElement('label');
        oLabel.textContent = sLabel;
        oLabel.classList.add('default-input-text-label');
        return oLabel;    
    }

    #createInputContainer() {
        const oContainer = document.createElement('div');
        oContainer.classList.add('default-input-text-container');
        return oContainer;    
    }

    #createFooter() {
        const oSection = document.createElement('section');
        oSection.classList.add('section-footer-modal-default-chat');
        oSection.appendChild(this.#createCloseButton());
        oSection.appendChild(this.#createConfirmButton());
        return oSection;
    }
        
    #createCloseButton() {
        const oButton = document.createElement('button');
        oButton.classList.add('default-close-button');
        oButton.textContent = 'Close';
        oButton.addEventListener('click', this.close.bind(this));
        return oButton;
    }

    #createConfirmButton() {
        const oButton = document.createElement('button');
        oButton.classList.add('default-confirm-button');
        oButton.textContent = 'Confirm';
        oButton.addEventListener('click', this.#onConfirm.bind(this));
        return oButton;
    }

    #mapInputs() {
        return {
            oContactIp: document.querySelector('#contact-ip'),
            oContactName: document.querySelector('#contact-name'),
        }
    }
    
    #onConfirm() {
        const { oContactIp, oContactName } = this.#mapInputs();
        const sIp = oContactIp?.value;
        const sName = oContactName?.value;
        if(!Network.isValidIp(sIp)) {
            alert('Ip input address is not valid.');
            return;
        }
        if(!sName) {        
            alert('Name input is obrigatory.');
            return;
        }
        this.#saveContact(sIp, sName);
        oContactIp.value = null;
        oContactName.value = null;
        oViewChat.reloadContacts();
        this.close();
    }

    #saveContact(sIp, sName) {
        const oContact = {sIp, sName};
        localStorage.setItem(`contact-${sIp}`, JSON.stringify(oContact));
        return this;
    }

    render(oTargetElement = null) {
        oTargetElement = oTargetElement || document.body;
        oTargetElement.appendChild(this.#create().getElement());
        return this;
    }

    open() {
        this.getElement().showModal();
        return this;
    }

    close() {
        this.getElement().close();
        this.getElement().remove();
        return this;
    }

}