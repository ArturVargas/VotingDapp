const Voting = artifacts.require('Voting.sol');

contract('Voting', (accounts) => {
  let votingInstance = null;

  before(async () => {
    votingInstance = await Voting.deployed();
  });

  describe('Voting deployed successfully', () => {
    it('should be the address different to null or undefined', async () => {
      const address = await votingInstance.address;

      assert(address.length > 0);
      assert(address != '');
    });
  });

  describe('Initialize variables in Constructor', () => {
    it('should be the admin address different to null or undefined', async () => {
      const adminAddress = await votingInstance.admin();

      assert(adminAddress.length > 0);
      assert(address != '');
    });

    it('should has two options', async () => {
      const options = await votingInstance.getOptions();
      assert.equal(options, 2);
    });
  });

  describe('Vote function', () => {
    it('should the voter has an account', async () => {
      const voter = await votingInstance.getVoterDetails();
      assert(voter.voterAddr.length > 0);
    });

    it('should not vote after end date', async () => {
      const voter = await votingInstance.vote(0);
    
    });

    it('should the voter not vote more than once', () => {

    })
  });

  describe('Results function', () => {
    
  })
})