LeakApp = {
  web3Provider: null,
  contracts: {},

  // set up web3 to interact with ethereum network
  init: function() {
    console.log('initializing web3');
    if (typeof web3 !== 'undefined') {
      LeakApp.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      LeakApp.web3Provider = 
      new web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(LeakApp.web3Provider);
    }

    return LeakApp.initContract();
  },

  

  // init contract
  initContract: function() {
    $.getJSON('Leak.json', function(data) {
      console.log('fetched artifact');
      var LeakArtifact = data;
      LeakApp.contracts.Leak = TruffleContract(LeakArtifact);
      // set the provider for our contract
      LeakApp.contracts.Leak.setProvider(LeakApp.web3Provider);

      // set up an instance
      LeakApp.contracts.Leak.deployed().then(function(instance) {
        LeakApp.leakInstance = instance;

        return instance.admin.call();
      }).then(function(adminHash) {
        LeakApp.admin = adminHash;
      });

      // now use the contract to fetch our hash data
      return LeakApp.fetchSubmissions();
    });

    

    return LeakApp.bindEvents();
  },

  bindEvents: function() {
    // TODO: implement
    // This is supposed to handle dom interaction
    // calls the function -> to download the file
  },

  fetchFromIPFS: function(ipfsHash) {
    // TODO: implement
  },

  handleSubmit: function(ipfsHash) {

    var leakInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
        return;
      }

      var account = accounts[0];

      LeakApp.contracts.Leak.deployed().then(function(instance) {
        leakInstance = instance;
        web3.eth.getTransactionCount(account, function(err, res) { 
          console.log(res); 
          return leakInstance.addSubmittal(ipfsHash, LeakApp.admin, {from: account, value: web3.toWei(0.5, "ether")});
        });
      }).then(function(result) {
        
        for (var i = 0; i < result.logs.length; ++i) {
          var log = result.logs[i];

          if (log.event == 'Delivered') {
            // success! :)
            // update the DOM telling the user we're done
          }
        }
      });
    })
  },

  fetchSubmissions: function(cb) {
    var leakInstance;
    console.log('fetching submissions...');
    LeakApp.contracts.Leak.deployed().then(function(instance) {
      leakInstance = instance;
      console.log('deployed contract');
      LeakApp.data = [];

      for (var i = 0; i < 20; i++) {
        leakInstance.fetchHash.call(i).then(function(hash) {
          if (hash !== '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
            LeakApp.data.push(hash);

          if (i === 19) cb(LeakApp.data)
        });
      }
      
    })
  }
};



$(function() {
  $(window).load(function() {
    LeakApp.init();
  });
});