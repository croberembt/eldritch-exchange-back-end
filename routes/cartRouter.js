const express = require('express'); // using express middleware
const bodyParser = require('body-parser'); // using body-parser middleware
const Cart = require('../models/cart');  // using Cart model
const cartRouter = express.Router(); 

cartRouter.use(bodyParser.json()); // declaring that body-parser middleware is being used

cartRouter.route('/') 
    .get((req, res, next) => { // get request which is getting any/all documents that are in the collection
        Cart.find()
        .then(carts => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(carts);
        })
        .catch(err => next(err)); 
    })
    .post((req, res, next) => { // creating a new document in the cart collection
        Cart.create(req.body)
        .then(cart => {
            console.log('Cart Created ', cart);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cart);
        })
        .catch(err => next(err)); 
    })
    .put((req, res) => { // put request that is not supported
        res.statusCode = 403;
        res.end('PUT operation not supported on /carts');
    })
    .delete((req, res, next) => { // delete request that is deleting any documents in the cart collection
        Cart.deleteMany()
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err)); 
    })


cartRouter.route('/:cartId') 
    .get((req, res, next) => { // get request that is getting all carts with an id matching the requested id
        Cart.findById(req.params.cartId)
        .then(cart => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cart);
        })
        .catch(err => next(err));
    })
    .post((req, res) => { // post request that is not supported
        res.statusCode = 403;
        res.end(`POST operation not supported on /carts/${req.params.cartId}`); 
    })
    .put((req, res, next) => { // put request that is updating any carts that have an id matching the id requested
        Cart.findByIdAndUpdate(req.params.cartId, {
            $set: req.body
        }, { new: true })
        .then(cart => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cart); 
        })
        .catch(err => next(err)); 
    })
    .delete((req, res, next) => { // delete request that is deleting any carts that have an id matching the id requested
        Cart.findByIdAndDelete(req.params.cartId)
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err)); 
    })

module.exports = cartRouter;