var jsencrypt = require("jsencrypt");
var ipfsAPI = require('ipfs-api');
var fileDownload = require('react-file-download');

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}



function getFileFromIPFS(hash) {
  var ipfs = ipfsAPI(
      'ipfs.infura.io',
      '5001',
      {
          protocol: 'https'
      }
  );
  //var buffer = new Buffer("I'm a string!", "utf-8")
  console.log(hex2a(hash));
  return ipfs.files.get('QmTTp4WRDWVxEcCM5a3RdmmZfWFi799y146uFjXQobkEgo');
}


const retrieveFileToIPFS = (hash, callback) => {
	getFileFromIPFS(hash)
		.then((stream) => {
			stream.on('data', (file) => {
				const encrypted_data = file.content.read().toString()
				console.log(encrypted_data);

				// soz
				const pkey = '-----BEGIN RSA PRIVATE KEY-----\n'+
					'MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ\n'+
					'WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR\n'+
					'aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB\n'+
					'AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv\n'+
					'xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH\n'+
					'm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd\n'+
					'8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF\n'+
					'z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5\n'+
					'rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM\n'+
					'V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe\n'+
					'aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil\n'+
					'psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz\n'+
					'uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876\n'+
					'-----END RSA PRIVATE KEY-----';

				var decrypt = new jsencrypt.JSEncrypt();
				decrypt.setPrivateKey(pkey);
				var uncrypted = decrypt.decrypt(encrypted_data);

        console.log(uncrypted);

				fileDownload(uncrypted, 'download.txt');
			})
	})}

module.exports = {
	retrieveFileToIPFS,
}