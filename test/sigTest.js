const expect = require('chai').expect;
const sign = require('../index');

describe('test for ecverify', () => {
  it('should return an object', () => {
    const res = sign('hello', 'cea952fcb6463ed79eadbc9378050746784d71ba67df33f0d2dd3f234244ff51')
    expect(res).to.be.an('object');
  })
  it('should return an correct arguments', () => {
    const res = sign('hello', 'cea952fcb6463ed79eadbc9378050746784d71ba67df33f0d2dd3f234244ff51')
    expect(res.originalData).to.equal('hello');
    expect(res.hashedData).to.equal('0xcd87f010dd87d1d0b609e378c9b368623e1789d83d10a64721b4751948e8381d');
    expect(res.signature).to.equal('0x4d1f55c921a3cfc5538f83f02741f81fa846a9d555c4d193887163a8ec1a79654041a61368febe6cf814b6abc49f842f8ce059c18171dfd6e258f760a4ee05b21b');
  })
})

/*
  Verify in smart contract

  pragma solidity ^0.4.19;

  contract SigTest {
      address ethAddress = 0xd492CfD7740a0Db379fd55eD0084340eF425dde3;

      // should return true
      function verifySig(bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns(bool) {
          return ecrecover(hash, v, r, s) == ethAddress;
      }
  }

*/
