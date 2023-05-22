const { PublicationTestModule, db, server } = require('../../app');
const Publication = require('../../application/modules/PublicationManager/Publication');

describe('test publication manager wrong data responses', () => {
    test('prepare method to delte Publication', async () => {
        const undefinedData = await PublicationTestModule._deletePublication(undefined);
        const emptyData = await PublicationTestModule._deletePublication();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of delete publication', () => {
    const publication = new Publication({ publisherId: 2, id: 10, db });

    test('delete Publication', async () => {
        const data = await publication.delete();
        expect(data).toBeTruthy();
    });

    test('delete non existing publication', async () => {
        const wrongPublication = new Publication({ publisherId: 2, id: 600, db });
        const nonExistingPublication = await wrongPublication.delete();
        expect(nonExistingPublication).toBeNull();
    });

    test('delete non existiong publication by non exsiting publiser', async () => {
        const wrongPublication = new Publication({ publisherId: 15, id: 670, db });
        const nonExistingPublisher = await wrongPublication.delete();
        expect(nonExistingPublisher).toBeNull();
    });

    test('delete publication by non exsiting publiser', async () => {
        const wrongPublication = new Publication({ publisherId: 65, id: 3, db });
        const nonExistingPublisher = await wrongPublication.delete();
        expect(nonExistingPublisher).toBeNull();
    });
});

afterAll(() => {
    server.close();
});