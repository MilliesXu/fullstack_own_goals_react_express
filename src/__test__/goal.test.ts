import supertest from 'supertest'

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { signInJWT } from '../utils/jwt'
import { createGoal } from '../services/goalService'
import createServer from '../utils/server'

const app = createServer()

const userId = new mongoose.Types.ObjectId().toString()
const userId2 = new mongoose.Types.ObjectId().toString()
const goalId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  userId
}

describe('goals', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect()

    await mongoose.connection.close()
  })
  describe('get goals route', () => {
    describe('given the goals does not authorized', () => {
      it('should return 401', async () => {
        await supertest(app).get('/api/goals/')
          .expect(401)
      })
    })
    describe('give the goals does not exist', () => {
      it('should return empty array', async () => {
        const token = signInJWT(userPayload, 'ACCESS_TOKEN_PRIVATE')
        console.log(token)

        await supertest(app).get('/api/goals/')
          .set('Cookie', `accessToken=${token}`)
          .expect([])
      })
    })
    describe('give the goals does exist', () => {
      it('should return 200 and the goals', async () => {
        const token = signInJWT(userPayload, 'ACCESS_TOKEN_PRIVATE')
        const goal = await createGoal({ text: 'This is goal One' }, userId)

        const { body, statusCode } = await supertest(app).get('/api/goals/')
          .set('Cookie', `accessToken=${token}`)

        expect(statusCode).toBe(200)
        expect(body.some((data: any) => data._id === goal._id))
      })
    })
    describe('Create the goal but not authorized', () => {
      it('should return 400', async () => {
        await supertest(app).post('/api/goals/').expect(401)
      })
    })
    describe('Crate the goal but not passing text', () => {
      it('Should return 400', async () => {
        const token = signInJWT(userPayload, 'ACCESS_TOKEN_PRIVATE')

        await supertest(app).post('/api/goals')
          .set('Cookie', `accessToken=${token}`)
          .expect(400)
      })
    })
    describe('Create the goal and success', () => {
      it('Should return 400', async () => {
        const token = signInJWT(userPayload, 'ACCESS_TOKEN_PRIVATE')

        const { body, statusCode } = await supertest(app).post('/api/goals')
          .set('Cookie', `accessToken=${token}`)
          .send({ text: 'This is goal one' })

        expect(statusCode).toBe(200)
        expect(body).toMatchObject({
          goal: { text: 'This is goal one', user: userId },
          successMessage: 'Successfully create goal'
        })
      })
    })
    describe('Delete the goal but not authorized', () => {
      it('Should return 401', async () => {
        await supertest(app).delete(`/api/goals/${goalId}`).expect(401)
      })
    })
    describe('Delete the goal but product not found', () => {
      it('Should return 404', async () => {
        const token = signInJWT(userPayload, 'ACCESS_TOKEN_PRIVATE')

        await supertest(app).delete(`/api/goals/${goalId}`)
          .set('Cookie', `accessToken=${token}`)
          .expect(404)
      })
    })
    describe('Delete the goal but not the owner', () => {
      it('Should return 403', async () => {
        const token = signInJWT(userPayload, 'ACCESS_TOKEN_PRIVATE')
        const goal = await createGoal({ text: 'This is goal One' }, userId2)

        await supertest(app).delete(`/api/goals/${goal._id}`)
          .set('Cookie', `accessToken=${token}`)
          .expect(403)
      })
    })
    describe('Delete the goal and success', () => {
      it('Should return 200 and successMessage', async () => {
        const token = signInJWT(userPayload, 'ACCESS_TOKEN_PRIVATE')
        const goal = await createGoal({ text: 'This is goal One' }, userId)

        const { body, statusCode } = await supertest(app).delete(`/api/goals/${goal._id}`)
          .set('Cookie', `accessToken=${token}`)

        expect(statusCode).toBe(200)
        expect(body).toMatchObject({
          successMessage: 'Successfully delete goal'
        })
      })
    })
  })
})
