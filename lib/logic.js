/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Create animal transaction
 * @param {org.cattle.tracker.CreateAnimal} createAnimal
 * @transaction
 */
function createAnimal(tx) {
    const factory = getFactory();
    const NS = 'org.cattle.tracker';

    var animal = factory.newResource(NS, 'Animal', tx.rfid);
    animal.weight = tx.weight
    animal.scale = tx.scale
    animal.birthday = new Date()
    animal.vaccines = ["YELLOW_FEVER"]
    animal.owner = tx.owner

    var metric = factory.newConcept(NS, 'Metric');
    metric.weight = tx.weight;
    metric.scale = tx.scale;
    metric.date = new Date()

    animal.metrics = [metric]

    return getAssetRegistry(NS + '.Animal')
        .then(function (animalRegistry) {
            // add the Farms
            return animalRegistry.addAll([animal]);
        })
}

/**
 * Transfer animal transaction
 * @param {org.cattle.tracker.TransferAnimal} transferAnimal
 * @transaction
 */
async function transferAnimal(tx) {

}

/**
 * Transfer animal transaction
 * @param {org.cattle.tracker.CreateContract} createContract
 * @transaction
 */
async function createContract(tx) {

    const factory = getFactory();
    const NS = 'org.cattle.tracker';

    var contract = factory.newResource(NS, 'Contract', 'CONTRACT_' + Date.now())
    contract.farm = tx.farm
    contract.fridge = tx.fridge
    contract.createdAt = new Date()
	
  	var animals = []
    tx.animals.forEach(animal => {
    	animal.status = "SOLD"
      	animals.push(animal)
    })
  
    var batch = factory.newResource(NS, 'Batch', 'BATCH_' + Date.now())
    batch.animals = tx.animals
  	

    contract.batch = batch
    contract.gtaNumber = 'GTA_' + Date.now()
	console.log(animals)
  
  	let animalRegistry = await getAssetRegistry(NS + '.Animal')
    await animalRegistry.updateAll(animals);
  
  	let batchRegistry = await getAssetRegistry(NS + '.Batch')
  	await batchRegistry.addAll([batch]);

 	let contractRegistry = await getAssetRegistry(NS + '.Contract');
	await contractRegistry.addAll([contract]);
}

/**
 * Transfer animal transaction
 * @param {org.cattle.tracker.EditAnimal} editAnimal
 * @transaction
 */
function editAnimal(tx) {
    const factory = getFactory();
    const NS = 'org.cattle.tracker';

    var animal = tx.animal
    var metric = factory.newConcept(NS, 'Metric');
    metric.weight = tx.newWeight;
    metric.scale = tx.newScale;
    metric.date = new Date()

    animal.metrics.push(metric)

    return getAssetRegistry(NS + '.Animal')
        .then(function (animalRegistry) {
            // add the Farms
            return animalRegistry.update(animal);

        })
}

/**
 * Transfer animal transaction
 * @param {org.cattle.tracker.Bootstrap} bootstrap
 * @transaction
 */
function bootstrap(bootstrap) {
    const factory = getFactory();
    const NS = 'org.cattle.tracker';

    var farm = factory.newResource(NS, 'Company', '0001')
    farm.name = 'Farm 01'
    farm.cnpj = '12341234'
    farm.companyType = "FARM"

    var fridge = factory.newResource(NS, 'Company', '0002')
    fridge.name = 'Fridge 01'
    fridge.cnpj = '12341235'
    fridge.companyType = "FRIDGE"

    var animals = []
    for (let i = 0; i < 20; i++) {
        let id = '000' + i
        let animal = factory.newResource(NS, 'Animal', id)
        animal.scale = 100 + i;
        let min = 100, max = 1000
        let weight = Math.random() * (max - min) + min;
        animal.weight = weight;
        animal.owner = farm;
        animal.birthday = new Date()
        animal.vaccines = ["YELLOW_FEVER"]

        var metric = factory.newConcept(NS, 'Metric');
        metric.weight = animal.weight;
        metric.scale = animal.scale;
        metric.date = new Date()

        animal.metrics = [metric]
        animals.push(animal);
    }

    return getParticipantRegistry(NS + '.Company')
        .then(function (companyRegistry) {
            // add the Farms
            return companyRegistry.addAll([farm, fridge]);

        }).then(function () {
            // add the Farms
            return getAssetRegistry(NS + '.Animal');
        }).then(function (animalRegistry) {
            // add the Farms
            return animalRegistry.addAll(animals);
        })

}

/**
 * Transfer animal transaction
 * @param {org.cattle.tracker.Clear} clear
 * @transaction
 */
async function bootstrap(clear) {
    let ids = []
    for (let i = 0; i < 20; i++) {
        ids.push('000' + i)
    }
    let animalRegistry = await getAssetRegistry(NS + '.Animal')
    await animalRegistry.removeAll(ids);
}