const assert = require('chai').assert;
const {sendFive, orderDesc} = require('../controller/twitter-api.js');


describe('API', function(){
    var arr = [0,1,2,3,4,5,6,7,8,9];

    describe('Send Five', function(){
        it('It should only return 5 array items', function(){
            assert.lengthOf(sendFive(arr), 5);
        });

        it('It should return an Array', function(){
            assert.typeOf(sendFive(arr), 'array');
        })
    });

    describe('Order Desc', function(){
        it('It should return an array in Descending Order', function(){
            assert.equal(orderDesc(arr), arr.reverse());
        });

        it('It should return an Array', function(){
            assert.typeOf(orderDesc(arr), 'array');
        })
    });
})