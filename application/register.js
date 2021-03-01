'use strict';

/**
 * This is a Node.JS application to register a new company on the network.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;

async function main(txnid, txnSource, txnAmount, sourceBalance) {

		let identityFolderName = 'org1';
		let fabric_username = 'org1_admin';
		let connectionProfile = `./connection-org1.yaml`;

	try {

		const myContract = await getContractInstance(identityFolderName,fabric_username,connectionProfile);

		// Create a new transaction
		console.log('.....Create a new transaction');
		const txnBuffer = await myContract.submitTransaction('newTrxn', txnid, txnSource, txnAmount, sourceBalance);

		// process response
		console.log('.....Processing Transaction Response \n\n');
		let newTransaction = JSON.parse(txnBuffer.toString());
		console.log(newTransaction);
		console.log('\n\n.....Create Transaction Complete!');
		return newTransaction;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
		gateway.disconnect();

	}
}

async function getContractInstance(identityFolderName,fabricUserName,connectionProfilePath) {

	// A gateway defines which peer is used to access Fabric network
	// It uses a common connection profile (CCP) to connect to a Fabric Peer
	// A CCP is defined manually in file connection-profile-manufacturer.yaml
	gateway = new Gateway();

	// A wallet is where the credentials to be used for this transaction exist
	// Credentials for user MANUFACTURER_ADMIN was initially added to this wallet.
	const wallet = new FileSystemWallet(`./identity/${identityFolderName}`);

	// What is the username of this Client user accessing the network?

	// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
	let connectionProfile = yaml.safeLoad(fs.readFileSync(connectionProfilePath, 'utf8'));

	// Set connection options; identity and wallet
	let connectionOptions = {
		wallet: wallet,
		identity: fabricUserName,
		discovery: { enabled: false, asLocalhost: true }
	};

	// Connect to gateway using specified parameters
	console.log('.....Connecting to Fabric Gateway');
	await gateway.connect(connectionProfile, connectionOptions);

	// Access pharma channel
	console.log('.....Connecting to channel - mychannel');
	const channel = await gateway.getNetwork('mychannel');

	// Get instance of deployed  contract
	// @param Name of chaincode
	// @param Name of smart contract
	console.log('.....Connecting to basic Smart Contract');
//	return channel.getContract('test-network', 'basic');
	const contract = network.getContract("basic");
	return contract;
}

  main('1','2','3','4').then(() => {
 	console.log('Transaction created');
 });

module.exports.execute = main;
