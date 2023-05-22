const BaseEntity = require("../BaseEntity");

class Comment extends BaseEntity {
    constructor({ id =null, commentatorId=null, publicationId=null, ...options }) {
        super(options);
        
        this.id = id;
        this.commentatorId = commentatorId;
        this.publicationId = publicationId;
        this.date = Date.now();
        this.comment;
    }

    async add(comment) {
        if(typeof comment === 'string') {
            const commentId = await this.db.addComment(this.commentatorId, this.publicationId, comment, this.date);
            if(commentId) {
                this.id = commentId[0].id;
                this.comment = comment;
                return true;
            }
        }
        return null;
    }

    async edit(editData) {
        if(typeof editData === 'string') {
            const commentId = await this.db.editComment(this.id, this.commentatorId, this.publicationId, editData);
            if(commentId) {
                this.comment = editData;
                return true;
            }
        }
        return null;
    }

    async delete() {
        const isDeleted =  await this.db.deleteComment(this.id, this.publicationId, this.commentatorId);
        return isDeleted ? true : null;
    }

    get() {
        return({
            id: this.id,
            commentatorId: this.commentatorId,
            publicationId: this.publicationId,
            date: this.date,
            comment: this.comment
        });
    }

    _mathRaito() {}
}

module.exports = Comment;