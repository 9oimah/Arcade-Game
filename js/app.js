//Main Enemy class
class Enemy {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.sprite = 'images/enemy-bug.png';
		this.speed = speed;
		this.initialX = x;
		this.initialSpeed = this.speed;
	}
	
	// update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		if (this.x < 500) {
			this.x += this.speed * dt;
		}
		else {
			this.x = this.initialX;
			this.speed = this.initialSpeed;
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

//Main Player class
class Player {
	constructor(x = 200, y = 400){
		this.x = x;
		this.y = y;
		this.initialX = x;
		this.initialY = y;
		this.sprite = 'images/char-cat-girl.png';
		this.succeeded = false;
		this.count = 0;
	}

	//Updates the scoreboard
	update() {
		ctx.fillText(`Score: ${this.count}`, 415, 570);
		ctx.font = 'bold 21px Garamond';
		ctx.fillStyle = '#EEB887';
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

		if (collision()) {
			this.x = this.initialX;
			this.y = this.initialY;
			this.count = 0;
		}

		if (success()) {
			this.x = this.initialX;
			this.y = this.initialY;
			this.succeeded = false;
		}
		
		//Draws gems after reaching a certain score
		if (this.count === 3) {
			ctx.drawImage(Resources.get('images/Gem Blue.png'), 290, 550);
		} 
		else if (this.count === 10) {
			ctx.drawImage(Resources.get('images/Gem Blue.png'), 290, 550);
			ctx.drawImage(Resources.get('images/Gem Green.png'), 330, 550);
		} 
		else if (this.count === 20) {
			ctx.drawImage(Resources.get('images/Gem Blue.png'), 290, 550);
			ctx.drawImage(Resources.get('images/Gem Green.png'), 330, 550);
			ctx.drawImage(Resources.get('images/Gem Orange.png'), 370, 550);
		}
		
		this.update();
	}

	handleInput(key) {
		if (key === 'left' && this.x > 0) {
			this.x -= 100;
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
		else if (key === 'right' && this.x < 400) {
			this.x += 100;
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
		else if (key === 'up' && this.y > 40) {
			this.y -= 100;
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
		else if (key === 'down' && this.y < 400) {
			this.y += 100;
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	}
	
}

//Detects collision between the player and the enemies
//Axis-Aligned Bounding Box function referenced from https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
function collision() {
	let playerRect = {
		x: player.x,
		y: player.y,
		width: 50,
		height: 71
	};
		
	let enemyRect = {};

	for (enemy of allEnemies) {
		enemyRect = {
			x: enemy.x,
			y: enemy.y,
			width: 80,
			height: 71
		};

		if (enemyRect.x < playerRect.x + playerRect.width &&
            enemyRect.x + enemyRect.width > playerRect.x &&
            enemyRect.y < playerRect.y + playerRect.height &&
            enemyRect.height + enemyRect.y > playerRect.y) {
			return true;
		}
	}
	return false;
}

//Checks whether the player gets to the top
function success() {
	if (player.y <= 1) {
		if (!player.succeeded) {
			this.succeeded = true;
			player.count++;
		}
		return true;
	}
	return false;
}

//Instantiates enemy objects
let allEnemies = [
	new Enemy(-50, 147, 100),
	new Enemy(-50, 227, 70),
	new Enemy(-50, 67, 150)
];

//Instantiates the player object
let player = new Player();

// This listens for key presses and sends the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
