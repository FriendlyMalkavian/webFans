const { PublicationTestModule, db, server } = require('../../app');

describe('test publication manager wrong data responses', () => {
    test('prepare method to get liked publications', async () => {
        const undefinedData = await PublicationTestModule._getLikedPublications(undefined);
        const emptyData = await PublicationTestModule._getLikedPublications();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of get liked user`s publications', () => {
    const id = 2;

    test('get liked Publications', async () => {
        const emptyData = await db.getLikedPublications();
        const undefinedData = await db.getLikedPublications(undefined);
        const wrongData = await db.getLikedPublications({ keep: 'sddsa', title: 'ok', smth: 1234 });
        const correctData = await db.getLikedPublications(id);

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
        expect(wrongData).toBeNull();
        expect(correctData).toBeInstanceOf(Array);
    });
});

afterAll(() => {
    server.close();
});