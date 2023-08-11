const auth = "LHyEQlyJ6dtUC2wr84zkAz9g2wqXMV3VzbY9NsfrdDSoiBslRpoJfPBc";
const inputField = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const moreBtn = document.querySelector(".more-btn");
const gallery = document.querySelector(".gallery");
let searchInput="";
let page = 1;

async function getApi(url) {
    const dataFetch = await fetch(url, {
        method: 'Get',
        headers:{
        Accept:"application/json",
       Authorization: auth
        }
    });

    const data = await dataFetch.json();
    return data;
}

async function createDiv(data) {

    data.photos.forEach(photo => {
        const gallaryImage = document.createElement("div");
        gallaryImage.classList.add("gallery-div");
        gallaryImage.innerHTML = `<img class="image" src=${photo.src.large}></img>
                        <div class="nav">
                         <p>${photo.photographer}</p>
                         <a href=${photo.src.original}><i class="fa-solid fa-download"></i></a></div>`;
                         gallery.appendChild(gallaryImage);
    });
 } 

function getInput() {
    const input = inputField.value;
    searchImages(input);
    inputField.value = "";
}


async function randomImages() {
 
 const data = await getApi(  "https://api.pexels.com/v1/curated?page=1&per_page=15");
  console.log(data);
   createDiv(data); 
}

async function searchImages(query) {
    gallery.innerHTML = "";
    searchInput = query;
    const data = await getApi(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    )
    console.log(data);
    createDiv(data);
 
}

async function moreImages() {
    if (searchInput) {
        page++;
        const data = await getApi(`https://api.pexels.com/v1/search/?page=${page}&per_page=15&query=${searchInput}`
        )
        createDiv(data);
    } else {
        page++;
        const data = await getApi(  `https://api.pexels.com/v1/curated/?page=${page}&per_page=15`);
  console.log(data);
   createDiv(data); 
    }
}


//event listners

searchBtn.addEventListener("click", getInput);
moreBtn.addEventListener("click", moreImages);

    randomImages();


