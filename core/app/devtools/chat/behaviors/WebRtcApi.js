
class WebRtcApi {

    static createPeerConnection() {
        return new RTCPeerConnection();
    }

    static captureLocalIp() {
        return new Promise(async fnResolve => {
            const oIce = await this.createIceCandidateSelfPeerConnection();
            fnResolve(oIce.candidate.address);
        })
    }

    static createSelfPeerConnection() {
        const oConnection = this.createPeerConnection();
        oConnection.createDataChannel('ip-capture=channel');
        return oConnection;
    }

    static createIceCandidateSelfPeerConnection() {
        const oConnection = this.createSelfPeerConnection();
        return new Promise((fnResolve, fnReject) => {
            oConnection.createOffer((oOffer) => {
                oConnection.setLocalDescription(oOffer);
            }, fnReject);
            oConnection.onicecandidate = (oIce) => {
                fnResolve(oIce);
            };
        });
    }

}