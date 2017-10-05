import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {
	
	totalcell:number;
	totalrow:number;
	snake:number[];
	target:number;
	board:cell[];
	movement:string;
	nextmove:string;
	snakedead:boolean;
	msg:string;
	
	constructor(){
		this.totalrow=20;
		this.totalcell=(this.totalrow*this.totalrow);
		this.movement='Right';
		this.nextmove='Right';
		this.snakedead=false;
	}

	ngOnInit(){
		this.snake=[54,53,52,51,50];
		this.changetarget();
		this.createsnake();
		this.keepmoving();
	}
	
	@HostListener('document:keydown', ['$event'])
    keydown(e: KeyboardEvent) {
        switch(e.key){
			case 'ArrowUp': {
				this.nextstep('Up');
				break; 
			}
			case 'ArrowDown': {
				this.nextstep('Down');
				break; 
			}
			case 'ArrowLeft': {
				this.nextstep('Left');
				break; 
			}
			case 'ArrowRight': {
				this.nextstep('Right');
				break; 
			}
		}
    }
	
	keepmoving(){
		var speed=200;
		switch(true){
			case (this.snake.length >= 10 && this.snake.length < 15):
				speed=175;
				break;
			
			case (this.snake.length >= 15 && this.snake.length < 20):
				speed=150;
				break;
			
			case (this.snake.length >= 20 && this.snake.length < 25):
				speed=125;
				break;
			
			case (this.snake.length >= 25 && this.snake.length < 30):
				speed=100;
				break;
			
			case (this.snake.length >= 30 && this.snake.length < 35):
				speed=85;
				break;
			
			case (this.snake.length >= 35 && this.snake.length < 40):
				speed=70;
				break;
			
			case (this.snake.length >= 40):
				speed=50;
				break;
		}
	
		switch(this.nextmove){
			case 'Right': { 
				this.movement=this.nextmove;
				break; 
			} 
			case 'Left': { 
				this.movement=this.nextmove;
				break; 
			} 
			case 'Up': {
				this.movement=this.nextmove;
				break; 
			} 
			case 'Down': {
				this.movement=this.nextmove;
				break; 
			} 
		}
		
		switch(this.movement){
			case 'Right': {
				this.moveright();
				break; 
			} 
			case 'Left': {
				this.moveleft();
				break; 
			} 
			case 'Up': {
				this.moveup();
				break; 
			} 
			case 'Down': {
				this.movedown();
				break; 
			} 
		}
		setTimeout(() => {
			this.keepmoving();
		}, speed);
	}
	
	moveright(){
		if( Math.floor((this.snake[0]+1)/this.totalrow) > Math.floor((this.snake[0]/this.totalrow)) ){
			var nextstp=((Math.floor((this.snake[0]/this.totalrow)))*this.totalrow);
		}else{
			var nextstp=(this.snake[0]+1);
		}
		this.isdead(nextstp);
		this.snake.unshift(nextstp);
		
		this.istargethit(nextstp);
		this.createsnake(); // rerender the snake
	}
	
	moveleft(){
		if( (this.snake[0]%this.totalrow)==0 ){
			var nextstp=( (this.snake[0]+this.totalrow)-1 );
		}else{
			var nextstp=(this.snake[0]-1);
		}
		this.isdead(nextstp);
		this.snake.unshift(nextstp);
		
		this.istargethit(nextstp);
		this.createsnake(); // rerender the snake
	}
	
	moveup(){
		if( this.totalrow > this.snake[0] ){
			var nextstp=((this.totalcell-this.totalrow)+this.snake[0]);
		}else{
			var nextstp=(this.snake[0]-this.totalrow);
		}
		this.isdead(nextstp);
		this.snake.unshift(nextstp);
		
		this.istargethit(nextstp);
		this.createsnake(); // rerender the snake
	}
	
	movedown(){
		if( (this.totalcell-this.totalrow) <= this.snake[0] ){
			var nextstp=(this.totalrow-(this.totalcell-this.snake[0]));
		}else{
			var nextstp=(this.snake[0]+this.totalrow);
		}
		this.isdead(nextstp);
		this.snake.unshift(nextstp);
		
		this.istargethit(nextstp);
		this.createsnake(); // rerender the snake
	}
	
	istargethit(nextstp){
		if(this.target!=nextstp){
			this.snake.pop();
		}else{
			this.changetarget();
		}
	}
	
	isdead(nextstp){
		
		if(this.snake.includes(nextstp)){
			console.log(nextstp);
			this.snakedead=true;
		}
	}
	
	nextstep(direction){
		switch(direction){
			case 'Right': { 
				if(this.movement!='Left'){
					this.nextmove=direction;
				}
				break; 
			} 
			case 'Left': { 
				if(this.movement!='Right'){
					this.nextmove=direction;
				}
				break; 
			} 
			case 'Up': {
				if(this.movement!='Down'){
					this.nextmove=direction;
				}
				break; 
			} 
			case 'Down': {
				if(this.movement!='Up'){
					this.nextmove=direction;
				}
				break; 
			} 
		}
	}
	
	changetarget(){
		var newt=Math.floor((Math.random() * this.totalcell) );
		if(this.snake.includes(newt)){
			this.changetarget();		
		}else{
			this.target=newt;
		}
	}
	
	createsnake(){
		if(this.snakedead){
			this.msg="Game Over"
		}else{
			this.board=[];
			for(let i=0; i<this.totalcell; i++){
				var c={cindex:i,snakebody:false, snakehead:false, snaketail:false, target:false };	
				if(this.snake.includes(i)){
					c.snakebody=true;
					if(i===this.snake[0]){
						c.snakehead=true;
					}else if(i===this.snake[this.snake.length-1]){
						c.snaketail=true;
					}
				}
				if(i==this.target){
					c.target=true;
				}
				this.board.push(c);
			}
		}
	}
}

interface cell{
	cindex:number,
	snakehead:boolean,
	snakebody:boolean,
	snaketail:boolean,
	target:boolean,
}
