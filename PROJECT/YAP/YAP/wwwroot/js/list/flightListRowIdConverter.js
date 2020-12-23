class FlightListRowIdConverter {

    constructor(prefix) {
        this._prefix = prefix;
    }

    /**
     * converts attraction wrapper id to list row id
     * @param {string} attractionWrapperId the attraction wrapper's id
     */
    attractionWrapperIdToListRowId(attractionWrapperId) {
        return this._prefix + attractionWrapperId;
    }

    /**
     * converts attraction wrapper id to list row id
     * @param {string} listRowId the attraction wrapper's id
     */
    listRowIdToAttractionWrapperId(listRowId) {
        return listRowId.substr(this._prefix.length);
    }

}