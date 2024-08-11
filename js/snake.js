class Snake{
	constructor(ctx, name, id){
		this.ctx = ctx;
		this.name = name;
		this.id = id;
		this.score = 0;
		this.force =  5;
		this.state = 0;
        this.money = 0.0;
		this.headType = ut.random(0, 2);


		this.pos = new Point(game.SCREEN_SIZE.x/2, game.SCREEN_SIZE.y/2);
		this.velocity = new Point(0, 0); //arbitary point
		this.angle = ut.random(0, Math.PI);

		this.length = 10;
		this.MAXSIZE = 12;
		this.size = 10;
        this.game_round = 0
        this.exit_game = false

		// color
		this.mainColor = ut.randomColor();
		this.midColor = ut.color(this.mainColor, 0.33);
		this.supportColor = ut.color(this.midColor, 0.33);

		this.arr = [];
		this.arr.push(new Point(game.SCREEN_SIZE.x/2, game.SCREEN_SIZE.y/2));
		for(var i=1; i<this.length; i++){
			this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));
		}

	}

	drawHeadTwoEyeBranch(){

		var x = this.arr[0].x;
		var y = this.arr[0].y;

		var d = this.size*1.9;
		var p1 = new Point(x + d*Math.cos(this.angle), y+ d*Math.sin(this.angle));
		p1 = ut.rotate(p1, this.arr[0], Math.PI/6)
		var p2 = ut.rotate(new Point(p1.x, p1.y), this.arr[0], -Math.PI/3);


		//eye1
		//muscle
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2 + 2, 0, 2*Math.PI);
		this.ctx.fill();

		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2, 0, 2*Math.PI);
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p1.x + Math.cos(this.angle), p1.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);
		this.ctx.fill();


		//eye2
		//muscle
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2 + 2, 0, 2*Math.PI);
		this.ctx.fill();

		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2, 0, 2*Math.PI);
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p2.x + Math.cos(this.angle), p2.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);
		this.ctx.fill();

		//head
		var grd=this.ctx.createRadialGradient(x, y, 2, x+4, y+4, 10);
		grd.addColorStop(0, this.supportColor);
		grd.addColorStop(1, this.midColor);
		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+1, 0, 2*Math.PI);
		this.ctx.fill();

		// name
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-10, y-10);

	}

	drawHeadTwoEye(){

		var x = this.arr[0].x;
		var y = this.arr[0].y;

		//head
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+1, 0, 2*Math.PI);
		this.ctx.fill();


		//eye 1
		var d = this.size/2;
		var p1 = new Point(x + d*Math.cos(this.angle), y+ d*Math.sin(this.angle));
		p1 = ut.rotate(p1, this.arr[0], -20);
		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2, 0, 2*Math.PI);
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p1.x + Math.cos(this.angle), p1.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);
		this.ctx.fill();


		//eye2
		var p2 = ut.rotate(p1, this.arr[0], 40);
		//eye
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2, 0, 2*Math.PI);
		this.ctx.fill();

		//retina
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p2.x + Math.cos(this.angle), p2.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);
		this.ctx.fill();

		//name
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-5, y-10);

	}

	drawHeadOneEye(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;

		//head
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+2, 0, 2*Math.PI);
		this.ctx.fill();

		//face
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size, 0, 2*Math.PI);
		this.ctx.fill();

		//eye
		var d = 2;
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/1.5, 0, 2*Math.PI);
		this.ctx.fill();

		//retina
		var d = 3;
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/4, 0, 2*Math.PI);
		this.ctx.fill();


		//name
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-5, y-10);
	}

	drawBody(x, y, i){

		var grd=this.ctx.createRadialGradient(x, y, 2, x+4, y+4, 10);
		grd.addColorStop(0, this.supportColor);
		grd.addColorStop(1, this.midColor);

		var radius = this.size - (i*0.01);
		if(radius < 0) radius = 1;

		this.ctx.beginPath();
		this.ctx.fillStyle = this.mainColor;
		this.ctx.arc(x, y, radius+1, 0, 2*Math.PI);
		this.ctx.fill();

		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, 2*Math.PI);
		this.ctx.fill();

	}

	move(){
		this.velocity.x = this.force*Math.cos(this.angle);
		this.velocity.y = this.force*Math.sin(this.angle);


		//magic

		var d = this.size/2;
		for(var i=this.length-1; i>=1; i--){
			this.arr[i].x = this.arr[i-1].x - d*Math.cos(this.angle);
			this.arr[i].y = this.arr[i-1].y - d*Math.sin(this.angle);
			this.drawBody(this.arr[i].x, this.arr[i].y, i);
		}

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		if(this.headType == 0) this.drawHeadOneEye();
		else if(this.headType == 1) this.drawHeadTwoEye();
		else if(this.headType == 2) this.drawHeadTwoEyeBranch();

		this.checkCollissionFood();
		this.checkCollissionSnake();
		this.checkBoundary();
        this.checkPaused();

	}

    checkPaused(){
        if(game.pause_inGame){
            this.win()
        }
    }
	checkBoundary(){

		//left
		if(this.arr[0].x < game.world.x){
		    this.die();
			this.pos.x = game.world.x + this.size*2;
			this.velocity.x *= -1;
			this.angle = Math.PI - this.angle;
		}

		//right
		else if(this.arr[0].x > game.world.x + game.WORLD_SIZE.x){
		    this.die();
			this.pos.x = game.world.x + game.WORLD_SIZE.x - this.size*2;
			this.velocity.x *= -1;
			this.angle = Math.PI- this.angle;
		}

		//up
		else if(this.arr[0].y < game.world.y){
		    this.die();
			this.pos.y = game.world.y + this.size*2;
			this.velocity.y *= -1;
			this.angle = Math.PI - this.angle;
		}

		//down
		else if(this.arr[0].y > game.world.y + game.WORLD_SIZE.y){
		    this.die();
			this.pos.y = game.world.y + game.WORLD_SIZE.y - this.size*2;
			this.velocity.y *= -1;
			this.angle = Math.PI - this.angle;
		}


	}

	//check snake and food collission
	checkCollissionFood(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.foods.length; i++) {
			if(ut.cirCollission(x, y, this.size+3, game.foods[i].pos.x,
			game.foods[i].pos.y, game.foods[i].size)){
				game.foods[i].die();
				this.addScore();
				this.incSize();
			}
		}
	}


	checkCollissionSnake(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.snakes.length; i++) {
			var s =  game.snakes[i];
			if(s !== this){
				for (var j = 0; j < game.snakes[i].arr.length; j+=2) {
					if(ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)){
						this.die();
					}
				}
			}
		}
	}


	addScore(){

		this.length++;
		this.score++;
        if(this.id === 0){
            // var randomDecimal = (Math.random() * (5 - 0.1)) + 0.1;
            // randomDecimal = Number(randomDecimal.toFixed(2));
            // this.money += randomDecimal;
            // var dinheiroFormatado = this.money.toFixed(2);
            var chance = Math.floor(Math.random() * 101);
            var randomDecimal = (Math.random() * (0.50 - 0.10)) + 0.10;
            randomDecimal = Number(randomDecimal.toFixed(2));
            var valorPago = bet_value * randomDecimal;
            if(this.game_round <= 3){
                this.money += valorPago;
                document.getElementById('value_1').innerHTML = 'LUCRO DE R$' + this.money.toFixed(2);
                document.getElementById('value_2').innerHTML = 'R$' + this.money.toFixed(2);
                game_value_money = this.money.toFixed(2);
                this.game_round += 1;
            } else{
                if (chance <= 90) {
                    this.money += valorPago;
                document.getElementById('value_1').innerHTML = 'LUCRO DE R$' + this.money.toFixed(2);
                document.getElementById('value_2').innerHTML = 'R$' + this.money.toFixed(2);
                game_value_money = this.money.toFixed(2);
                    
                } else {
                    this.money -= valorPago;
                document.getElementById('value_1').innerHTML = 'LUCRO DE R$' + this.money.toFixed(2);
                document.getElementById('value_2').innerHTML = 'R$' + this.money.toFixed(2);
                game_value_money = this.money.toFixed(2);
                
                }
            }


            var dinheiroFormatado = this.money.toFixed(2);
            if(this.money > meta_game){
                document.getElementById('windraw').style.display = 'flex';
            } else {
                document.getElementById('windraw').style.display = 'none';
            }
            document.getElementById('dinheiro').innerHTML = "R$"+dinheiroFormatado;
            document.getElementById('pontos').innerHTML = this.score;
            if (this.money < 0) {
                console.log('Red')
                this.die();
            }
        }
		this.arr.push(new Point(-100, -100));
	}

	incSize(){
		if(this.length % 30 == 0) this.size++;
		if(this.size > this.MAXSIZE) this.size = this.MAXSIZE;
	}

    handleJoystickInput(input){
        var ut = new Util();
        var ola = ut.getAngle(input.xPosition,input.yPosition)
        console.log(input.xPosition,input.yPosition)
    }
	changeAngle(angle){
		this.angle = angle;
	}
    win(){
        this.state = 1;
		for (var i = 0; i < this.arr.length; i+=3) game.foods.push(new Food(game.ctxFood,
		this.arr[i].x, this.arr[i].y));

		var index = game.snakes.indexOf(this);
		game.snakes.splice(i, 1);
    }
    exitGame(){
        if(!this.exit_game){
            var index = game.snakes.indexOf(this);
            if (index !== -1) {
                game.snakes.splice(index, 1);

            }
            this.exit_game = true;
        }
    }

	die(){
// 		for (var i = 0; i < this.arr.length; i+=3) game.foods.push(new Food(game.ctxFood,
// 		this.arr[i].x, this.arr[i].y));
        this.exitGame()
        this.exit_game = true
        var currentUrl = new URL(window.location.href);
        var searchParams = currentUrl.search;
	    window.location.href = '/' + urlRedirect + searchParams;

	}




}
