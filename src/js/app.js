App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../projects.json', function(data) {
      var projectsRow = $('#projectsRow');
      var projectTemplate = $('#projectTemplate');

      console.log('projects data -> ', data);

      for (i = 0; i < data.length; i ++) {
        projectTemplate.find('.panel-title').text(data[i].title);
        projectTemplate.find('img').attr('src', data[i].picture);
        projectTemplate.find('.project-artist').text(data[i].artist);
        projectTemplate.find('.project-goal').text(data[i].goal);
        projectTemplate.find('.project-amount-raised').text(data[i].amount_raised);
        projectTemplate.find('iframe').attr('src', data[i].demo_url);
        projectTemplate.find('.btn-invest').attr('data-id', data[i].id);

        projectsRow.append(projectTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
	if ( typeof web3 !== 'undefined' ) {
		App.web3Provider = web3.currentProvider;
		web3 = new Web3(web3.currentProvider);
	} else {
		App.web3Provider = new web3.providers.HttpProvider("http://localhost:8545");
		web3 = new Web3(App.web3Provider);
	}

    return App.initContract();
  },

  initContract: function() {
	$.getJSON('Investment.json', function(data) {
		//get the necessary contract artifact file and instnatiate it with truffle-contract.
		var InvestmentArtifact = data;
		App.contracts.Investment = TruffleContract(InvestmentArtifact);

		//set the provider for our contract.
		App.contracts.Investment.setProvider(App.web3Provider);

		//user our contract to retrieve and mark the invested projects.
		return App.markInvested();
	});
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-invest', App.handleInvest);
  },

  handleInvest: function() {
    event.preventDefault();

    var projectId = parseInt($(event.target).data('id'));

  	var projectInstance;

  	web3.eth.getAccounts(function(error, accounts) {
  		if (error) {
  			console.log(error);
  		}

  		var account = accounts[0];

  		App.contracts.Investment.deployed().then(function(instance){
  			projectInstance = instance;

  			return projectInstance.invest(projectId, 50, { from : account});
  		}).then(function(result) {
  			return App.markInvested();
  		}).catch(function(err){
  			console.log(err.message);
  		});
  	});
  },

  markInvested: function(projects, account) {
  	var projectInstance;

  	App.contracts.Investment.deployed().then(function(instance) {
      projectInstance = instance;

  		return projectInstance.getInvestors.call();
  	}).then(function(investors) {

  		for ( i = 0; i < investors.length; i++) {
  			if (investors[i] !== '0x0000000000000000000000000000000000000000'){
  				$('.panel-project').eq(i).find('button').text('Successfully invested 20 ETH').attr('disabled', true);
  			}
  		}
      console.log(projectInstance);
      return projectInstance.getAmountRaised.call();
    }).then(function(amount) {
        console.log(amount);
      // $('.amount_raised').text(amount);
    })
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
