const { expectRevert, time } = require('@openzeppelin/test-helpers');
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
      assert(adminAddress != '');
    });

    it('should has two options', async () => {
      const options = await votingInstance.getOptions();
      assert.equal(options, 2);
    });
  });

  describe('Vote function', () => {
    it('should the voter has an account', async () => {
      const voter = await votingInstance.voters(accounts[1]);
      assert(voter.voterAddr.length > 0);
    });

    it('should vote', async () => {
      await votingInstance.vote(1);
      const voter = await votingInstance.getVoterDetails()
      
      assert.equal(voter[0], true);
    });

    it('should the voter not vote more than once', async () => {
      await expectRevert(
        votingInstance.vote(0),
        'Solo se permite emitir un voto por persona...!!!'
      );
    });

    it('should not vote after end date', async () => {
      await time.increase(90000);
      await expectRevert(
        votingInstance.vote(0),
        'El periodo de votación finalizo'
      );
    });
  });

  describe('Results function', () => {
    it('should return total votes emmited', async () => {
      const results = await votingInstance.results();

      assert.equal(results[0], 1);
    });

    // it('should return total votes for options', async () => {
    //   const results = await votingInstance.results();

    //   console.log(results);
    // })
  });
});