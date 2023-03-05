class ApiDocument extends Response {
    constructor() {
        super();
        this.type = 'api-document';
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
            type: this.type,
            links: this.links,
            meta: this.meta,
            data: this.data,
        };
    }
    
    getResponseWithStatus(status) {
        return {
            status: status,
            type: this.type,
            links: this.links,
            meta: this.meta,
            data: this.data,
        };
    }
}

module.exports = ApiDocument;