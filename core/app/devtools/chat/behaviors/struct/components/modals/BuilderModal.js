
class BuilderModal extends BuilderHtmlComponent {

    create() {
        return this.#createModalElement();
    }

    #createModalElement() {
        const oModal = document.createElement('dialog');
        this.#createModalElementBaseBehaviors(oModal);
        return oModal;
    }

    #createModalElementBaseBehaviors(oModal) {
        oModal.addEventListener('close', this.#onCloseModal.bind(this));
        return this;
    }

    #onCloseModal(oEvent) {
        const oModal = oEvent.target;
        oModal.remove();
        return this;
    }

}