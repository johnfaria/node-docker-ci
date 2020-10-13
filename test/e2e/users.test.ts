describe('my-test', () => {
  it('it 1', async () => {
    const response = await global.testRequest.get('/')

    expect(response.status).toBe(200)
  })

  it('it 2', async () => {
    const response = await global.testRequest.get('/')
    expect(response.body).toEqual([])
  })
})
