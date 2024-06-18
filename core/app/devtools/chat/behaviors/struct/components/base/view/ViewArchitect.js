
class ViewArchitect {

    #oElements;

    getElements() {
        if(!this.#oElements) {
            throw new EvalError('Elements not mapped yet.');
        }
        return this.#oElements;
    }
    
    #setElements(oElements) {
        this.#oElements = oElements;
        return this;
    }
    
    load() {
        this.#setElements(this.mapElements());
        return this;
    }
    
    mapElements() {
        throw new EvalError('Map elements is not implemented.');
    }

}