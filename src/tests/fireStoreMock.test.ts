export default class FirestoreMock {
  private mockCollection: any;
  private mockWhere: any;
  private mockOrderBy: any;
  private mockAdd: any;
  private mockGet: any;
  private mockOnSnaptshot: any;
  private mockcreateUserWithEmailAndPassword: any;
  private mocksignInWithEmailAndPassword: any;

  constructor () {
    // mocked methods that return the class
    this.mockCollection = jest.fn(() => this)
    this.mockWhere = jest.fn(() => this)
    this.mockOrderBy = jest.fn(() => this)

    // methods that return promises
    this.mockAdd = jest.fn(() => Promise.resolve(this.mockAddReturn))
    this.mockGet = jest.fn(() => Promise.resolve(this.mockGetReturn))
    this.mockcreateUserWithEmailAndPassword = jest.fn(() => { return Promise.resolve({email: "test@test.com", emailVerified: true, displayName: "test"}) })
    this.mocksignInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve({email: "test@test.com", emailVerified: true, displayName: "test"})
})

    // methods that accepts callbacks
    this.mockOnSnaptshot = jest.fn((success, error) => success(this.mockOnSnaptshotSuccess))

    // // return values
    this.mockAddReturn = null
    this.mockGetReturn = null
    this.mockOnSnaptshotSuccess = null
  }

  collection (c: any) {
    return this.mockCollection(c)
  }

  where (...args: any) {
    return this.mockWhere(...args)
  }

  createUserWithEmailAndPassword(...args: any) {
    return this.mockcreateUserWithEmailAndPassword(...args);
  }

  signInWithEmailAndPassword(...args: any) {
    return this.mocksignInWithEmailAndPassword(...args)
  }

  orderBy (...args: any) {
    return this.mockOrderBy(...args)
  }

  add (a: any) {
    return this.mockAdd(a)
  }

  get () {
    return this.mockGet()
  }

  onSnapshot (success: any, error: any) {
    return this.mockOnSnaptshot(success, error)
  }

  public set mockAddReturn (val: any) {
    this.mockAddReturn = val
  }

  public set mockGetReturn (val: any) {
    this.mockGetReturn = val
  }

  public set mockOnSnaptshotSuccess (val: any) {
    this.mockOnSnaptshotSuccess = val
  }

  reset () {
    // reset all the mocked returns
    this.mockAddReturn = null
    this.mockGetReturn = null
    this.mockOnSnaptshotSuccess = null

    // reset all the mocked functions
    this.mockCollection.mockClear()
    this.mockWhere.mockClear()
    this.mockOrderBy.mockClear()
    this.mockAdd.mockClear()
    this.mockGet.mockClear()
  }
}


describe("nothing", () => {
  it("does nothing", () => {
    expect(null).toEqual(null);
  })
})