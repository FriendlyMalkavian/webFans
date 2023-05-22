const BaseManager = require('../BaseManager');
const Publication = require('./Publication');

class PublicationManager extends BaseManager {
    constructor(options) {
        super(options);

        // Это не домашка, и файлы ArtType и TimePeriod вам не нужны, можете в них не залазить
        // DO NOT DELETE IT!
        //this.all = new TimePeriod;
        //this.month = new TimePeriod(2592000000);    // 2592000000 milliseconds in 1 month
        //this.week = new TimePeriod(604800000);      // 604800000 milliseconds in 1 week
        //this.day = new TimePeriod(86400000);        // 86400000 milliseconds in 1 day
        // DO NOT DELETE IT!

        this.publications = new Map();

        ////sockets
        if(!this.io) return;

        const {
            ADD_PUBLICATION,
            EDIT_PUBLICATION,
            DELETE_PUBLICATION,
            ADD_LIKE,
            REMOVE_LIKE,
            GET_USER_PUBLICATIONS,
            GET_PUBLICATION,
            GET_LIKED_USER_PUBLICATIONS,
            ADD_COMMENT,
            EDIT_COMMENT,
            DELETE_COMMENT, 
        } = this.SOCKETS;

        this.io.on('connection', (socket) => {
            socket.on(ADD_PUBLICATION,              (data) => this._addPublication(data, socket));
            socket.on(EDIT_PUBLICATION,             (data) => this._editPublication(data, socket));
            socket.on(DELETE_PUBLICATION,           (data) => this._deletePublication(data, socket));
            socket.on(ADD_LIKE,                     (data) => this._likePublication(data, socket));
            socket.on(REMOVE_LIKE,                  (data) => this._removePublicationLike(data, socket));
            socket.on(GET_USER_PUBLICATIONS,        (data) => this._getUserPublications(data, socket));
            socket.on(GET_PUBLICATION,              (data) => this._method(data, socket));
            socket.on(GET_LIKED_USER_PUBLICATIONS,  (data) => this._getLikedPublications(data, socket));
            socket.on(ADD_COMMENT,                  (data) => this. _addComment(data, socket));
            socket.on(EDIT_COMMENT,                 (data) => this._editComment(data, socket));
            socket.on(DELETE_COMMENT,               (data) => this._deleteComment(data, socket));
        });

        //mediator
    }

    async _addPublication({ title, image, description, guid, hash, random } = {}, socket) {
        const params = { title, image, description, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user) {
            const newPublication = new Publication({ 
                publisherId: user.id,
                db: this.db 
            });
            const isAdded = await newPublication.add(title, image, description);
            if(isAdded) {
                this.publications.set(newPublication.id, newPublication);
                socket ? socket.emit(this.SOCKETS.ADD_PUBLICATION, true) : '';
                return;
            }
        }
        socket ? socket.emit(this.SOCKETS.ADD_PUBLICATION, false) : '';
        return null;
    }

    async _editPublication({ id, editedData, guid, hash, random } = {}, socket) {
        const params = { id, editedData, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user) {
            const newPublication = new Publication({
                publisherId: user.id,
                id,
                db: this.db
            });
            const isEdited = await newPublication.edit(data);
            if(isEdited) {
                socket ? socket.emit(this.SOCKETS.EDIT_PUBLICATION, true) : '';
                return;
            }
        }
        socket ? socket.emit(this.SOCKETS.EDIT_PUBLICATION, null) : '';
        return null;
    }

    async _deletePublication({ publicationId, guid, hash, random } = {}, socket) {
        const params = { publicationId, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user) {
            const newPublication = new Publication({
                publisherId: user.id,
                id: publicationId,
                db: this.db
            });
            const isDeleted = await newPublication.delete();
            if(isDeleted) {
                socket ? socket.emit(this.SOCKETS.DELETE_PUBLICATION, true) : '';
                return;
            }
        }
        socket ? socket.emit(this.SOCKETS.DELETE_PUBLICATION, null) : '';
        return null;
    }

    async _getUserPublications({ id, guid, hash, random } = {}, socket) {
        const params = { id, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user && id) {
            const publications = await this.db.getUserPublications(id);
            socket ? socket.emit(this.SOCKETS.GET_USER_PUBLICATIONS, publications) : '';
            return;
        }
        socket ? socket.emit(this.SOCKETS.GET_USER_PUBLICATIONS, null) : '';
        return null;
    }

    async _getLikedPublications({ publicationId, guid, hash, random } = {}, socket) {
        const params = { publicationId, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user && publicationId) {
            const publications = await this.db.getLikedPublications(publicationId);
            socket ? socket.emit(this.SOCKETS.GET_LIKED_USER_PUBLICATIONS, publications) : '';
            return;
        }
        socket ? socket.emit(this.SOCKETS.GET_LIKED_USER_PUBLICATIONS, null) : '';
        return null;
    }

    async _likePublication({ publicationId, publisherId, guid, hash, random } = {}, socket) {
        const params = { publicationId, publisherId, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user && publicationId) {
            const newPublication = new Publication({ publicationId, publisherId, db });
            const isLiked = await newPublication.addLike();
            socket ? socket.emit(this.SOCKETS.ADD_LIKE, isLiked) : '';
            return;
        }
        socket ? socket.emit(this.SOCKETS.ADD_LIKE, null) : '';
        return null;
    }

    async _removePublicationLike({ publicationId, guid, hash, random } = {}, socket) {
        const params = { publicationId, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user && publicationId) {
            const newPublication = new Publication({ publicationId, publisherId, db });
            const isRemoved = await newPublication.removeLike();
            socket ? socket.emit(this.SOCKETS.REMOVE_LIKE, isRemoved) : '';
            return;
        }
        socket ? socket.emit(this.SOCKETS.REMOVE_LIKE, null) : '';
        return null;
    }

    async _addComment({ publicationId, comment, guid, hash, random } = {}, socket) {
        const params = { publicationId, comment, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user && publicationId) {
            const newPublication = new Publication({ id: publicationId, db });
            const isAdded = await newPublication.addComment(user.id, comment);
            socket ? socket.emit(this.SOCKETS.ADD_COMMENT, isAdded) : '';
            return;
        }
        socket ? socket.emit(this.SOCKETS.ADD_COMMENT, null) : '';
        return null;
    }

    async _editComment({ publicationId, commentId, editedData, guid, hash, random } = {}, socket) {
        const params = { publicationId, commentId, editedData, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user && publicationId) {
            const newPublication = new Publication({ id: publicationId, db });
            const isEdited = await newPublication.editComment(user.id, commentId, editedData);
            socket ? socket.emit(this.SOCKETS.EDIT_COMMENT, isEdited) : '';
            return;
        }
        socket ? socket.emit(this.SOCKETS.EDIT_COMMENT, null) : '';
        return null;
    }

    async _deleteComment({ publicationId, commentId, guid, hash, random } = {}, socket) {
        const params = { publicationId, commentId, guid };
        const user = this._getUser({ guid, hash, random, params });
        if(user && publicationId) {
            const newPublication = new Publication({ id: publicationId, db });
            const isDeleted = await newPublication.deleteComment(user.id-0, commentId-0);
            socket ? socket.emit(this.SOCKETS.DELETE_COMMENT, isDeleted) : '';
            return;
        }
        socket ? socket.emit(this.SOCKETS.DELETE_COMMENT, null) : '';
        return null;
    }

    _method() {}

    _getUser(data) {
        return this.mediator.get(this.TRIGGERS.INNER_GET_USER, data);
    }
}

module.exports = PublicationManager;