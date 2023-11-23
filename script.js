//hamburger  menu
let ham = document.querySelector(".ham");
let navigation = document.querySelector(".navigation");

ham.addEventListener("click", function () {
  navigation.classList.toggle("visible");
});

function openTab() {
  window.open("https://github.com/harsh01010/sorting-algorithm-visualizer", "_blank");
  }

document.querySelector(".fa-github").addEventListener("click",openTab);

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
  renderBars(true);

}
generateArray();

function renderBars(colorChange){
  let container = document.querySelector(".bars");
  container.innerHTML = '';
  const width = 80/document.getElementById("points").value;
  arr.forEach(value=>{
    let bar = document.createElement('div');
    bar.classList.add("bar");
    if(colorChange)
    bar.style.backgroundColor = `rgb(6, 82, 145)`;
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
          renderBars(true);
          console.log("hello");
        }
      }
    }

    shuffleEnable();
    playEnable();
    sizeEnable();
  },

  InsertionSort: async function InsertionSort(){
   shuffleDisable();
   playDisable();
   sizeDisable();
   for(let i=0; i<arr.length; i++)
   {  let curr = arr[i];
    let j = i-1;
    let bar = document.querySelectorAll(".bar");
    //console.log(bar[j].style);
    while(j>=0 && arr[j]>curr)
    { 
        bar[j].style.backgroundColor = 'red';
        bar[j+1].style.backgroundColor = 'red';
        await sleep(document.querySelector("#delay").value);
        renderBars(true);
        //console.log(bar[j+1].style.backgroundColor);
      arr[j+1] = arr[j];
        j = j-1;
      }
      bar[j+1].style.backgroundColor = 'red';
      arr[j+1] = curr;
      await sleep(document.querySelector("#delay").value);
      renderBars(true);
   }
   shuffleEnable();
   playEnable();
   sizeEnable();
  },
  SelectionSort: async function SelectionSort(){
    shuffleDisable();
    playDisable();
    sizeDisable();
    for(let i=0; i<arr.length-1; i++)
    {
      let bar = document.querySelectorAll(".bar");
      min_ind = i;
      for(let j=i+1; j<arr.length; j++)
      {
        if(arr[j]<arr[min_ind])
          min_ind=j;

      }
      bar[i].style.backgroundColor = 'red';
      bar[min_ind].style.backgroundColor = 'red';
      await sleep(document.querySelector("#delay").value);
      renderBars(true);
      let temp = arr[min_ind];
      arr[min_ind]=arr[i];
      arr[i] = temp;
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
  else{
    sort[curr_function]();
  }
  // else{
  //   document.querySelector(".algo").innerText = 'Select Bubble'
  //   alert("We are Currently Implementing The Selected Algorithm,Please select Another!");
  // }
}

function playEnable(){
  document.querySelector(".fa-play").addEventListener("click",play);
}

playEnable();
function playDisable(){
  document.querySelector(".fa-play").removeEventListener("click",play);
}


