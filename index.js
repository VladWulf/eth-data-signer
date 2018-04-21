/*
  Copyright 2018, Vladimir Agaev, All rights reserved.
*/

const keccak = require('keccak');
const secp256k1 = require('secp256k1');

/**
  * Signs a message with a private key in an ethereum compatible way
  * @param {string} _msg - message to sign
  * @param {string} _privateKey - ethereum private key
  * @param {bool} [_splitSignature = false] - whether the signature should be split in v r s or not
*/
function sign(_data, _privateKey, _splitSignature = false) {
  if(_privateKey.length < 64) throw new Error('Private Key too small');
  if(_privateKey.substring(0,2) === '0x') _privateKey = _privateKey.substring(2);
  _privateKey = Buffer.from(_privateKey, 'hex');

  const hashedData = keccak('keccak256').update("\x19Ethereum Signed Message:\n32" + _data).digest();
  let signature = secp256k1.sign(hashedData, _privateKey);
  const recovery = signature.recovery;
  signature = signature.signature.toString('hex');
  signature += recovery === 0 ? '1b': '1c';
  if(_splitSignature) {
    const r = '0x' + signature.slice(0, 64);
    const s = '0x' + signature.slice(64, 128);
    const v = parseInt(signature.slice(128, 130), 16);
    return {
      originalData: _data,
      hashedData: '0x' + hashedData.toString('hex'),
      signature: {
        r: r,
        s: s,
        v: v
      }
    }
  }
  return {
    originalData: _data,
    hashedData: '0x' + hashedData.toString('hex'),
    signature: '0x' + signature
  }
}

module.exports = sign;
