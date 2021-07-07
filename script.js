const cells = document.querySelectorAll('.cell');
const modal = document.querySelector('.modal');
const start = document.querySelector('.start');
const pt = document.querySelector('.first');
const ht = document.querySelector('.second');
const hintt = document.querySelector('.hintbutton');
let hint=0;
let first=-1;
let points=0;
let bombs=0;
var bombarr =[];
var hintarr =[];
let gameover=0;

function generate_board(){
bombs= Math.floor(Math.random()*65) + 25;

while(bombarr.length < bombs){
    var r = Math.floor(Math.random()*149);
    if(bombarr.indexOf(r) === -1 && r!=first) bombarr.push(r);
}
for(var i=0;i<bombarr.length;i++)
{
cells[bombarr[i]].classList.add("bomb");
}
}

function update_numbers(){
	for(var i=0;i<cells.length;i++)
	{
		if(cells[i].classList[2]!="bomb") 
			{
				hintarr.push(i);
				let cnt=0;
				if(i-15>=0 && cells[i-15].classList[2]=="bomb") cnt++;
				if(i%15!=0 && cells[i-1].classList[2]=="bomb") cnt++;
				if(i+15<150 && cells[i+15].classList[2]=="bomb") cnt++;
				if(i%15!=14 && cells[i+1].classList[2]=="bomb") cnt++;
				cells[i].innerHTML=cnt;
			}
	}
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function update_points(){
	let a="Points Scored: ";
	let b=points.toString();
	pt.innerHTML=a+b;
	return;
}

function count_neighbour(a){
let count=0;
var t = a.target.classList[1];
const pt = document.querySelector('.first');
}

function update_hints(){
	cells[hintarr[0]].classList.add("clicked");
	hint++;
  hintarr.splice(0, 1);
	let a="Hints Used: ";
	let b=hint.toString();
	ht.innerHTML=a+b;
	return;
}

function show_bombs(){
	for(var i=0;i<cells.length;i++)
	{
		if(cells[i].classList[2]=="bomb") cells[i].classList.add("bombvisible");
	}
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
			var index=hintarr.indexOf(Number(a.target.classList[1]));
			hintarr.splice(index, 1);
			return;
		}
	gameover=1;
	game_lost();
}

function change(a) {
	console.log(hintarr);
  check_bomb(a);
  a.target.classList.add("clicked");
  if(first==-1) 
  	{
  		first=Number(a.target.classList[1]);
  		generate_board();
  		update_numbers();
  		shuffleArray(hintarr);
  	}
  if(hint+points+bombs==150) win();
};
console.log(bombarr);
hintt.addEventListener('click',update_hints);
for(const cell of cells){
	cell.addEventListener('click',change);
};

