
class SocketConnection {

    static get DEFAULT_PORT() {
        return 2308;
    }

    #iPort = SocketConnection.DEFAULT_PORT;

    #oSocket;

    setPort(iPort) {
        this.#iPort = iPort;
        return this;
    }

    getPort() {
        return this.#iPort;
    }

    #setSocket(oSocket) {
        this.#oSocket = oSocket;
        return this;
    }

    getSocket() {
        return this.#oSocket;
    }

    isConnected() {
        return this.getSocket()?.readyState === WebSocket.OPEN;
    }

    connect(sIp) {
        this.#setSocket(this.#createConnection(sIp));
        return this;
    }

    #createConnection(sIp) {
        return new WebSocket(`ws:${sIp}:${this.getPort()}/ws`)
    }

}
