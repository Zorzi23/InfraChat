class ModalFormMaintainUser extends Modal {
  /**
   *
   * @return {ModalFormMaintainUser}
   */
  constructor() {
    super(new BuilderModalMaintainUser());
  }

  setContactIpValue(sIp) {
    const { oContactIp } = this.mapElements();
    oContactIp.value = sIp;
    return this;
  }

  setContactNameValue(sName) {
    const { oContactName } = this.mapElements();
    oContactName.value = sName;
    return this;
  }

  getDataObject() {
    const { oContactIp, oContactName } = this.mapElements();
    return {
      sIp: oContactIp?.value,
      sName: oContactName?.value,
    };
  }

  afterRender() {
    this.#createBehaviors();
    return this;
  }

  resetInputs() {
    const { oContactIp, oContactName } = this.mapElements();
    oContactIp.value = null;
    oContactName.value = null;
    return this;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  mapElements() {
    return {
      oContactIp: document.querySelector("#contact-ip"),
      oContactName: document.querySelector("#contact-name"),
      oConfirmButton: document.querySelector(".add-contact-confirm-button")
    };
  }

  #createBehaviors() {
    this.#createConfirmButtonBehaviors();
  }

  #createConfirmButtonBehaviors() {
    const { oConfirmButton } = this.mapElements();
    console.log(oConfirmButton);
    oConfirmButton.addEventListener("click", this.#onConfirm.bind(this));
    return this;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #onConfirm() {
    const { sIp, sName } = this.getDataObject();
    if (!Network.isValidIp(sIp)) {
      alert("Ip input address is not valid.");
      return;
    }
    if (!sName) {
      alert("Name input is obrigatory.");
      return;
    }
    this.#saveContact(sIp, sName);
    this.resetInputs();
    oViewSideBar.reloadContacts();
    this.close();
  }

  /**
   *
   * @returns {HTMLElement}
   */
  #saveContact(sIp, sName) {
    const oContact = { sIp, sName };
    localStorage.setItem(`contact-${sIp}`, JSON.stringify(oContact));
    return this;
  }
}
