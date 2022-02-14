import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { signUpWithGoogleRequest } from '../auth'
import configureStore from '../configureStore'
// import store from '../store'

describe("authSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  })

  const authSlice = () => store.getState().entities.auth;

  it("should add the user to the store if it's saved to the server", async () => {
    // Arrange
    const user = { name: 'realDonaldTrump' }
    const savedUser = { ...user, id: 1 };
    fakeAxios.onPost('/users').reply(200, savedUser)

    // Act
    await store.dispatch(signUpWithGoogleRequest(user));

    // Assert
    expect(authSlice().currentUser).toContainEqual(savedUser);
  })
})