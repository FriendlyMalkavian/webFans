const { PublicationTestModule, db, server } = require('../../app');
const Publication = require('../../application/modules/PublicationManager/Publication');

describe('test publication manager wrong data responses', () => {
    test('prepare method to add comment to publication', async () => {
        const undefinedData = await PublicationTestModule._addComment(undefined);
        const emptyData = await PublicationTestModule._addComment();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of add commetn publication', () => {
    const publication = new Publication({ id: 1, db });

    test('add Comment', async () => {
        const emptyData = await publication.addComment();
        const undefinedData = await publication.addComment(undefined, undefined);
        const incompleteData = await publication.addComment(2);
        const wrongData = await publication.addComment('2f', 3245);
        const correctData = await publication.addComment(2, 'some text');

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
        expect(incompleteData).toBeNull();
        expect(wrongData).toBeNull();
        expect(correctData).toBeTruthy();
    });

    test('add comment to non existing publication', async () => {
        const wrongPublication = new Publication({ id: 678, db });
        const nonExistingPublisher = await wrongPublication.addComment(2, 'some comment');
        expect(nonExistingPublisher).toBeNull();
    });

    test('add comment by non existing user', async () => {
        const wrongPublication = new Publication({ id: 4, db });
        const nonExistingPublisher = await wrongPublication.addComment(678, 'some comment');
        expect(nonExistingPublisher).toBeNull();
    });

    test('add comment by non existing user to non existing publication', async () => {
        const wrongPublication = new Publication({ id: 678, db });
        const nonExistingPublisher = await wrongPublication.addComment(678, 'some comment');
        expect(nonExistingPublisher).toBeNull();
    });
});

afterAll(() => {
    server.close();
});