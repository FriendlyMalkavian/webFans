const { PublicationTestModule, db, server } = require('../../app');
const Publication = require('../../application/modules/PublicationManager/Publication');

describe('test publication manager wrong data responses', () => {
    test('prepare method to edit Publication', async () => {
        const undefinedData = await PublicationTestModule._editPublication(undefined);
        const emptyData = await PublicationTestModule._editPublication();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

describe('test method of edit publication', () => {
    const publication = new Publication({ publisherId: 2, id: 6, db });

    test('edit Publication', async () => {
        const emptyData = await publication.edit();
        const undefinedData = await publication.edit(undefined);
        const incompleteData = await publication.edit({});
        const absolutleyWrongData = await publication.edit({ keep: 'sddsa', smth: 1234 });
        const wrongData = await publication.edit({ keep: 'sddsa', title: 'ok', smth: 1234 });
        const correctData = await publication.edit({ title: 'edited', image: 'edited', description: 'edited' });
        const correctData2 = await publication.edit({ title: 'edited', image: 'edited'});

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
        expect(incompleteData).toBeNull();
        expect(absolutleyWrongData).toBeNull();
        expect(wrongData).toBeTruthy();
        expect(correctData).toBeTruthy();
        expect(correctData2).toBeTruthy();
    });

    test('edit non existing Publication', async () => {
        const wrongPublication = new Publication({ publisherId: 2, id: 600, db });
        const nonExistingPublication = await wrongPublication.edit({ title: 'ha-ha', image: 'he-he', description: 'ho-ho' });
        expect(nonExistingPublication).toBeNull();
    });

    test('edit non existiong Publication by non exsiting publiser', async () => {
        const wrongPublication = new Publication({ publisherId: 15, id: 670, db });
        const nonExistingPublisher = await wrongPublication.edit({ title: 'ha-ha', image: 'he-he', description: 'ho-ho' });
        expect(nonExistingPublisher).toBeNull();
    });

    test('edit Publication by non exsiting publiser', async () => {
        const wrongPublication = new Publication({ publisherId: 65, id: 3, db });
        const nonExistingPublisher = await wrongPublication.edit({ title: 'ha-ha', image: 'he-he', description: 'ho-ho' });
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