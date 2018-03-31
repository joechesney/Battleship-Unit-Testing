let { assert } = require('chai');

describe('checkForShip', () => {
	let checkForShip = require('../game_logic/ship_methods').checkForShip;
	
	it('should correctly report no ship at a given players coordinate', () => {
		let player = {
			ships: [
				{
					locations: [[0, 0]]
				}
			]
		};
		assert.isFalse(checkForShip(player, [9, 9]), "no ship at this location");
	});
	
	it('should correctly report a ship located at the given coordinates', () => {
		let player = {
			ships: [
				{
					locations: [[0, 0]]
				}
			]
		};
		assert.deepEqual(checkForShip(player, [0, 0]),(player.ships[0]));
	});
	
	it('should handle ships located at more than one coordinate', () => {
		let player = {
			ships: [
				{
					locations: [[0, 0], [0, 1]]
				}
			]
		};
		assert.deepEqual(checkForShip(player, [0, 1]),(player.ships[0]));
		assert.deepEqual(checkForShip(player, [0, 0]),(player.ships[0]));			
		assert.isFalse(checkForShip(player, [9, 9]));
	});
	
	it('should handle checking multiple ships', () => {
		let player = {
			ships: [
				{
					locations: [[0, 0], [0, 1]]
				},
				{
					locations: [[1, 0], [1, 1]]
				},
				{
					locations: [[2, 0], [2, 1], [2, 2], [2, 3]]
				}
			]
		};
		
		assert.deepEqual(checkForShip(player, [0, 1]),(player.ships[0]));
		assert.deepEqual(checkForShip(player, [0, 0]),(player.ships[0]));	
		assert.deepEqual(checkForShip(player, [1, 0]),(player.ships[1]));	
		assert.deepEqual(checkForShip(player, [1, 1]),(player.ships[1]));
		assert.deepEqual(checkForShip(player, [2, 3]),(player.ships[2]));	
		assert.isFalse(checkForShip(player, [9, 9]), "no ship located here");
	});
});

describe('damageShip', () => {
	let {damageShip} = require('../game_logic/ship_methods');
	
	it('should register damage on a given ship at a given location', () => {
		let ship = {
			locations: [[0, 0]],
			damage: []
		};
		damageShip(ship, [0, 0]);
		assert.isNotEmpty(ship.damage);
		assert.deepEqual(ship.damage[0],([0, 0]));
	});
});

describe('fire', () => {
	let {fire} = require('../game_logic/ship_methods');
	
	it('should record damage on the given players ship at a given coordinate', () => {
		let player = {
			ships: [
				{
					locations: [[0, 0]],
					damage: []
				}
			]
		};
		fire(player, [0, 0]);
		assert.deepEqual(player.ships[0].damage[0],([0, 0]));
	});
	
	it('should NOT record damage if there is no ship at my coordinates', () => {
		let player = {
			ships: [
				{
					locations: [[0, 0]],
					damage: []
				}
			]
		};
		fire(player, [9, 9]);
		assert.isEmpty(player.ships[0].damage);
	});
});



