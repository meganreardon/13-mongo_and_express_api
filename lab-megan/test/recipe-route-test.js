'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Recipe = require('../model/recipe.js');
const PORT = process.env.PORT || 3000;

const MONGODB_URI = 'mongodb://localhost/recipe';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleRecipe = {
  title: 'test recipe title'
};

describe('Recipe Routes', function() {

// ----------
// POST tests
// ----------

  describe('POST: /api/recipe', function() {

    describe('with a valid body', function() {
      after( done => {
        if (this.tempRecipe) {
          Recipe.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a recipe', done => {
        request.post(`${url}/api/recipe`)
        .send(exampleRecipe)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('test recipe title');
          this.tempRecipe = res.body;
          done();
        });
      });

    });
  });

// ---------
// GET tests
// ---------

  describe('GET: /api/recipe/:id', function() {

    describe('with a valid body', function() {
      before( done => {
        exampleRecipe.created = new Date();
        new Recipe(exampleRecipe).save()
        .then( recipe => {
          this.tempRecipe = recipe;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleRecipe.created;
        if(this.tempRecipe) {
          Recipe.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a recipe', done => {
        request.get(`${url}/api/recipe/${this.tempRecipe._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('test recipe title');
          done();
        });
      });

    });
  });

// ---------
// PUT tests
// ---------

  // describe('PUT: /api/recipe:id', function() { // orig
  describe('PUT: /api/recipe', function() {

    describe('with a valid body', function() {
      before( done => {
        exampleRecipe.created = new Date();
        // console.log('::: exampleRecipe in PUT test is:', exampleRecipe);
        new Recipe(exampleRecipe).save()
        .then( recipe => {
          this.tempRecipe = recipe;
          // console.log('::: HERE tempRecipe in PUT test is:', this.tempRecipe);
          // console.log('::: HERE exampleRecipe is:', exampleRecipe);
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleRecipe.created;
        if(this.tempRecipe) {
          Recipe.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a recipe', done => {
        let updateRecipe = { title: 'new title' }; // NOTE: need new Date?
        request.put(`${url}/api/recipe/${this.tempRecipe._id}`)
        .send(updateRecipe)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          console.log('::: inside recipe-route-test.js, res.body is', res.body);
          // console.log('::: inside recipe-route-test.js, res.params.id is', res.params.id); // TODO: WHY DO WE NOT REACH THIS?
          // console.log('::: res.body.id is', res.body.id);
          console.log('::: inside recipe-route-test.js, this.tempRecipe.id is', this.tempRecipe.id);
          console.log('::: inside recipe-route-test.js, res.body.id is', res.body._id);
          expect(res.body._id).to.equal(this.tempRecipe.id);
          for (var prop in updateRecipe) {
            expect(res.body[prop]).to.equal(updateRecipe[prop]);
          }
          done();
        });
      });

    });
  });

});
