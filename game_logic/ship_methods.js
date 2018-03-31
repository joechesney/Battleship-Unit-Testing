module.exports.checkForShip = (player, coordinates) =>{
	let shipPresent, ship;
	for (let i = 0; i < player.ships.length; i++) {
		ship = player.ships[i];
		shipPresent = ship.locations.filter(function (actualCoordinate) {
			return (actualCoordinate[0] === coordinates[0]) && (actualCoordinate[1] === coordinates[1]);
		})[0];
		if (shipPresent) {
			return ship;
		} 
	}
	return false;
}

module.exports.damageShip = (ship, coordinates) => {
	ship.damage.push(coordinates);
}

module.exports.fire = (player, coordinates) => {
	let ship = checkForShip(player, coordinates);
	if (ship) {
		damageShip(ship, coordinates);
	}	
}
