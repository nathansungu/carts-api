import axios from "axios";

//define button
const catFacts = document.getElementById("facts-number");
const catPictures = document.getElementById("images-number");
// output container
const imageContainer = document.getElementById("images-container");
const factsContainer = document.getElementById("facts-container");

//get loader element
const loader = document.getElementById("loader");

//function to listen to events
function eventListener() {
  const clickedButtons = document.querySelectorAll(".option");
  clickedButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const clickedId = event.target.id;
      loader.style.display="flex"
      
      if (catFacts.value >50|| catPictures.value>10) {
        catFacts.value=50;
        catPictures.value=10;        
        
      }
      const factsUrl = `https://meowfacts.herokuapp.com/?count=${catFacts.value}`;
      const imagesUrl = `https://api.thecatapi.com/v1/images/search?limit=${catPictures.value}`;

      if (clickedId == "fact") {
        fechData(factsUrl, clickedId);
      } else {
        fechData(imagesUrl, clickedId);
      }
    });
  });
}

//function to fecht from api
const fechData = (url, id) => {
  const responce = axios.get(url);
  responce.then((dataResponse) => {
    let {
      data: { data },
    } = dataResponse;

    if (id == "fact") {
      //print facts
      factsContainer.innerText="";
      imageContainer.innerText="";
      loader.style.display="none";
      for (let i = 0; i < data.length; i++) {
        factsContainer.innerHTML += `<p class="item">${i + 1}. <span>${
          data[i]
        } </span></p> <br>`;
      }
    } else {
      const { data } = dataResponse;
      imageContainer.innerText="";
      factsContainer.innerText="";
      loader.style.display="none";
      for (let i = 0; i < data.length; i++) {
        let imageobject = data[i];
        const {  url } = imageobject;
        imageContainer.innerHTML += `<img src="${url}" > `;
      }
    }
  });
  responce.catch((e)=>{
    factsContainer.innerText="Ooops, sorry. An error happened."

  })
};

eventListener();
