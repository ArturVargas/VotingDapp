const Voting = artifacts.require('Voting.sol');

contract('Voting', () => {
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

    it('should has two options', () => {

    });
  });

  describe('Vote function', () => {
    
  })
})