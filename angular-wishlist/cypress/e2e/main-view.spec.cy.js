describe('ventana principal', () => {
    it('tiene encabezado correcto y en español por defecto', () => {
      cy.visit('http://localhost:4200');
      cy.contains('angular-wishlist');
      cy.get('h1 b').should('contain', 'HOLA es');
    });

    it('tiene color de fondo blanco', () => {
      cy.visit('http://localhost:4200');

      cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('tiene hipervínculos', () => {
      cy.visit('http://localhost:4200');

      cy.get('a').should('exist');
    });
});