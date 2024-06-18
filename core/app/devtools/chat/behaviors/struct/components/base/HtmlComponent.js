
class HtmlComponent {

    /**
     * 
     * @var {HTMLElement}
     */
    #oElement;

    /**
     * 
     * @returns {HTMLElement}
     */
    getElement() {
       return this.#oElement;
    }
    
    /**
     * 
     * @param {HTMLElement} oElement
     * @returns {HtmlComponent}
     */
    setElement(oElement) {
        this.#oElement = oElement;
        return this;
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    render(oTargetElement = null) {
        oTargetElement = oTargetElement || document.body;
        oTargetElement.appendChild(this.getElement());
        this?.afterRender();
        return this;
    }

    /**
     * @returns {HtmlComponent}
     */
    draggable() {
        const oArchitect = new DraggableBehaviorArchitect();
        this.getElement().setAttribute('draggable', 'true');
        oArchitect.architect(this.getElement());
        return this;
    }

    

}