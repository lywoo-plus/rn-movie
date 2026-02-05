export const authService = {
  async login({ email, password }: { email: string; password: string }) {
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000)
    })

    if (email !== 'lywoo@gmail.com' || password !== 'arstarst') {
      throw new Error('Invalid credentials')
    }

    return {
      token: '123456',
      user: {
        email,
      },
    }
  },
}
