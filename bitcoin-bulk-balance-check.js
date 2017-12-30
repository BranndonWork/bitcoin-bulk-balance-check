'use strict'
var _          = require('underscore');
var fs         = require('fs');
var deasync    = require('deasync');
var request    = require('request');

// INSTRUCTIONS
// Simply either change the name of the file on the next line to your own file containing an array of bitcoin addresses, or use the one provided as a sample.
var csv_file   = __dirname+'/burned.csv';

// Make Directories
	if (!fs.existsSync( __dirname + '/balances' )){
	    fs.mkdirSync(__dirname + '/balances' );
	    fs.mkdirSync(__dirname + '/balances/zero' );
	    fs.mkdirSync(__dirname + '/balances/non-zero' );
	}

var url_prefix = 'https://blockchain.info/q/addressbalance/';
var check_list = JSON.parse( fs.readFileSync(csv_file).toString() );

var waiting    = false;
var force_update_balance = false; // true or false if you want it to grab balances for addresses that you've already checked before

_.each(check_list, function(address, index){
	while (waiting) {
		deasync.sleep(1);
	}
	waiting = true;

	var check_url = url_prefix + address;

	var csv_file = __dirname + '/balances/'+address+'.txt';
	fs.stat(csv_file, function (err, stats) {
	   	if (err || force_update_balance) {
	   		// file doesn't exist
	   		var balance = 'n/a';

			request(check_url, function(err,response){
				balance = response.body;
			})

			while ( balance == 'n/a') {
				deasync.sleep(1);
			}

			if ( /^\d+$/.test(balance) ) {
				// it's a number
			} else {
				console.log('FAILED!', balance);
				process.exit(1);
			}

			// optional to save records to file.
				if ((balance*1) > 0) {
					// balance found!
					var balance_file = __dirname + '/balances/non-zero/'+address+'.txt';
				} else {
					var balance_file = __dirname + '/balances/zero/'+address+'.txt';
				}

				fs.writeFileSync(balance_file, balance);
				fs.writeFileSync(csv_file, balance);
			
			balance = (balance / 100000000).toFixed(8);
			console.log(address, balance);
			// deasync.sleep(250);
			waiting = false;
		} else {
	   		// file exists
	   		// console.log("Skipping "+address);
			var balance = fs.readFileSync(csv_file).toString();
			balance = (balance / 100000000).toFixed(8);
			console.log(address, balance);
			waiting = false;
		}

	});
	
});
setTimeout(function(){
	console.log("Done!");
}, 100);
