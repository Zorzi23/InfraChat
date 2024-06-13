
class LocalStorageRepository {

    static *getIterator() {
        for (let iData = 0; iData < localStorage.length; iData++) {
            let sKey = localStorage.key(iData);
            let xValue = localStorage.getItem(sKey);
            yield {sKey, xValue};
        }
    }

}