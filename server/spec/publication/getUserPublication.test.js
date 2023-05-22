const { PublicationTestModule, db, server } = require('../../app');

describe('test publication manager wrong data responses', () => {
    test('prepare method to get user`s publications', async () => {
        const undefinedData = await PublicationTestModule._getUserPublications(undefined);
        const emptyData = await PublicationTestModule._getUserPublications();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });

});

describe('test method of get user`s publications', () => {
    const id = 2;

    test('get Publications', async () => {
        const emptyData = await db.getUserPublications();
        const undefinedData = await db.getUserPublications(undefined);
        const wrongData = await db.getUserPublications({ keep: 'sddsa', title: 'ok', smth: 1234 });
        const correctData = await db.getUserPublications(id);

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
        expect(wrongData).toBeNull();
        expect(correctData).toBeInstanceOf(Array);
    });
});

afterAll(() => {
    server.close();
});