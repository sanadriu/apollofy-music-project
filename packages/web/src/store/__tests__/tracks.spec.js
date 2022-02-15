import { addTrack } from '../tracks'
import configureStore from '../configureStore'
// import store from '../store'

describe("tracksSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  })

  const tracksSlice = () => store.getState().entities.tracks;

  it("should add the track to the store", async () => {
    // Arrange
    const track = { title: 'A real track title' }
    const savedTrack = { ...track, id: 1 };

    // Act
    await store.dispatch(addTrack(track));

    // Assert
    expect(tracksSlice().list).toContainEqual(savedTrack);
  })

  it("should not add the track to the store", async () => {
    // Arrange
    const track = { title: 'A real track title' }

    // Act
    await store.dispatch(addTrack(track));

    // Assert
    expect(tracksSlice().list).toHaveLength(0);
  })
})