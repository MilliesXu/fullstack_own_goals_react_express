import supertest from 'supertest'
import createServer from '../utils/server'

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createUser } from '../services/userService'
import { signInJWT } from '../utils/jwt'
import SessionModel from '../models/sessionModel'
const app = createServer()
let user: any
const userPayload = {
  firstname: 'Erwin',
  lastname: 'Xu',
  email: 'testuser4@gmail.com',
  password: 'erwinxu13',
  passwordConfirmation: 'erwinxu13'
}

describe('Auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(mongoServer.getUri())
    user = await createUser(userPayload)
    user.verified = true
    await user.save()
  })
  afterAll(async () => {
    await mongoose.disconnect()

    await mongoose.connection.close()
  })
  describe('Login but without data', () => {
    it('Should return 400', async () => {
      await supertest(app).post('/api/session/').expect(400)
    })
  })
  describe('Login but wrong email', () => {
    it('Should return 400', async () => {
      await supertest(app).post('/api/session/')
        .send({
          email: 'test5@gmail.com',
          password: 'erwinxu13'
        })
        .expect(400)
    })
  })
  describe('Login but wrong password', () => {
    it('Should return 400', async () => {
      await supertest(app).post('/api/session/')
        .send({
          email: 'testuser4@gmail.com',
          password: 'erwinxu137'
        })
        .expect(400)
    })
  })
  describe('Login but success', () => {
    it('Should return 200 and data', async () => {
      const { body, statusCode } = await supertest(app).post('/api/session/')
        .send({
          email: user.email,
          password: 'erwinxu13'
        })
      expect(statusCode).toBe(200)
      expect(body).toMatchObject({
        firstname: user.firstname,
        lastname: user.lastname,
        verified: true
      })
    })
  })
  describe('Logout but not authrozied', () => {
    it('Should return 401', async () => {
      await supertest(app).delete('/api/session').expect(401)
    })
  })
  describe('Logout and success', () => {
    it('Should return 200 and successMessage', async () => {
      const session = await SessionModel.findOne({ user: user._id })
      const token = signInJWT({ userId: user._id, session: session?._id }, 'ACCESS_TOKEN_PRIVATE')
      const { body, statusCode } = await supertest(app).delete('/api/session')
        .set('Cookie', `accessToken=${token}`)

      expect(statusCode).toBe(200)
      expect(body).toMatchObject({
        successMessage: 'You have logged out'
      })
    })
  })
})
