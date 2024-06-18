class BuilderModalMaintainUser extends BuilderModal {
  /**
   *
   * @returns {HTMLDialogElement}
   */
  create() {
    const oModal = new BuilderModal().create();
    oModal.classList.add("modal-default-chat");
    oModal.appendChild(this.#createHeader());
    oModal.appendChild(this.#createContent());
    oModal.appendChild(this.#createFooter(oModal));
    return oModal;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createHeader() {
    const oSection = document.createElement("section");
    oSection.classList.add("section-header-modal-default-chat");
    oSection.textContent = "Add Contact";
    return oSection;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createContent() {
    const oSection = document.createElement("section");
    oSection.classList.add("section-content-modal-default-chat");
    oSection.appendChild(this.#createContactIpInput());
    oSection.appendChild(this.#createContactNameInput());
    return oSection;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createContactIpInput() {
    const oInput = document.createElement("input");
    oInput.id = "contact-ip";
    oInput.type = "text";
    oInput.placeholder = "192.0.0.1";
    oInput.classList.add("default-input-text");
    oInput.classList.add("font-sm");
    const oContainer = this.#createInputContainer();
    oContainer.appendChild(this.#createInputLabel("Contact IP Address:"));
    oContainer.appendChild(oInput);
    return oContainer;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createContactNameInput() {
    const oInput = document.createElement("input");
    oInput.id = "contact-name";
    oInput.type = "text";
    oInput.placeholder = "Name Surname";
    oInput.classList.add("default-input-text");
    oInput.classList.add("font-sm");
    const oContainer = this.#createInputContainer();
    oContainer.appendChild(this.#createInputLabel("Contact Name:"));
    oContainer.appendChild(oInput);
    return oContainer;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createInputLabel(sLabel) {
    const oLabel = document.createElement("label");
    oLabel.textContent = sLabel;
    oLabel.classList.add("default-input-text-label");
    return oLabel;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createInputContainer() {
    const oContainer = document.createElement("div");
    oContainer.classList.add("default-input-text-container");
    return oContainer;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createFooter(oModal) {
    const oSection = document.createElement("section");
    oSection.classList.add("section-footer-modal-default-chat");
    oSection.appendChild(this.#createCloseButton(oModal));
    oSection.appendChild(this.#createConfirmButton());
    return oSection;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createCloseButton(oModal) {
    const oButton = document.createElement("button");
    oButton.classList.add("default-close-button");
    oButton.textContent = "Close";
    oButton.addEventListener("click", oModal.close.bind(oModal));
    return oButton;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #createConfirmButton() {
    const oButton = document.createElement("button");
    oButton.classList.add("default-confirm-button");
    oButton.classList.add("add-contact-confirm-button");
    oButton.textContent = "Confirm";
    return oButton;
  }
}
