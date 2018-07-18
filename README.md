# Cattle tracking MVP - Hyperledger Fabric  

This is the MVP developed in The Developers Conference Hackday for cattle tracking

### Starting Application  

#1 Create the BNA archive (from cattle-tracker-tdc/dist directory)  
`composer archive create  --sourceType dir --sourceName ../`  

#2.1 Install the Business Network Application archive  
`composer network install -a ./cattle-tracker-tdc@0.0.1.bna -c PeerAdmin@hlfv1`  

#2.2 Start the network  
`composer network start -n cattle-tracker-tdc -c PeerAdmin@hlfv1 -V 0.0.1 -A admin -S adminpw`  

#3 Import the card  
`composer card delete -c admin@cattle-tracker-tdc`  
`composer card import -f admin@cattle-tracker-tdc.card`  

#4 Run REST Server on http://localhost:3000/  
`composer-rest-server -c admin@cattle-tracker-tdc -n always -w true`  

### Upgrading Application Version

#1 Edit package.json providing new BNA version  
`nano ../package.json`  
`
"name": "cattle-tracker-tdc",  
"version": "0.0.1", --> "version": "0.0.2",
`

#2 Create the BNA archive (from cattle-tracker-tdc/dist directory)  
`composer archive create -t dir -n ../`

#3.1 Install the Business Network Application archive  
`composer network install -a cattle-tracker-tdc@0.0.2.bna -c PeerAdmin@hlfv1`

#3.2 Start the new network  
`composer network upgrade -c PeerAdmin@hlfv1 -n cattle-tracker-tdc -V 0.0.2`