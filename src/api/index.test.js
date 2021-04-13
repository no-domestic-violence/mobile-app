import MockAdapter from 'axios-mock-adapter';
import appApiClient, { apiInstance } from './index';

jest.unmock('axios');

describe('appApiClient', () => {
    const mockAppClient = new MockAdapter(apiInstance);

    beforeEach(async() => {
        mockAppClient.reset();
    });

    afterAll(() => {
        mockAppClient.restore();
    });

    it('should successfully fetch hotlines data by search param', async() => {
        // given
        const search = 'Berlin';
        const response = [{
                _id: '5f9db611c7cc881787ba620e',
                city: 'Berlin',
                country: 'Germany',
                organisation_name: "Nelson's Horsenettle",
                phone: '+49 543 513 8358',
                website: 'www.nelson.de',
                description: 'Everyday, 24/7',
            },
            {
                _id: '5f9db611c7cc881787ba620a',
                city: 'Berlin',
                country: 'Germany',
                organisation_name: 'Test name',
                phone: '+49 543 510 8358',
                website: 'www.test.de',
                description: 'Everyday, 24/7',
            },
            {
                _id: '5f9db611c7cc881787ba620b',
                city: 'Berlin',
                country: 'Germany',
                organisation_name: 'Test name 2',
                phone: '+49 543 514 8358',
                website: 'www.test2.de',
                description: 'Everyday, 24/7',
            },
        ];
        // when
        mockAppClient
            .onGet('/hotlines', { params: { searchTerm: search } })
            .reply(200, response);
        const hotlines = await appApiClient.getHotlinesData(search);
        // then
        expect(hotlines.data).toEqual(response);
    });

    it('should successfully fetch shelters data', async() => {
        // given
        const response = [{
            place_name: 'Test name',
            address: '10001, Berlin, TestStrasse, 1',
            contact_person: 'Jon Snow',
            phone: '+4900110000',
            locs: [12.2343, 13.7898],
        }, ];
        // when
        mockAppClient.onGet('/shelters').reply(200, {
            data: response,
        });
        const shelters = await appApiClient.getSheltersData();
        // then
        expect(shelters.data.data).toEqual(response);
    });

    it('should successfully fetch articles data', async() => {
        // given
        const response = [{
            title: 'Test title',
            author: 'Test User',
            text: 'Lorem ipsum',
            violence_type: ['emotional'],
            url_to_image: '"https://www.google.com/',
            // created_at: new Date(), TODO: fix handling dates
        }, ];
        // when
        mockAppClient.onGet('/articles').reply(200, {
            data: response,
        });
        const articles = await appApiClient.getArticlesData();
        // then
        expect(articles.data.data).toEqual(response);
    });

    it('should successfully fetch articles data by id', async() => {
        // given
        const response = [{
            title: 'Test title',
            author: 'Test User',
            text: 'Lorem ipsum',
            violence_type: ['emotional'],
            url_to_image: '"https://www.google.com/',
            // created_at: new Date(), TODO: fix handling dates
        }, ];
        const id = '6062e6501e80a94test40522';
        // when
        mockAppClient.onGet(`/articles/${id}`).reply(200, {
            data: response,
        });
        const article = await appApiClient.getArticleById(id);
        // then
        expect(article.data.data).toEqual(response);
    });

    it('should successfully send user data on POST to /login endpoint', async() => {
        const email = 'test@test.com';
        const password = '12345678';
        // given
        const user = {
            username: 'Celeste',
            email,
            contacts: [{}],
            role: 'basic',
        };
        const response = {
            success: true,
            message: 'Logged in successfully !',
            token: 'TestToken121212',
            user,
        };
        // when
        mockAppClient.onPost('/login', { email, password }).reply(201, response);
        const actual = await appApiClient.loginUser(email, password);
        // then
        expect(actual.data).toEqual(response);
    });

    it('should successfully send user data on POST to /signup endpoint', async() => {
        const email = 'test@test.com';
        const password = '12345678';
        const username = 'celeste';
        const token = 'TestToken121212';
        // given
        const user = {
            username,
            email,
            contacts: [{}],
            role: 'basic',
        };
        const response = {
            success: true,
            token,
            user,
        };
        // when
        mockAppClient
            .onPost('/signup', { email, password, username })
            .reply(201, response);
        const actual = await appApiClient.signupUser(email, password, username);
        // then
        expect(actual.data).toEqual(response);
    });
    it('should successfully delete user on DELETE request to /deleteUser endpoint', async() => {
        const username = 'celeste';
        const email = 'test@test.com';
        // given
        const user = {
            username,
            email,
            contacts: [{}],
            role: 'basic',
        };
        const response = {
            message: 'User was deleted',
            user,
        };
        // when
        mockAppClient
            .onDelete('/deleteUser', { params: { username } })
            .reply(200, response);
        const actual = await appApiClient.deleteUser(username);
        // then
        expect(actual.data).toEqual(response);
    });

    it('should successfully change password of user on POST request to /changePassword endpoint', async() => {
        const email = 'test@test.com';
        const password = '12345678';
        const oldPassword = '87654321';

        // given
        const response = {
            message: 'You updated the password',
        };
        // when
        mockAppClient
            .onPost('/changePassword', { email, oldPassword, password })
            .reply(200, response);
        const actual = await appApiClient.changePassword(
            email,
            oldPassword,
            password
        );
        // then
        expect(actual.data).toEqual(response);
    });

    it('should successully get sos contacts with username and token', async() => {
        // given
        const username = 'celeste';
        const token = 'faketoken123456';
        const response = [{
            _id: '2f213dsafdsfasdfdas34e',
            name: 'Soyoon',
            phone: '012341235215',
            message: 'help',
        }, ];
        mockAppClient.onGet(`/users/${username}/contacts`).reply(200, response, {
            headers: { 'auth-token': token },
        });
        // when
        const contacts = await appApiClient.getSosContacts(username, token);
        // then
        expect(contacts.data).toEqual(response);
    });
});