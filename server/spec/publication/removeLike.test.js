const { PublicationTestModule, db, server } = require('../../app');
const Publication = require('../../application/modules/PublicationManager/Publication');

describe('test publication manager wrong data responses', () => {
    test('prepare method to remove like', async () => {
        const undefinedData = await PublicationTestModule._removePublicationLike(undefined);
        const emptyData = await PublicationTestModule._removePublicationLike();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of remove like', () => {
    const publication = new Publication({ id: 4, publisherId: 2, db });

    test('remove like from publication', async () => {
        const data = await publication.removeLike();
        expect(data).toBeTruthy();
    });

    test('remove like from non existing publication', async () => {
        const wrongPublication = new Publication({ publisherId: 2, id: 600, db });
        const nonExistingPublication = await wrongPublication.removeLike();
        expect(nonExistingPublication).toBeNull();
    });

    test('remove like from non existing publication by non exsiting publiser', async () => {
        const wrongPublication = new Publication({ publisherId: 15, id: 670, db });
        const nonExistingPublisher = await wrongPublication.removeLike();
        expect(nonExistingPublisher).toBeNull();
    });

    test('remove like from publication by non exsiting publiser', async () => {
        const wrongPublication = new Publication({ publisherId: 65, id: 5, db });
        const nonExistingPublisher = await wrongPublication.removeLike();
        expect(nonExistingPublisher).toBeNull();
    });
});

afterAll(() => {
    server.close();
});