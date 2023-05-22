const { PublicationTestModule, db, server } = require('../../app');
const Publication = require('../../application/modules/PublicationManager/Publication');

describe('test publication manager wrong data responses', () => {
    test('prepare method to add Publication', async () => {
        const undefinedData = await PublicationTestModule._addPublication(undefined);
        const emptyData = await PublicationTestModule._addPublication();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of add publication', () => {
    const publication = new Publication({ publisherId: 1, db });

    test('add Publication', async () => {
        const emptyData = await publication.add();
        const undefinedData = await publication.add(undefined);
        const incompleteData = await publication.add('title', 'image');
        const wrongData = await publication.add(null, 'image', 142);
        const correctData = await publication.add('title', 'image', 'des');

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
        expect(incompleteData).toBeNull();
        expect(wrongData).toBeNull();
        expect(correctData).toBeTruthy();
    });

    test('add Publication by non existing publisher', async () => {
        const wrongPublication = new Publication({ publisherId: 45, db });
        const nonExistingPublisher = await wrongPublication.add('title', 'image', 'des');
        expect(nonExistingPublisher).toBeNull();
    });

    afterAll(() => {
        const expectedPublication = {
            id: expect.any(Number),
            publisherId: expect.any(Number),
            title: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            date: expect.any(Number),
            raito: expect.any(Number),
            comments: expect.any(Object),
            likes: expect.any(Number),
            bookmarks: expect.any(Number),
        };
        expect(publication.get()).toMatchObject(expectedPublication);
    });
});

afterAll(() => {
    server.close();
});