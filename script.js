//hamburger  menu

let ham = document.querySelector(".ham");
let navigation = document.querySelector(".navigation");

ham.addEventListener("click", function () {
  console.log("hello world\n");
  navigation.classList.toggle("visible");
});


// global use functions

function generateRandom(start,end)
{
  return Math.floor(Math.random()*(end-start+1)) +start;
}

// generating bars
let arr = [];
//adjusting the slider for the fitting the bars according to the screen width.
window.addEventListener('resize',adjust);
function adjust(){
const width = window.innerWidth;

if(width>=814){
  document.querySelector("#points").max = 100;
  document.querySelector("#points").value = 40;
}
else if(width<814 && width>=520)
{
  document.querySelector("#points").max = 65;
}
else if(width<520 && width>=320)
{
  document.querySelector("#points").max = 45;
  document.querySelector("#points").value = 25;
}
else if(width<320)
{
  document.querySelector("#points").max = 25;
  document.querySelector("#points").value = 15;
}
generateArray();
console.log("fired!");
}

const max_siz = 70;
const min_siz = 1;
function generateArray(){
  arr = [];
  const value = document.getElementById("points").value;
  for(let i=1; i<=value; i++)
  {
    let element = generateRandom(min_siz,max_siz);
    arr.push(element);
  }
  console.log(arr);
  renderBars();

}
generateArray();

function renderBars(){
  let container = document.querySelector(".bars");
  container.innerHTML = '';
  const width = 80/document.getElementById("points").value;
  arr.forEach(value=>{
    let bar = document.createElement('div');
    bar.classList.add("bar");
    bar.style.width= `${width}vw`;
    bar.style.height= `${value}vh`;
    container.appendChild(bar);
   // console.log(bar);
    //console.log(bar.style.width);
  })
}
// controlling the slider
const rangeInp = document.querySelector('#points');
rangeInp.addEventListener("change",function(){
  generateArray();
  console.log(rangeInp.value);
},false)