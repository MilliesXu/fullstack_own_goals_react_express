import jwt from 'jsonwebtoken'

export const signInJWT = (object: Object, keyName: 'ACCESS_TOKEN_PRIVATE' | 'REFRESH_TOKEN_PRIVATE', options?: jwt.SignOptions | undefined) => {
  const signKey = process.env[keyName] as string

  return jwt.sign(object, signKey, {
    ...(options && options),
    expiresIn: process.env.ACCESS_TOKEN_EXPR as string,
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token: string, keyName: 'ACCESS_TOKEN_PUBLIC' | 'REFRESH_TOKEN_PUBLIC') => {
  const publicKey = process.env[keyName] as string

  try {
    const decoded = jwt.verify(token, publicKey)

    return decoded
  } catch (error: any) {
    return null
  }
}
