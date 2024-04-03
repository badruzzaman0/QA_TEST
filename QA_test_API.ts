
// Validated all products request.
// Validates the response status code is 200.
// Validates the structure and content of the response body, ensuring it contains the expected properties and values.
describe('API Tests for Products', () => {
    it('Get all products', () => {
      cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products'
                })
        .then((response) => {
          // Assert status code
          expect(response.status).to.equal(200);
          expect(response.body).to.not.be.null;
          // Assert products
          const products = response.body.products;
          products.forEach((product: any) => {
            expect(product).to.have.property('id',1);
            expect(product).to.have.property('title','iPhone 9');
            expect(product).to.have.property('description', 'An apple mobile which is nothing like apple');
            expect(product).to.have.property('price', 549);
            expect(product).to.have.property('discountPercentage', 12.96);
			Assert other properties as needed
      
          });
  
          // Assert total, skip, and limit
          expect(response.body.total).to.be.a('number');
          expect(response.body.skip).to.be.a('number');
          expect(response.body.limit).to.be.a('number');
        });
    });
    
    it('Get single Product', () => {
        cy.request('https://dummyjson.com/products/1')
        .then((response) => {
          // Assert status code
          expect(response.status).to.equal(200);
  
          // Assert response body structure and content
          expect(response.body).to.have.property('id', 1);
          expect(response.body).to.have.property('title', 'iPhone 9');
          expect(response.body).to.have.property('description', 'An apple mobile which is nothing like apple');
          expect(response.body).to.have.property('price', 549);
          expect(response.body).to.have.property('discountPercentage', 12.96);
          expect(response.body).to.have.property('rating', 4.69);
          expect(response.body).to.have.property('stock', 94);
          expect(response.body).to.have.property('brand', 'Apple');
          expect(response.body).to.have.property('category', 'smartphones');
          expect(response.body).to.have.property('thumbnail').that.is.a('string');
          expect(response.body).to.have.property('images').that.is.an('array').and.not.empty;
        });
    })

    it('Search products', () =>{
        cy.request('https://dummyjson.com/products')
        .then((response) => {
          // Assert status code
          expect(response.status).to.equal(200);
          // Assert response body structure and content
          const allProducts = response.body.products
          expect(allProducts).to.have.property('id', 1);
          expect(allProducts).to.have.property('title', 'iPhone 9');
          expect(allProducts).to.have.property('description').that.is.a('string');
          expect(allProducts).to.have.property('price', 549);
          // Add more assertion as needed
          expect(response.body).to.have.property('total', 4);
          expect(response.body).to.have.property('skip', 0);
          expect(response.body).to.have.property('limit', 4);
		  Assert other properties as needed
        });
    })

    it('Limit and Skip products', () =>{
        cy.request('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
      .then((response) => {
        // Assert status code
        expect(response.status).to.equal(200);

        // Assert response body structure and content
        expect(response.body.products).to.have.property('id',1);
        // Ensure that other properties are not present in the response
        expect(response.body.products).to.not.have.property('description');
        expect(response.body).to.have.property('total', 100);
        expect(response.body).to.have.property('skip', 10);
        expect(response.body).to.have.property('limit', 10);
		Assert other properties as needed
      });
    })

    it('Get all products categories', ()=>{
        cy.request('https://dummyjson.com/products/categories')
        .then((response) => {
          // Assert status code
          expect(response.status).to.equal(200);
  
          // Assert response body structure and content
          expect(response.body).to.have.value('smartphones')
          expect(response.body).to.be.an('array')
          response.body.forEach((category: string) => {
            expect(category).to.be.a('string');
          });
        });
    })

    it('Get products of a category', () =>{
        cy.request('https://dummyjson.com/products/category/smartphones')
      .then((response) => {
        // Assert status code
        expect(response.status).to.equal(200);

        // Assert response body structure and content
        expect(response.body.products).to.have.property('title','iPhone 9')
        expect(response.body).to.have.property('total', 5)
        // Assert other properties as needed
        });
    })

    it('Add a new product', ()=>{
          // Send a POST request to add the product
          cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/products/add',
            headers: { 'Content-Type': 'application/json' },
            body: {'title': 'BMW Pencil'},
          }).then((response) => {
            // Assert status code
            expect(response.status).to.equal(200);
      
            // Assert response body structure and content
            expect(response.body).to.have.property('id', 101);
            expect(response.body).to.have.property('title', 'BMW Pencil');
         });
    })

    it('Update a product', ()=>{
          // Send a PUT or PATCH request to update the product
          cy.request({
            method: 'PUT',
            url: 'https://dummyjson.com/products/1',
            headers: { 'Content-Type': 'application/json' },
            body: {'title': 'iPhone Galaxy +1'}
          }).then((response) => {
            // Assert status code
            expect(response.status).to.equal(200);
      
            // Assert response body structure and content
            expect(response.body).to.have.property('id', 1);
            expect(response.body).to.have.property('brand', 'Apple');
            expect(response.body).to.have.property('category', 'smartphones');
            // Add more assertions as needed
          });
    })

    it('Delete a product', ()=>{
	// Send a DELETE request to delete the product
        cy.request('DELETE', 'https://dummyjson.com/products/1').then((response) =>{
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', 1);
            expect(response.body).to.have.property('brand', 'Apple');
			expect(response.body).to.have.property('isDeleted', true);

        })
    })
  });