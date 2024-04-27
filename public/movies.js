console.log("JS IS HERE")

let mySuccess;
document.addEventListener('DOMContentLoaded', e => {
    fetch('http://localhost:3003/onLoad').then
    (response => response.json()).
    then(data => {
        console.log("Movies Complete DAta: ",data);
        mySuccess = data;
        showImages(mySuccess);
        console.log("data.genres: ",data[0].results[0].title);
        // console.log("imagePath: ",data.results[0].backdrop_path);
        // const img = document.querySelector('#mainImg');
        // img.src = `https://image.tmdb.org/t/p/w500/${data.results[0].backdrop_path}`;
    }).catch(err => console.log("Ask Help to Survive", err))
})
let count = 0;
const imageContainer = document.querySelector('.movieData');

const img = document.querySelector('#mainImg');


// img.src = "C:/Users/Public/Pictures/Current%20Pics/exciting.jpg";

function showImages(mySuccess){
    let images;
    console.log("show Images have Run ",mySuccess.length);
    for(let i=0; i < mySuccess.length; i++){
        console.log("MYSucess: ", mySuccess[i]);
        images = mySuccess[i].results.map(success => {
            if(!success.backdrop_path){
                console.log("File Path err")
            }else{
                
                const card = document.createElement('div');
                const imgHold = document.createElement('div');
                const myImg = document.createElement('img');
                const name = document.createElement('h5');

                card.className = 'imgParent';
                imgHold.className = 'imgContainer';
                myImg.id = 'mainImg';
                name.style.textAlign="center"

                myImg.src = `https://image.tmdb.org/t/p/w500/${success.backdrop_path}`;
                name.textContent = success.title;

                imgHold.append(myImg);
                card.append(imgHold);
                card.append(name);

                imageContainer.appendChild(card);
                // return `
                // <div class="imgParent">
                //         <div id="imgContainer">
                //             <img id="mainImg" src=${`https://image.tmdb.org/t/p/w500/${success.backdrop_path}`}  >
                //         </div>
                //         <h5 style="text-align:center">${success.title}</h5>
                //     </div>
                // `    
            }
        })//.join('')
        // console.log("Images after Join:", images)
        // imageContainer.append(images);
        // imageContainer.innerHTML = `${imageContainer.innerHTML} ${images}`
    }
   
}


// Second Document Event listener

const search = document.querySelector('#search');
const myForm = document.querySelector('#myForm');
let userSearch;
search.addEventListener('input', e => {
    console.log("value: ", e.target.value);
    userSearch = e.target.value;
})
myForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log("Before removal - Number of children: ", imageContainer.firstChild);
    while(imageContainer.firstChild){
        imageContainer.removeChild(imageContainer.firstChild)
    }
    // imageContainer.innerHTML = '';
    console.log("form Submitted");
    console.log("Your Search: ", userSearch);
    fetch(`http://localhost:3003/getSearch?search=${userSearch}`).
    then(response => response.json()).
    then(data => {
        console.log("Search Result in FrontEnd: ",data);
        showImages(data);
    }).
    catch(err => console.log("you can PUt more effort: ", err))
    search.value = '';
    userSearch = ''

})


