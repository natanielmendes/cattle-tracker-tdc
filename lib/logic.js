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
async function createAnimal(tx) {
    
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
 * @param {org.cattle.tracker.AddAnimalToBatch} addAnimalToBatch
 * @transaction
 */
async function addAnimalToBatch(tx) {

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

    var animals = []
    for(let i=0; i<10; i++){
        let id = '000' + i
        let animal = factory.newResource(NS,'Animal', id)
        animal.scale = 100 + i;
        animal.weight = 500 + i;
        animal.owner = farm;
        animals.push(animal);
    }

  	return getParticipantRegistry(NS + '.Company')
        .then(function (companyRegistry) {
            // add the Farms
            return companyRegistry.add(farm);

        }).then(function () {
            // add the Farms
            return getAssetRegistry(NS + '.Animal');
        }).then(function (animalRegistry) {
            // add the Farms
            return animalRegistry.addAll(animals);
        })

}
