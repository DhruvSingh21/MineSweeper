const cells = document.querySelectorAll('.cell');
const modal = document.querySelector('.modal');
const start = document.querySelector('.start');
const pt = document.querySelector('.first');
const ht = document.querySelector('.second');
let hint=0;
let points=0;

function update_points(){
	let a="Points Scored: ";
	let b=points.toString();
	pt.innerHTML=a+b;
	return;
}

function update_hints(){
	let a="Hints Used: ";
	let b=hint.toString();
	ht.innerHTML=a+b;
	return;
}

function show_bombs(){
	return;
}

function game_lost(){
	show_bombs();
	return;
}
function check_bomb(a){
	if(a.target.classList[2]!="bomb") 
		{
			points++;
			update_points();
			update_hints();
			return;
		}
	
	game_lost();
}

function change(a) {
  check_bomb(a);
  a.target.classList.add("clicked");
};

for(const cell of cells){
	cell.addEventListener('click',change);
};
