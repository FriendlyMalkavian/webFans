const { UserTestModule, server } = require('../../app');

describe('test publication manager wrong data responses', () => {
    test('prepare method to delte comment', async () => {
        const undefinedData = await UserTestModule._deleteUser(undefined);
        const emptyData = await UserTestModule._deleteUser();

        expect(emptyData).toBeNull();
        expect(undefinedData).toBeNull();
    });
});

afterAll(() => {
    server.close();
});