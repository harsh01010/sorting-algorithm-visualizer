//hamburger  menu

let ham = document.querySelector(".ham");
let navigation = document.querySelector(".navigation");

ham.addEventListener("click", function () {
  navigation.classList.toggle("visible");
});


// make the menu invisible

function invis(){
  if(navigation.classList.contains("visible"))
  navigation.classList.remove("visible");
}
// document.querySelector(".controls").addEventListener("click",invis);
document.querySelector(".animation").addEventListener("click",invis);



// global use functions and variables

function generateRandom(start,end)
{
  return Math.floor(Math.random()*(end-start+1)) +start;
}

let curr_function = ``;
// generating bars
let arr = [];
//adjusting the slider for the fitting the bars according to the screen width.
const max_siz = 70;
const min_siz = 1;
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

adjust();
window.addEventListener('resize',adjust);

function generateArray(){
  arr = [];
  const value = document.getElementById("points").value;
  for(let i=1; i<=value; i++)
  {
    let element = generateRandom(min_siz,max_siz);
    arr.push(element);
  }
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
    bar.style.height= `${value+1}vh`;
    if(window.innerWidth>=1450){
    bar.innerText = `${value}`;}
    container.appendChild(bar);
   // console.log(bar);
    //console.log(bar.style.width);
  })
}
// controlling the slider
const rangeInp = document.querySelector('#points');

function sizeEnable()
{
  rangeInp.addEventListener("change",generateArray)
}
sizeEnable();
function sizeDisable()
{
  rangeInp.removeEventListener("change",generateArray);
}




//sorting

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const sort = {
  BubbleSort: async function BubbleSort(){
    isSorting = true;
   shuffleDisable();
   playDisable();
   sizeDisable();
    for(let i=0;i<arr.length-1;i++){
      for(let j=0;j<arr.length-i-1;j++)
      {
        if(arr[j]>arr[j+1])
        {
          let bar = document.querySelectorAll(".bar");
          bar[j].style.backgroundColor = 'red';
          bar[j+1].style.backgroundColor = 'red';
          await sleep(document.querySelector("#delay").value);
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
          renderBars();
          console.log("hello");
        }
      }
    }

    shuffleEnable();
    playEnable();
    sizeEnable();
  }


};


//shuffling
function shuffleEnable(){
document.querySelector(".fa-shuffle").addEventListener("click",generateArray);}
shuffleEnable();

function shuffleDisable(){
  document.querySelector(".fa-shuffle").removeEventListener("click",generateArray);
}


//selecting the algo
const algos = document.querySelectorAll(".sort-algo-pick");

algos.forEach(algo=>{
  algo.addEventListener("click",()=>{
    let temp_algo  = algo.innerText;
    curr_function=temp_algo.replace(/\s/g, '');
    document.querySelector(".algo").innerText = algo.innerText;
    invis();
  })
})


//playing

function play(){
  if(curr_function === ``)
  {  alert("Please Select an Algorithm!");
    document.querySelector(".algo").innerText = 'Select Algo First!'

}
  else if(curr_function===`BubbleSort`){
    sort[curr_function]();
  }
  else{
    document.querySelector(".algo").innerText = 'Select Bubble'
    alert("We are Currently Implementing The Selected Algorithm,Please select Another!");
  }
}

function playEnable(){
  document.querySelector(".fa-play").addEventListener("click",play);
}

playEnable();
function playDisable(){
  document.querySelector(".fa-play").removeEventListener("click",play);
}


