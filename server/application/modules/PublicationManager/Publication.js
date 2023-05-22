const BaseEntity = require("../BaseEntity");
const Comment = require('./Comment');

class Publication extends BaseEntity {
    constructor({ publisherId = null, id = null, ...options }) {
        super(options);
        
        this.id = id;
        this.publisherId = publisherId;
        this.date = Date.now();
        this.comments = new Map();
        this.title;
        this.image;
        this.description;
        this.raito = 0;
        this.likes = 0;
        this.bookmarks = 0;
    }

    async add(title, image, description) {
        if(
            typeof title === 'string' && 
            typeof image === 'string' && 
            typeof description === 'string'
        ) {
            const recordedData = await this.db.addPublication(this.publisherId, title, image, description, this.date);
            if(recordedData) {
                this.id = recordedData[0].id-0;
                this.title = title;
                this.image = image;
                this.description = description;
                return true;
            }
        }
        return null;
    }

    async edit(editData = {}) {
        const { title, image, description } = editData;
        const data = {};

        if (title && typeof title === 'string') { data.title = title };
        if (image && typeof image === 'string') { data.image = image };
        if (description && typeof description === 'string') { data.description = description };

        if(Object.keys(data).length > 0) {
            const editedData = await this.db.editPublication(this.id, this.publisherId, data);
            if(editedData.length > 0) {
                this.title = editedData[0].title;
                this.image = editedData[0].image;
                this.description = editedData[0].description;
                return true;
            }
        }
        return null;
    }

    async delete() {
        const isDeleted =  await this.db.deletePublication(this.id, this.publisherId);
        return isDeleted ? true : null;
    }

    async addLike() {
        const isLiked = await this.db.likePublication(this.publisherId, this.id);
        return isLiked ? true : null;
    }

    async removeLike() {
        const isRemoved = await this.db.removeLike(this.publisherId, this.id);
        return isRemoved ? true : null;
    }

    async addComment(commentatorId, comment) {
        if(commentatorId && comment) {
            const newComment = new Comment({ commentatorId, publicationId: this.id, db: this.db });
            const isRecorded = await newComment.add(comment);
            if(isRecorded) {
                this.comments.set(newComment.id, newComment);
                return true;
            }
        }
        return null;
    }

    async editComment(commentatorId, commentId, editedData) {
        if(commentatorId && editedData) {
            const newComment = new Comment({ id: commentId, commentatorId, publicationId: this.id, db: this.db });
            const isRecorded = await newComment.edit(editedData);
            if(isRecorded) {
                this.comments.set(newComment.id, newComment);
                return true;
            }
        }
        return null;
    }

    async deleteComment(commentatorId, commentId) {
        if(
            commentatorId && 
            commentId &&
            typeof commentatorId === 'number' &&
            typeof commentId === 'number'
        ) {
            const newComment = new Comment({ id: commentId, commentatorId, publicationId: this.id, db: this.db });
            return await newComment.delete();
        }
        return null;
    }

    get() {
        return({
            id: this.id,
            publisherId: this.publisherId,
            title: this.title,
            image: this.image,
            description: this.description,
            date: this.date,
            raito: this.raito,
            comments: this.comments,
            likes: this.likes,
            bookmarks: this.bookmarks
        });
    }

    _mathRaito() {}
}

module.exports = Publication;