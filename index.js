const keccak = require('keccak');
const secp256k1 = require('secp256k1');

/**
  * Signs a message with a private key in an ethereum compatible way
  * @param {string} _msg - message to sign
  * @param {string} _privKey - ethereum private key, should be without the 0x
  * @param {bool} [_splitSig = false] - whether the signature should be split in v r s or not
*/
function sign(_msg, _privKey, _splitSig = false) {
  if(_privKey.length < 64) throw new Error('Private Key too small')
  if(_privKey.length === 66) _privKey = _privKey.substring(2);
  const privKey = Buffer.from(_privKey, 'hex');
  const hashedMsg = keccak('keccak256').update("\x19Ethereum Signed Message:\n32" + _msg).digest();
  const signature = secp256k1.sign(hashedMsg, privKey).signature.toString('hex');

  if(_splitSig) {
    const r = '0x' + signature.slice(0, 64);
    const s = '0x' + signature.slice(64, 128);
    const v = parseFloat('0x' + signature.slice(128, 130)) === 0 ? 27 : 28;
    return {
      originalMsg: _msg,
      hashedMsg: '0x' + hashedMsg.toString('hex'),
      signature: {
        v: v,
        r: r,
        s: s
      }
    }
  }

  return {
    originalMsg: _msg,
    hashedMsg: '0x' + hashedMsg.toString('hex'),
    signature: '0x' + signature
  }
}



module.exports = sign;
