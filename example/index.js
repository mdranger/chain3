var HttpProvider =  require('web3-providers-http');
var Chain3 = require('../packages/chain3')
var utils =  require('../packages/chain3-utils')

var httpProvider = new HttpProvider('http://localhost:8545');
var chain3 = new Chain3(httpProvider);

chain3.mc.net.getNetworkType().then(function(res){         
		console.log('network type:'+res);  //res.result);    
},function(err){
	console.log('get NetworkType,'+err);
});


chain3.mc.getAccounts().then(function(results){
	console.log("Total accounts :", results.length);
	results.forEach(function(res,index){
		console.log('account['+index+'] :'+res);
	});
},function(err){
	console.log('getAccount,'+err);
});

chain3.mc.getAccounts().then(function(results){            
	return chain3.mc.getBalance(results[0]);          
}).then(function(balance){
		console.log('balance:'+balance.toString(10));
		console.log(utils.fromSha(balance.toString(),'mc')+ ' mc');
		console.log(utils.fromSha(balance.toString(),'Gsha'), 'Gsha');
},function(err){
	console.log('getBalance,'+err);
});

arg = {
        from: '0xEc27B756BCBFd129C392AbEb4195069560710DD0', // checksum address
        to: '0xeef152b480a0c8eaeeeea9e0a711a8de09526f51', // checksum address
        value: '1234567654321',
        gasPrice: '324234234234'
    };
chain3.mc.sendTransaction(arg).then(function(result){
	console.log('send tx success,tx hash:'+result.transactionHash);
},function(err){
	console.log('send tx ,'+err);
});






