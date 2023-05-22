const { PublicationTestModule, db, server } = require('../../app');
const Publication = require('../../application/modules/PublicationManager/Publication');

describe('test publication manager wrong data responses', () => {
    test('prepare method to edit comment of publication', async () => {
        const undefinedData = await PublicationTestModule._editComment(undefined);
        const emptyData = await PublicationTestModule._editComment();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of edit commetn publication', () => {
    const publication = new Publication({ id: 1, db });

    test('add Comment', async () => {
        const emptyData = await publication.editComment();
        const undefinedData = await publication.editComment(undefined, undefined);
        const incompleteData = await publication.editComment(2);
        const wrongData = await publication.editComment('2f', '55', 3245);
        const correctData = await publication.editComment(2, 9, 'edited text');

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
        expect(incompleteData).toBeNull();
        expect(wrongData).toBeNull();
        expect(correctData).toBeTruthy();
    });

    test('edit non existing comment of publication', async () => {
        const wrongPublication = new Publication({ id: 1, db });
        const nonExistingPublisher = await wrongPublication.addComment(2, 4, 'some comment');
        expect(nonExistingPublisher).toBeNull();
    });

    test('edit comment of non existing publication', async () => {
        const wrongPublication = new Publication({ id: 678, db });
        const nonExistingPublisher = await wrongPublication.addComment(2, 9, 'some comment');
        expect(nonExistingPublisher).toBeNull();
    });

    test('edit comment by non existing user', async () => {
        const wrongPublication = new Publication({ id: 1, db });
        const nonExistingPublisher = await wrongPublication.addComment(678, 17, 'some comment');
        expect(nonExistingPublisher).toBeNull();
    });

    test('edit comment by non existing user to non existing publication', async () => {
        const wrongPublication = new Publication({ id: 678, db });
        const nonExistingPublisher = await wrongPublication.addComment(678, 13, 'some comment');
        expect(nonExistingPublisher).toBeNull();
    });
});

afterAll(() => {
    server.close();
});