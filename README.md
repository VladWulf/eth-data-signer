# Eth Data Signer


A lot of signing libraries rely on an ethereum web3 or an ethereum rpc call (which is frankly the same since web3 wraps around those calls for standard http provider).  

Since I needed this module myself I decided to make it public.  
Feel free to use it the way you want but keep in mind that it's not production ready. You will need to do more tests, especially with the v parameter and the secp256k1 implementation.
