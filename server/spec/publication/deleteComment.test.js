const { PublicationTestModule, db, server } = require('../../app');
const Publication = require('../../application/modules/PublicationManager/Publication');

describe('test publication manager wrong data responses', () => {
    test('prepare method to delte comment', async () => {
        const undefinedData = await PublicationTestModule._deleteComment(undefined);
        const emptyData = await PublicationTestModule._deleteComment();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of delete comment', () => {
    const publication = new Publication({ id: 1, publisherId: 5, db });

    test('delete comment', async () => {
        const emptyData = await publication.deleteComment();
        const undefinedData = await publication.deleteComment(undefined, undefined);
        const incompleteData = await publication.deleteComment(2);
        const wrongData = await publication.deleteComment('2', 'image');
        const correctData = await publication.deleteComment(2, 41);

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
        expect(incompleteData).toBeNull();
        expect(wrongData).toBeNull();
        expect(correctData).toBeTruthy();
    });

    test('delete comment of non existing publication', async () => {
        const wrongPublication = new Publication({ id: 600, publisherId: 2, db });
        const nonExistingPublication = await wrongPublication.deleteComment(2, 13);
        expect(nonExistingPublication).toBeNull();
    });

    test('delete non existing comment', async () => {
        const wrongPublication = new Publication({ publisherId: 2, id: 600, db });
        const nonExistingPublication = await wrongPublication.deleteComment(2, 15);
        expect(nonExistingPublication).toBeNull();
    });

    test('delete non existiong comment by non exsiting commentator', async () => {
        const wrongPublication = new Publication({ publisherId: 15, id: 670, db });
        const nonExistingPublisher = await wrongPublication.deleteComment(15, 24);
        expect(nonExistingPublisher).toBeNull();
    });

    test('delete comment by non exsiting commentator', async () => {
        const wrongPublication = new Publication({ publisherId: 65, id: 3, db });
        const nonExistingPublisher = await wrongPublication.deleteComment(4, 1);
        expect(nonExistingPublisher).toBeNull();
    });
});

afterAll(() => {
    server.close();
});