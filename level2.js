	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext('2d');
	
	var NORTH = 1, SOUTH = 2, EAST = 3, WEST = 4;

	//var hero = new Hero();

	let bckgrnd = new Image();
		bckgrnd.src = "background.jpg";

	let brick = new Image();
		brick.src = "brick.jpg";

	let lava = new Image();
		lava.src = "lava.jpg";

	var door = new Image();
		door.src = "singledoor.png";

	var doorClosed = new Image();
		doorClosed.src = "doorClosed.png";


		
	setInterval(loop, 33);

		function handleKeyDown(event) {
			if(event.key == 'w' && hero.jumingUp == false) {
				hero.jumingUp = true;
				hero.jumpingSpeed = hero.startingJumpSpeed;
			}
			else if(event.key == 's') {
				hero.movingDown = true;
			}
			else if(event.key == 'a') {
				hero.movingLeft = true;
			}
			else if(event.key == 'd') {
				hero.movingRight = true;
			}
			else if(event.key == 'p' && hero.attacking == false){
				hero.attacking = true;
				hero.kickSound.play();
			}
		}
		
		function handleKeyUp(event) {
			if(event.key == 'w') {
				//hero.jumingUp = false;
			}
			else if(event.key == 's') {
				hero.movingDown = false;
			}
			else if(event.key == 'a') {
				hero.movingLeft = false;
			}
			else if(event.key == 'd') {
				hero.movingRight = false;
			}
			else if(event.key == 'p'){
				hero.attacking = false;
			}
		}



	function loop(){
		clearBackground();
		/*moveAllObjects();*/
		drawAllObjects();
	}

	function clearBackground(){
		context.drawImage(bckgrnd, 0, 0);
	}

	/*function moveAllObjects(){
		hero.move();
		for(var pos = 0; pos < enemies.length; pos++){
			enemies[pos].move();
		}
	}*/

	function drawAllObjects(){
		context.drawImage(lava, 150, 665, 200, 100);
		context.drawImage(lava, 550, 665, 200, 100);
		context.drawImage(lava, 230, 265, 450, 55);

		context.drawImage(door, 20, 28);
		context.drawImage(doorClosed, 425, 602);

		for(var pos = 0; pos < walls.length; pos++) {
			walls[pos].draw();
		}

		for(var pos = 0; pos < coins.length; pos++) {
			coins[pos].draw();
		}

		for(var pos = 0; pos < potions.length; pos++){
			potions[pos].draw();
		}

		/*for(var pos = 0; pos < enemies.length; pos++) {
					enemies[pos].draw();
		}*/
	}

	function hero(){
		/* MOVING SPRITES */ 
			this.leftSprite = new Image();
			this.rightSprite = new Image();
			this.upSprite = new Image();
			this.downSprite = new Image();
			this.leftSprite.src = "spritesheetCoolRunnerLeft.png";
			this.rightSprite.src = "spritesheetCoolRunnerRight.png";
			this.upSprite.src = "spritesheetCoolRunnerUp.png";this.downSprite.src = "spritesheetCoolRunnerDown.png";
			
			this.currentSpriteSheet = this.rightSprite;
			
			this.actualSpriteWidth = 120;
			this.actualSpriteHeight = 120;
			this.currentImagePosition = 0;
			this.totalImageCount = 6;
			
			this.width = 60;
			this.height = 60;
			this.speed = 10;
			this.movingRight = false;
			this.movingLeft = false;
			/*this.movingUp = false;*/
			this.movingDown = false; 
			this.jumingUp = false;
			this.attacking = false; 
			this.startingJumpSpeed = -10;
			this.jumpingSpeed = this.startingJumpSpeed;
				/* ATTACK SPRITES */ 
				this.leftKick = new Image();
				this.leftKick.src = "leftKick.gif";
				this.rightKick = new Image();
				this.rightKick.src = "rightKick.gif";
				this.attackDamage = 50;
			this.health = 200;
			this.healthSprite = new Image();
			this.healthSprite.src = "heart.png";
			this.money = 0; 
			this.moneySprite = new Image();
			this.moneySprite.src = "coinImg.png";
			
			this.move = function() {
				var origX = this.x;
				var origY = this.y;
				
				this.currentImagePosition++;
				this.currentImagePosition %= this.totalImageCount;
				if(this.movingUp) {
					this.y -= this.speed;
				}
				if(this.movingRight) {
					this.x += this.speed;
				}
				else if(this.movingLeft) {
					this.x -= this.speed;
				}
				if(this.jumingUp){
					this.y += this.jumpingSpeed;
					this.jumpingSpeed += .5;
				}
				console.log(this.x + ", " + this.y + ", " + this.jumpingSpeed);
				for(var pos = 0; pos < walls.length; pos++) {
						if( detectCollision(this, walls[pos]) ) {
							this.jumingUp = false;
							this.jumpingSpeed = this.startingJumpSpeed;
							this.x = origX;
							this.y = origY;
							console.log("collision detected");
							break;
						}
				}
				if(this.jumpingSpeed > 0 || this.jumingUp == false){
					origY = this.y;
					this.y += 3; 
					var floorBeneathUs = false;
					for(var pos = 0; pos < walls.length; pos++) {
							if( detectCollision(this, walls[pos]) ) {
								this.floorBeneathUs = true;
								this.jumingUp = false;
								this.jumpingSpeed = this.startingJumpSpeed;
								this.y = origY;
								break;
							}
					}
					if(this.floorBeneathUs == false) {
						this.y += 3;
						console.log("floor beneath is false");
					}
				}
				
			/* COLLISION DETECTIONS */ 
				for(var pos = 0; pos < walls.length; pos++) {
					if( detectCollision(this, walls[pos]) ) {
						this.x = origX;
						this.y = origY;
						console.log("alternate collision");
						break;
					}
				}
				for(var pos = 0; pos < enemies.length; pos++) {
					if( detectCollision(this, enemies[pos]) && this.attacking)  {
						this.x = origX;
						this.y = origY;
						enemies[pos].health -= this.attackDamage;
						console.log("enemy collision");
						console.log(enemies[pos].health);
						this.hitEnemySound.play();
						break;
					}
				}
				for(var pos = 0; pos < coins.length; pos++){
					if( coins[pos].status == 1 && detectCollision(this, coins[pos]) ) {
						console.log("coin collision");
						this.money += coins[pos].amount;
						coins[pos].status = 0;
						coins[pos].amount = 0;
						this.hitCoinSound.play();
						break;
					}
				}
				for(var pos = 0; pos < potions.length; pos++ ){
					if(potions[pos].status ==1 && detectCollision(this, potions[pos])){
						console.log("coin collision");
						this.health += potions[pos].potionPoints;
						potions[pos].status = 0;
						potions[pos].potionPoints = 0; 
						this.hitHealthSound.play();
						break;
					}
				}
		
				if(this.health < 0) {
					alert("GAME OVER"); 					
					location.reload();
				}	
			}
			
			this.draw = function() {
				var spriteX = 0;
				var spriteY = 0;
				var jumpHeight = 45; 
				
				if(this.movingLeft || this.movingRight) {
					this.currentSpriteSheet = this.movingLeft ? 
							this.leftSprite : this.rightSprite;
							
					spriteX = this.currentImagePosition * 
							this.actualSpriteWidth;
				}
				else if(this.jumingUp || this.movingDown) {
					this.currentSpriteSheet = this.jumingUp ? 
							this.upSprite : this.downSprite;
				
					spriteY = this.currentImagePosition * 
							this.actualSpriteHeight;
				}
				
				if(this.attacking){
					if(this.currentSpriteSheet == this.rightSprite){
						context.drawImage(this.leftKick, this.x, this.y);						
					}
					if(this.currentSpriteSheet == this.leftSprite){
						context.drawImage(this.rightKick, this.x, this.y);
					}
					
				}
 	
				if(this.attacking == false && this.health > 0 ){
					context.drawImage(this.currentSpriteSheet, 
						spriteX, spriteY, this.actualSpriteWidth,
							this.actualSpriteHeight, this.x, this.y, this.width, this.height);
				}
			
			
				context.font = "30px Lucida Console Monaco monospace";
				context.fillStyle = "white";
				context.drawImage( this.healthSprite, 10, canvas.height - 40, 40, 40);
				context.fillText( this.health, 50, canvas.height - 10);
				context.drawImage( this.moneySprite, 110, canvas.height - 40, 35, 35);
				context.fillText( this.money, 150, canvas.height - 10)
			}
	}


	function wall( x, y, w, h ) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.draw = function() {
			context.drawImage(brick, this.x, this. y,
				this.width, this.height);
		}
	}


	function coin( x, y ) {
		this.status = 1; 
		this.coinSprite = new Image();
		this.coinSprite.src = "coinsprite.png";
		this.coinX = x;
		this.coinY = y;
		this.x = x;
		this.y = y;

		this.spritex = 0;
		this.spritey = 0;
		this.actualSpriteWidth = 44;
		this.actualSpriteHeight = 40;
		this.currentImagePosition = 0;
		this.totalImageCount = 10;

		this.width = 40;
		this.height = 40;
		this.amount = 10; 

		this.draw = function() {
			this.currentImagePosition++;
			this.currentImagePosition %= this.totalImageCount;
			this.spritex = this.currentImagePosition * this.actualSpriteWidth;

			if(this.status == 1) {
				context.drawImage( this.coinSprite, this.spritex, this.spritey, this.actualSpriteWidth, this.actualSpriteHeight, this.coinX, this.coinY, this.width, this.height);
			}

		}	
	}

	function HealthPotion( x, y ) {
		this.status = 1; 
		this.potionSprite = new Image();
		this.potionSprite.src = "potion.png";
		this.healthX = x;
		this.healthY = y;
		this.width = 60;
		this.height = 50;
		this.potionPoints = 20;

		this.draw = function() {
			if(this.status == 1) {
				context.drawImage(this.potionSprite, this.healthX,
					this.healthY, this.width, this.height);
			}
		}

	}

	function walls2(x, y, w, h){
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.draw = function() {
			context.drawImage(brick, this.x, this. y,
				this.width, this.height);
		}

		this.move = function(){
			var origX = this.x;
			var origY = this.y;
		
		if(this.direction == EAST) {
					this.x += this.speed;
				}
				else {
					this.x -= this.speed;
				}
				
				//check for boundary of canvas
				if(this.x < 0 || this.x + this.width > canvas.width ||
					this.y < 0 || this.y + this.height > canvas.height) {
						this.x = origX;
						this.y = origY;
						//re-randomize the direction
						this.direction = Math.floor(Math.random() * 2 + 3);
					}
					
				//check for collision with walls
				for(var pos = 0; pos < walls.length; pos++) {
					if(detectCollision( this, walls[pos]) ) {
						this.x = origX;
						this.y = origY;
						//re-randomize the direction
						this.direction = Math.floor(Math.random() * 2 + 3);
					}
				}
				
				
				//check for collision with walls
				for(var pos = 0; pos < walls2.length; pos++) {
					if(detectCollision( this, walls2[pos]) &&
						(this.x != walls2[pos].x || this.y != walls2[pos].y)
					) {
						this.x = origX;
						this.y = origY;
						//re-randomize the direction
						this.direction = Math.floor(Math.random() * 2 + 3);
					}
				}
				
				
				if(detectCollision(this, hero) && this.health > 0) {
					this.x = origX;
					this.y = origY;
					this.direction = Math.floor(Math.random() * 2 + 3);
					if(hero.attacking == false){
						hero.health--;
				    }
				    else {
				    	this.health -= hero.attackDamage;
				    }
				 
				}
		}

	}

	var walls = [];
		//FLOOR
		walls.push(new wall(0, 665, 150, 35));
		walls.push(new wall(350, 665, 200, 35));
		walls.push(new wall(750, 665, 150, 35));
		
		//TOP
		walls.push(new wall(0, 91, 150, 35));
		walls.push(new wall(750, 91, 150, 35));
		

		//MIDDLE
		walls.push(new wall(195, 320, 130, 35));
		walls.push(new wall(195, 250, 35, 100));
		walls.push(new wall(315, 320, 250, 35));
		walls.push(new wall(660, 250, 35, 100));
		walls.push(new wall(565, 320, 130, 35));

		
		//AROUND
		walls.push(new wall(0, 0, 5, 700));
		walls.push(new wall(895, 0, 5, 700));
		walls.push(new wall(0, 0, 900, 5));
		

		//walls.push(new wall());
		
	var walls2 = [];
		//UP AND DOWN
		walls.push(new wall(65, 500, 105, 35));
		walls.push(new wall(720, 500, 105, 35));

	/*var walls3 = [];
		//LEFT AND RIGHT
		walls.push(new wall(400, 180, 120, 35));
*/
	var coins = [];
		coins.push(new coin(850, 620));
		coins.push(new coin(785, 455));
		coins.push(new coin(720, 455));
		coins.push(new coin(65, 455));
		coins.push(new coin(130, 455));
		coins.push(new coin(110, 50));
		coins.push(new coin(190, 205));
		coins.push(new coin(655, 205));
		coins.push(new coin(390, 135));
		coins.push(new coin(490, 135));
		
		//coins.push(new coin());


	var potions = [];
		potions.push(new HealthPotion(80, 610)); 
		potions.push(new HealthPotion(835, 40));
		 
		//potions.push(new HealthPotion());

	/*var enemies = [];
		enemies.push(new ());*/
/*

for(var pos = 0; pos < walls.length; pos++) {
					if( detectCollision(this, walls[pos]) && this.attacking)  {
						this.x = origX;
						this.y = origY;
						enemies[pos].walls -= this.attackDamage;
						console.log("enemy collision");
						console.log(enemies[pos].health);
						this.hitEnemySound.play();
						break;
					}
this.draw = function() {
				var spriteX = 0;
				var spriteY = 0;
				var jumpHeight = 45; 
				
				if(this.movingLeft || this.movingRight) {
					this.currentSpriteSheet = this.movingLeft ? 
							this.leftSprite : this.rightSprite;
							
					spriteX = this.currentImagePosition * 
							this.actualSpriteWidth;
				}
				else if(this.jumingUp || this.movingDown) {
					this.currentSpriteSheet = this.jumingUp ? 
							this.upSprite : this.downSprite;
				
					spriteY = this.currentImagePosition * 
							this.actualSpriteHeight;
				}
				
				if(this.attacking){
					if(this.currentSpriteSheet == this.rightSprite){
						context.drawImage(this.leftKick, this.x, this.y);						
					}
					if(this.currentSpriteSheet == this.leftSprite){
						context.drawImage(this.rightKick, this.x, this.y);
					}
					
				}
 	
				if(this.attacking == false && this.health > 0 ){
					context.drawImage(this.currentSpriteSheet, 
						spriteX, spriteY, this.actualSpriteWidth,
							this.actualSpriteHeight, this.x, this.y, this.width, this.height);
				}
*/