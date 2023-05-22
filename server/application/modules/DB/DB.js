const ORM = require('./ORM');
const { Client } = require('pg');

class DB {
    constructor({ HOST, PORT, NAME, USER, PASS, initCB = () => null }) {
        this.db;
        this.orm;
        this.db = new Client({
            host: HOST,
            port: PORT,
            database: NAME,
            user: USER,
            password: PASS
        });

        (async () => {
            this.orm = new ORM(this.db);
            //Вот тут мем какой-та
            await this.db.connect();
            initCB();
        })();
    }

    destructor() {
        if (this.db) {
            this.db.end();
            this.db = null;
        }
    }

    /************/
    /**  user  **/
    /************/

    async recordUser({ login, password, name, guid }) {
        const user = await this.orm.select('users', 'login', { login });                                     // check if user alredy exist
        if(!user[0]) {
            const [ { id } ] = await this.orm.insert('users', { login, password, name, guid }, [ 'id' ]);    // create new user
            if(id) { return true };
        }
        return null;
    } 

    async login(login, password, token) {
        return await this.orm.update('users', { token }, { login, password }, ['*']);          // update token and return user data
    }

    logout(guid) {
        return this.orm.update('users', { token: null }, { guid });
    }

    getUserByGuid(guid) {
        return this.orm.select('users', '*', { guid });
    }

    /************/
    /**  chat  **/
    /************/

    recordMessage({ message, senderId, recipientId=null }) {
        return this.orm.insert('messages', { message, sender_id: senderId, recipient_id: recipientId, date: Date.now() }, ['id']);
    }

    editMessage({ message, id }) {
        return this.orm.update('messages', { message }, { id });
    }

    async getStorageMessages(offSet = 0, limit  = 40) {
        const query = `
            SELECT * FROM messages WHERE recipient_id IS NULL
            ORDER BY id DESC
            LIMIT ${limit} OFFSET ${offSet}
        `;
        let response = null;
        try { response = (await this.db.query(query))?.rows; }
        catch (e) { console.log('error:', e) };
        return response;
    }

    async getPrivateMessages(senderId, recipientId, limit = 40, offSet=0) {
        const query = `
            SELECT * FROM messages
            WHERE (sender_id = ${senderId} AND recipient_id = ${recipientId}) OR (recipient_id = ${recipientId} AND sender_id = ${senderId})
            ORDER BY id
            LIMIT ${limit} OFFSET ${offSet}
        `;
        let response = null;
        try { response = (await this.db.query(query))?.rows; }
        catch (e) { console.log('error:', e) };
        return response;
    }

    /****************/
    /**  homework  **/
    /****************/

    async addPublication(publisherId, title, image, description, date) {
        return await this.orm.insert('publications', { publisher_id: publisherId, title, image, description, date }, ['id']);
    }

    async editPublication(id, publisherId, editedData) {
        return await this.orm.update('publications', editedData, { publisher_id: publisherId, id }, ['id', 'title', 'image', 'description']);
    }
    
    async likePublication(userId, publicationId) {
        const like = await this.orm.select('likes', 'id', { publication_id: publicationId, liker_id: userId });
        if(!like[0]) {
            return this.orm.insert('likes', { liker_id: userId, publication_id: publicationId });
        }
        return null;
    }

    async removeLike(userId, publicationId) {
        const like = await this.orm.select('likes', 'id', { publication_id: publicationId, liker_id: userId });
        if(like[0]) {
            return this.orm.delete('likes', { liker_id: userId, publication_id: publicationId });
        }
        return null;
    }

    async getUserPublications(id) {
        const data = await this.orm.select('publications', '*', { publisher_id: id });
        if(data && data[0]) {
            return data
        }
        return null;
    }

    async getLikedPublications(id) {
        const query = `
            SELECT p.id, p.publisher_id, p.title, p.image, p.raito, p.description, p.date
            FROM 
                publications AS p INNER JOIN likes AS l
                ON l.publication_id = p.id
            WHERE l.liker_id=${id}
        `;
        let response = null;
        try { response = (await this.db.query(query))?.rows; }
        catch (e) { console.log('error:', e) };
        return response;
    }

    async addComment(commentator_id, publication_id, comment, date) {
        return await this.orm.insert('comments', { commentator_id, publication_id, comment, date }, ['id']);
    }

    async editComment(commentId, commentator_id, publication_id, editedComment) {
        return await this.orm.update('comments', { comment: editedComment }, { id: commentId, commentator_id, publication_id, });
    }

    async deletePublication(id, publisherId) {
        const data = await this.orm.select('publications', 'id', { id, publisher_id: publisherId });
        if(data[0]) {
            return await this.orm.delete('publications', { id, publisher_id: publisherId });
        }
        return null;
    }

    async deleteComment(id, publicationId, commentatorId) {
        const data = await this.orm.select('comments', 'id', { id, publication_id: publicationId, commentator_id: commentatorId });
        if(data[0]) {
            return this.orm.delete('comments', { id, publication_id: publicationId, commentator_id: commentatorId });
        }
        return null;
    }

    async deleteUser(id) {
        this.orm.delete('users', { id });
    }
}

module.exports = DB;