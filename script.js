const cells = document.querySelectorAll('.cell');
const modal = document.querySelector('.modal');
const start = document.querySelector('.start');
const pt = document.querySelector('.first');
const ht = document.querySelector('.second');
const star = document.querySelector('.sw');
const hintt = document.querySelector('.hintbutton');
const elapsed = document.querySelector('.elp');
let hint=0;
let first=-1;
let points=0;
let load=-1;
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
				if(i-15>=0 && i%15!=0 && cells[i-16].classList[2]=="bomb") cnt++;
				if(i%15!=14 && i-15>=0 && cells[i-14].classList[2]=="bomb") cnt++;
				if(i-15>=0 && cells[i-15].classList[2]=="bomb") cnt++;
				if(i%15!=0 && cells[i-1].classList[2]=="bomb") cnt++;
				if(i+15<150 && cells[i+15].classList[2]=="bomb") cnt++;
				if(i+16<150 && i%15!=14 && cells[i+16].classList[2]=="bomb") cnt++;
				if(i+15<150 && i%4!=0 && cells[i+14].classList[2]=="bomb") cnt++;
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
	points-=4;
  hintarr.splice(0, 1);
	let a="Hints Used: ";
	let b=hint.toString();
	ht.innerHTML=a+b;
	update_points();
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
	sw.stop();
	return;
}
function check_bomb(a){
	if(a.target.classList[2]!="bomb") 
		{
			points+=10;
			update_points();
			var index=hintarr.indexOf(Number(a.target.classList[1]));
			hintarr.splice(index, 1);
			return;
		}
	gameover=1;
	game_lost();

hintt.removeEventListener('click',update_hints);
for(const cell of cells){
	cell.classList.add("over");
	cell.removeEventListener('click',change);
};

}

function change(a) {
  check_bomb(a);
  a.target.classList.add("clicked");
  if(first==-1) 
  	{
  		first=Number(a.target.classList[1]);
  		generate_board();
  		update_numbers();
  		shuffleArray(hintarr);
  		sw.start();
  		star.classList.add("started");
  		elapsed.classList.add("started");
  	}
  if(hint+points+bombs==150) win();
};


hintt.addEventListener('click',update_hints);
for(const cell of cells){
	cell.addEventListener('click',change);
};

var sw = {
  
  etime : null, 
  erst : null, 
  ego : null, 
  init : function () {
    load=1;
    sw.etime = document.getElementById("sw-time");
    sw.ego = document.getElementById("sw-go");
  },

  timer : null, // timer object
  now : 0, // current elapsed time
  tick : function () {

    sw.now++;
    var remain = sw.now;
    var hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    var mins = Math.floor(remain / 60);
    remain -= mins * 60;
    var secs = remain;

    if (hours<10) { hours = "0" + hours; }
    if (mins<10) { mins = "0" + mins; }
    if (secs<10) { secs = "0" + secs; }
    sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
  },
  
  start : function () {
    sw.timer = setInterval(sw.tick, 1000);
  },

  stop  : function () {
    clearInterval(sw.timer);
    sw.timer = null;
  },

};
window.addEventListener("load", sw.init);

window.addEventListener('contextmenu', function (e) { 
  // do something here... 
  e.preventDefault(); 
}, false);