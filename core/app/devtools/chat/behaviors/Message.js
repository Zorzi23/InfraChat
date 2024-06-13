
class Message {

    #sData;

    /**
     * 
     * @param {String} sData 
     * @returns {Message}
     */
    setData(sData) {
        this.#sData = sData;
        return this;
    }

    /**
     * 
     * @returns {String}
     */
    getData() {
        return this.#sData;
    }

}