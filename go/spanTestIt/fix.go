package main

func getBefore(nm, h1, h2 string) (before string) {
	before = "" +
		"describe('" + nm + "', () => {\n" +
		"    before(() => {\n" +
		"        cy.visit('" + h1 + "/user/login', { timeout: 50000 });\n" +
		"        cy.get('#userName').type('admin');\n" +
		"        cy.get('#password').type('wlh123456');\n" +
		"        cy.get('button[type=\"submit\"]').click();\n" +
		"        cy.get('h1[title=\"UEBA\"]').should('have.text', 'UEBA');\n" +
		"        Cypress.on('uncaught:exception', (err, runnable) => {\n" +
		"            return false\n" +
		"        })\n" +
		"\n" +
		"        cy.visit('" + h2 + "/user/login', { timeout: 50000 });\n" +
		"        cy.get('#userName').type('admin');\n" +
		"        cy.get('#password').type('wlh123456');\n" +
		"        cy.get('button[type=\"submit\"]').click();\n" +
		"        cy.get('h1[title=\"UEBA\"]').should('have.text', 'UEBA');\n" +
		"        Cypress.on('uncaught:exception', (err, runnable) => {\n" +
		"            return false\n" +
		"        })\n" +
		"    });\n" +
		"\n"
	return
}

var after = "" +
	"});\n"
