describe('Testing full APIs', () => {
  it.only('get token user', () => {
    cy.getTokenUser()
  }),
  it('login user', () => {
    
    cy.getTokenUser().should(() => {
      const token = JSON.parse(window.localStorage.getItem('token'))
      cy.request({
        method: 'GET',
        url: `${Cypress.env('endpoint')}/api/user`,
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(({status, body}) => {
        expect(status).to.eq(200)
        expect(body).to.eq(Cypress.env('username'))
      })
    })
  })
})