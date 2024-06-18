class AutoloadBehavior {

    /**
     * 
     * @returns {Number}
     */
    static get HEAD_LOAD_TYPE() {
        return 1;
    }

    /**
     * 
     * @returns {Number}
     */
    static get BODY_LOAD_TYPE() {
        return 2;
    }

    #aScriptsPaths = [];

    getScriptsPaths() {
        return this.#aScriptsPaths;
    }

    setScriptsPaths(aScriptsPaths = []) {
        aScriptsPaths.forEach(this.addScriptPath.bind(this));
        return this;
    }

    addScriptPath(sPath, iLoadType) {
        this.#aScriptsPaths.push({sPath, iLoadType})
        return this;
    }

    import() {
        return new Promise(this.#resolveImport.bind(this));
    }

    #resolveImport() {
        this.getScriptsPaths().forEach(this.#importScript.bind(this));
        return this;
    }

    #importScript({sPath, iLoadType}) {
        const oScript = this.#createScriptElement(sPath);
        switch (iLoadType) {
            case AutoloadBehavior.BODY_LOAD_TYPE:
                return this.#importScriptBody(oScript);
            default:
                return this.#importScriptHead(oScript);
        }
    }
    
    #importScriptHead(oScript) {
        document.head.appendChild(oScript);
        return this;
    }

    #importScriptBody(oScript) {
        document.boy.appendChild(oScript);
        return this;
    }

    /**
     * 
     * @param {String} sPath 
     * @returns {HTMLElement}
     */
    #createScriptElement(sPath) {
        const oScript = document.createElement('script');
        oScript.src = sPath;
        return oScript;
    }

}