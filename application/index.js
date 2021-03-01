const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Import all function modules
const addToWallet = require('./1_addToWallet');
//const registerCompany = require('./registerCompany');
//const addDrug = require('./addDrug');
//const createPO = require('./createPO');
//const createShipment = require('./createShipment');
//const updateShipment = require('./updateShipment');
//const retailDrug = require('./retailDrug');
//const viewHistory = require('./viewHistory');
//const viewDrugCurrentState = require('./viewDrugCurrentState');


// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Closed Wallet');

app.get('/', (req, res) => res.send('Welcome to Closed Wallet'));

app.post('/addToWallet', (req, res) => {
	addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath, req.body.organisation)
			.then(() => {
				console.log('User credentials added to wallet');
				const result = {
					status: 'success',
					message: 'User credentials added to wallet'
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
		});

//app.post('/registerCompany', (req, res) => {
//	registerCompany.execute(req.body.companyCRN, req.body.companyName, req.body.Location, req.body.organisationRole)
//			.then((company) => {
//				console.log('New company account created');
//				const result = {
//					status: 'success',
//					message: 'New company account created',
//					company: company
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});
//
//app.post('/addDrug', (req, res) => {
//	addDrug.execute(req.body.drugName, req.body.serialNo, req.body.mfgDate, req.body.expDate, req.body.companyCRN, req.body.organisation)
//			.then((drugresult) => {
//				console.log('New drug added');
//				const result = {
//					status: 'success',
//					message: 'New drug added',
//					drug : drugresult
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});
//
//app.post('/createPO', (req, res) => {
//	createPO.execute(req.body.buyerCRN, req.body.sellerCRN, req.body.drugName, req.body.quantity, req.body.organisation)
//			.then((POresult) => {
//				console.log('PO created');
//				const result = {
//					status: 'success',
//					message: 'PO created',
//					PO : POresult
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});
//
//app.post('/createShipment', (req, res) => {
//	createShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.listOfAssets, req.body.transporterCRN, req.body.organisation)
//			.then((shipmentresult) => {
//				console.log('Shipment created');
//				const result = {
//					status: 'success',
//					message: 'Shipment created',
//					PO : shipmentresult
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});
//
//app.post('/updateShipment', (req, res) => {
//	updateShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.transporterCRN, req.body.organisation)
//			.then((updateShipmentresult) => {
//				console.log('Shipment updated');
//				const result = {
//					status: 'success',
//					message: 'Shipment updated',
//					PO : updateShipmentresult
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});
//
//app.post('/retailDrug', (req, res) => {
//	retailDrug.execute(req.body.drugName, req.body.serialNo, req.body.retailerCRN, req.body.customerAadhar, req.body.organisation)
//			.then((retailDrugresult) => {
//				console.log('Drug retail sucessful');
//				const result = {
//					status: 'success',
//					message: 'Drug retail sucessful',
//					PO : retailDrugresult
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});
//
//app.post('/viewHistory', (req, res) => {
//	viewHistory.execute(req.body.drugName, req.body.serialNo, req.body.organisation)
//			.then((viewHistoryresult) => {
//				console.log('History reterived successfully');
//				const result = {
//					status: 'success',
//					message: 'History reterived successfully',
//					History : viewHistoryresult
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});
//
//app.post('/viewDrugCurrentState', (req, res) => {
//	viewDrugCurrentState.execute(req.body.drugName, req.body.serialNo, req.body.organisation)
//			.then((viewDrugCurrentStateresult) => {
//				console.log('History reterived successfully');
//				const result = {
//					status: 'success',
//					message: 'History reterived successfully',
//					current_Status : viewDrugCurrentStateresult
//				};
//				res.json(result);
//			})
//			.catch((e) => {
//				const result = {
//					status: 'error',
//					message: 'Failed',
//					error: e
//				};
//				res.status(500).send(result);
//			});
//});

app.listen(port, () => console.log(`Distributed Certification App listening on port ${port}!`));
