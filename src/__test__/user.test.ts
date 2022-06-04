import supertest from 'supertest'

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { signInJWT } from '../utils/jwt'
import { createUser, findUserById } from '../services/userService'
import createServer from '../utils/server'

const app = createServer()

const userPayload = {
  firstname: 'Erwin',
  lastname: 'Xu',
  email: 'testuser@gmail.com',
  password: 'erwinxu13',
  passwordConfirmation: 'erwinxu13'
}

const userPayloadPasswordNotSame = {
  firstname: 'Erwin',
  lastname: 'Xu',
  email: 'testuser@gmail.com',
  password: 'erwinxu13',
  passwordConfirmation: 'erwinxu1312'
}

const userPayload2 = {
  firstname: 'Erwin',
  lastname: 'Xu',
  email: 'testuser2@gmail.com',
  password: 'erwinxu13',
  passwordConfirmation: 'erwinxu13'
}

const passwordPayload = {
  password: 'test1234',
  passwordConfirmation: 'test1234'
}

const userId = new mongoose.Types.ObjectId().toString()

let realUser = {
  _id: '',
  firstname: '',
  lastname: '',
  email: '',
  verified: false,
  verificationCode: ''
}

describe('User', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect()

    await mongoose.connection.close()
  })
  describe('Register user but missing parameter', () => {
    it('Should get 400', async () => {
      await supertest(app).post('/api/user/').expect(400)
    })
  })
  describe('Register user but password is not the same with confirm password', () => {
    it('Should return 400', async () => {
      await supertest(app).post('/api/user/')
        .send(userPayloadPasswordNotSame)
        .expect(400)
    })
  })
  describe('Register user but email has been used', () => {
    it('Should get 403', async () => {
      const user = await createUser(userPayload)
      realUser = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        verified: true,
        verificationCode: user.verificationCode
      }

      await supertest(app).post('/api/user/')
        .send(userPayload)
        .expect(403)
    })
  })
  describe('Register user but success', () => {
    it('Should get 200, and expect success message', async () => {
      const { body, statusCode } = await supertest(app).post('/api/user/')
        .send(userPayload2)

      expect(statusCode).toBe(200)
      expect(body).toMatchObject({
        successMessage: 'Verification email has been sent to your email'
      })
    })
  })
  describe('Verification user but wrong user id', () => {
    it('Should get 404', async () => {
      await supertest(app).get(`/api/user/${userId}/${'23567232'}`).expect(404)
    })
  })
  describe('Verification user but invalid verification code', () => {
    it('Should get 403', async () => {
      await supertest(app).get(`/api/user/${realUser._id}/${'abc-123'}`).expect(403)
    })
  })
  describe('Verification user and success', () => {
    it('Should get 200 and data', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/user/${realUser._id}/${realUser.verificationCode}`)

      expect(statusCode).toBe(200)
      expect(body).toMatchObject({
        firstname: realUser.firstname,
        lastname: realUser.lastname,
        verified: true
      })
    })
  })
  describe('Get user profile but not authorized', () => {
    it('Should get 401', async () => {
      await supertest(app).get('/api/user/').expect(401)
    })
  })
  describe('Get user and success', () => {
    it('Should return 200 and profile', async () => {
      const token = signInJWT({ userId: realUser._id }, 'ACCESS_TOKEN_PRIVATE')

      const { body, statusCode } = await supertest(app).get('/api/user')
        .set('Cookie', `accessToken=${token}`)

      expect(statusCode).toBe(200)
      expect(body).toMatchObject({
        firstname: realUser.firstname,
        lastname: realUser.lastname,
        verified: true
      })
    })
  })
  describe('Update user but not authorized', () => {
    it('Should return 401', async () => {
      await supertest(app).put('/api/user').expect(401)
    })
  })
  describe('Update user but not sending any data', () => {
    it('Should return 400', async () => {
      const token = signInJWT({ userId: realUser._id }, 'ACCESS_TOKEN_PRIVATE')

      await supertest(app).put('/api/user')
        .set('Cookie', `accessToken=${token}`)
        .expect(400)
    })
  })
  describe('Update user but email is already used', () => {
    it('Should return 403', async () => {
      const token = signInJWT({ userId: realUser._id }, 'ACCESS_TOKEN_PRIVATE')

      await supertest(app).put('/api/user')
        .set('Cookie', `accessToken=${token}`)
        .send(userPayload2)
        .expect(403)
    })
  })
  describe('Update user and success', () => {
    it('Should return 200 and profile', async () => {
      const token = signInJWT({ userId: realUser._id }, 'ACCESS_TOKEN_PRIVATE')

      const { body, statusCode } = await supertest(app).put('/api/user')
        .set('Cookie', `accessToken=${token}`)
        .send({
          firstname: 'Erwin',
          lastname: 'Xu',
          email: 'nobodyuse@emai.com'
        })

      expect(statusCode).toBe(200)
      expect(body).toMatchObject({
        firstname: 'Erwin',
        lastname: 'Xu',
        email: 'nobodyuse@emai.com'
      })
    })
    describe('Request change password but not submitting email', () => {
      it('Should return 400', async () => {
        await supertest(app).post('/api/user/requestChangePassword').expect(400)
      })
    })
    describe('Request change password but email not exist in database', () => {
      it('Should return 400', async () => {
        await supertest(app).post('/api/user/requestChangePassword')
          .send({ email: 'nouse@email.com' })
          .expect(400)
      })
    })
    describe('Request change password but success', () => {
      it('Should return 200 and successMessage', async () => {
        const { body, statusCode } = await supertest(app).post('/api/user/requestChangePassword')
          .send({ email: 'nobodyuse@emai.com' })

        expect(statusCode).toBe(200)
        expect(body).toMatchObject({
          successMessage: 'An email has been sent to your email address'
        })
      })
    })
    describe('Change password but no data send', () => {
      it('Should return 400', async () => {
        await supertest(app).post(`/api/user/resetPassword/${userId}/qimZ55fNVKXRA4yr-jAoQ`).expect(400)
      })
    })
    describe('Change password but user not found', () => {
      it('Should return 404', async () => {
        await supertest(app).post(`/api/user/resetPassword/${userId}/qimZ55fNVKXRA4yr-jAoQ`)
          .send(passwordPayload)
          .expect(404)
      })
    })
    describe('Change password but verification code is not correct', () => {
      it('Should return 400', async () => {
        await supertest(app).post(`/api/user/resetPassword/${realUser._id}/qimZ55fNVKXRA4yr-jAoQ`)
          .send(passwordPayload)
          .expect(400)
      })
    })
    describe('Change password and success', () => {
      it('Should return 200 and get success meessage', async () => {
        const user = await findUserById(realUser._id)
        const { body, statusCode } = await supertest(app).post(`/api/user/resetPassword/${user._id}/${user.passwordResetCode}`)
          .send(passwordPayload)

        expect(statusCode).toBe(200)
        expect(body).toMatchObject({
          successMessage: 'Your password has been changed'
        })
      })
    })
  })
})
