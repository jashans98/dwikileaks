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
      }

      var account = accounts[0];

      LeakApp.contracts.Leak.deployed().then(function(instance) {
        leakInstance = instance;
        web3.eth.getTransactionCount(account, function(res) { console.log(res); });
        return leakInstance.addSubmittal(ipfsHash, LeakApp.admin, {from: account, value: web3.toWei(0.5, "ether")})
      }).then(function(result) {
        console.log(result);
      });
    })
  },

  fetchSubmissions: function(cb) {
    var leakInstance;
    console.log('fetching submissions...');
    LeakApp.contracts.Leak.deployed().then(function(instance) {
      leakInstance = instance;
      console.log('deployed contract');
      return leakInstance.fetchRecentSubmittals.call();
    }).then(function(submittals) {
      console.log('submittals: ', submittals);
      // JAMES, do your magic here
      // `submittals` is an array of strings that need to be displayed
      cb(submittals)
    }).catch(function(err) {
      console.log(err.message);
    });
  }
};



$(function() {
  $(window).load(function() {
    // App.init();
  });
});