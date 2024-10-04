/*
describe('MongoConferenceRepository', () => {
  let app: TestApp
  let model: Model<MongoConference.ConferenceDocument>
  let repository: MongoConferenceRepository

  beforeAll(async () => {
      app = new TestApp()
      await app.setup()

      model = MongoConference.ConferenceModel
      await model.deleteMany({})

      repository = new MongoConferenceRepository(model)

      const record = new model({
          _id: testUsers.johnDoe.props.id,
          email: testUsers.johnDoe.props.emailAdress,
          password: testUsers.johnDoe.props.password
      })

      await record.save()
  })

  afterAll(async () => {
      await app.teardown()
  })



  describe('Scenario: create conference', () => {
      it('should: create a new conference', async () => {
          await repository.create(testConference.conference1)

          const fetchedConference = await model.findOne({_id: testConference.conference1.props.id})
          expect(fetchedConference).not.toBeNull()
          expect(fetchedConference?.toObject()).toEqual({
              _id: testConference.conference1.props.id,
              organizerId: testConference.conference1.props.organizerId,
              title: testConference.conference1.props.title,
              startDate: testConference.conference1.props.startDate,
              endDate: testConference.conference1.props.endDate,
              seats: testConference.conference1.props.seats,
              __v: 0
          })
      })
  })
})


 */