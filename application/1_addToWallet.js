'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: ${organisation}_admin
 *  User Organization: ${organisation}
 *  User Role: Admin
 *
 */

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../test-network/organizations'); // Directory where all Network artifacts are stored

async function main(certificatePath, privateKeyPath, organisation) {

	// A wallet is a filesystem path that stores a collection of Identities
	const wallet = new FileSystemWallet(`./identity/${organisation}`);

	// Main try/catch block
	try {

		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		// IMPORTANT: Change the private key name to the key generated on your computer
		const privatekey = fs.readFileSync(privateKeyPath).toString();

		// Load credentials into wallet
		const identityLabel = `${organisation}_admin`;
		const identity = X509WalletMixin.createIdentity(`${organisation}MSP`, certificate, privatekey);

		await wallet.import(identityLabel, identity);

	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

    main('/Users/shashankawasthi/Documents/Project/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem', '/Users/shashankawasthi/Documents/Project/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/priv_sk','org1').then(() => {
   console.log('User identity added to wallet.');
 });


module.exports.execute = main;
