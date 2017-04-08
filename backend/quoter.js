/**
 * Created by tim.cluff on 4/7/2017.
 */

var quotes = require('./quotes.json');

exports.getRandomOne = function() {
    var totalAmount = quotes.length;
    var rand = Math.ceil(Math.random() * totalAmount);
    return quotes[rand];
}
