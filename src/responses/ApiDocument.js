class ApiDocument {
    constructor() {
        this.links = {};
        this.meta = {};
        this.data = {};
    }
    
    addLink(name, link) {
        this.links[name] = link;
    }
    
    addMeta(name, value) {
        this.meta[name] = value;
    }
    
    addData(name, value) {
        this.data[name] = value;
    }
    
    getResponse() {
        return {
            success: true,
            links: this.links,
            meta: this.meta,
            data: this.data,
        };
    }
    
    getResponseWithStatus(status) {
        return {
            status: status,
            links: this.links,
            meta: this.meta,
            data: this.data,
        };
    }
}

module.exports = ApiDocument;