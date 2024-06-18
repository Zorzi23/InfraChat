
class Modal extends HtmlComponent {

    /**
     * 
     * @param {BuiderHtmlComponent} oBuider 
     */
    constructor(oBuider = null) {
        super();
        oBuider = oBuider || new BuilderModal();
        this.setElement(oBuider.create());
    }

    /**
     * 
     * @returns {Modal}
     */
    open() {
        this.getElement().showModal();
    }

    /**
     * 
     * @returns {Modal}
     */
    close() {
        this.getElement().close();
    }

}