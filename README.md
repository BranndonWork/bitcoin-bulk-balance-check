# Bitcoin Bulk Balance Check Tool
A tool to check the address balance for multiple bitcoin addresses.

To use it

  1. Create a file containing a javascript formatted array of addresses that you want to check.  
  `(example: ['address1','address2'])`

  2. Save it in the same directory as bitcoin-bulk-balance-check.js
	
  3. Update the filename on line 9 of bitcoin-bulk-balance-check.js with the filename with your filename.
	
  4. RUN: `npm install` from within the bitcoin-bulk-balance-check directory to configure the script
	
  5. RUN: `npm start` from within the bitcoin-bulk-balance-check directory to start the script


Settings that can be changed  

	var address_list_filename = 'burned.csv'; // REPLACE THIS FILENAME WITH YOUR FILENAME
	var save_to_file          = true; // save results to file
	var log_to_console        = true; // show results in console
	var delay_between_checks  = 0; // 1000 is one second
	var force_update_balance  = false; // true or false if you want it to grab balances for addresses that you've already checked before
	var exit_on_failure       = true; // true or false if you want the script to exit on a invalid response from the balance query


Notice: blockchain.info has rate limits. Set the delay value above to the number in miliseconds to wait between each address balance check

Information:   
To buy bitcoin, and put some Satoshi's in both of our accounts, sign up at [coinbase ($10 free when you spend your first $100)](https://g-o.co/coinbase).
To buy bitcoin, but you don't want to use the referral link, sign up at [coinbase](https://www.coinbase.com/join).  
To throw bitcoin at me, [do it here](https://blockchain.info/address/1Bitcoin4MFhhKCvkh2ajrZNAEwoRwiuR2).

