console.log("Am i Running")

let mySuccess;
document.addEventListener('DOMContentLoaded', e => {
    fetch('http://localhost:3003/movies/api/onLoad').then
    (response => response.json()).
    then(data => {
        console.log("Movies Complete DAta: ",data);
        mySuccess = data;
        showImages(mySuccess);
        console.log("data.genres: ",data[0]);
        console.log("imagePath: ",data[0].image);
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
    console.log("show Images have Run ",mySuccess);

    
    mySuccess.forEach(success => {
            if(!success.image){
                console.log("File Path err ", success)

            }
            // else if(!success.image.includes('/')){
            //     console.log('It is Success ', success);
            // }
            else
            {
                const card = document.createElement('div');
                const imgHold = document.createElement('div');
                const detail = document.createElement('div');
                const myImg = document.createElement('img');
                const name = document.createElement('h5');
                const del = document.createElement('button');
                del.className = 'del';
                del.textContent = 'Delete';
                card.className = 'imgParent';
                imgHold.className = 'imgContainer';
                card.id = success._id;
                myImg.id = 'mainImg';
                // name.style.textAlign="center"

                myImg.src = `https://image.tmdb.org/t/p/w500/${success.image}`;
                name.textContent = success.name;
                detail.className = 'charac';
                detail.append(name);
                detail.append(del);
                imgHold.append(myImg);
                card.append(imgHold);
                card.append(detail);
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
        })
        //.join('')
        // console.log("Images after Join:", images)
        // imageContainer.append(images);
        // imageContainer.innerHTML = `${imageContainer.innerHTML} ${images}`

   
}

// Adding new Movie
let filmName, filmImage;
const addMovie= document.querySelector('#addBtn');
const movieName= document.querySelector('#name');
const movieImage= document.querySelector('#img');
movieName.addEventListener('input', e => {
    console.log("value: ", e.target.value);
    filmName = e.target.value;
})
movieImage.addEventListener('input', e => {
    console.log("value: ", e.target.value);
    filmImage = e.target.value;
})
addMovie.addEventListener('click', e => {
    e.preventDefault();
    const newId = new Date().getTime().toString();
    console.log("New Id; ", newId);
    // console.log("Before removal - Number of children: ", imageContainer.firstChild);
    
    // imageContainer.innerHTML = '';
    // console.log("form Submitted", e.target.value);
    console.log(` name : ${filmName} and image : ${filmImage}`);
    const item = {
        id:newId,
        image:filmImage,
        name:filmName
    };

    fetch('http://localhost:3003/movies/api/addMovie',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(item)
    }).then(response => response.json())
    .then(data => console.log("here is the data of Post: ", data))
    .catch(err => console.log("Err of ASAR(Time): ", err));

    movieName.value = ''
    movieImage.value = '';
})

// deleting a Movie

const movie = document.querySelector('.movieData');

movie.addEventListener('click', e => {
    console.log("Movie card clicked ", e.target);
    console.log("parent ", e.target.parentElement.parentElement);
    
    if( e.target.classList.contains('del')){
        const parent = e.target.parentElement.parentElement;
        movie.removeChild(parent);
        const id = parent.id;
        fetch(`http://localhost:3003/movies/api/deleteMovie?id=${id}`,
    {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    }

    
})
// Searching A MOvie
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
    fetch(`http://localhost:3003/movies/api/getSearch?search=${userSearch}`).
    then(response => response.json()).
    then(data => {
        console.log("Onlyy data for Search : ",data);
        console.log("Search Result in FrontEnd: ",data[0].results);
        showImages(data);
    }).
    catch(err => console.log("you can PUt more effort: ", err))
    search.value = '';
    userSearch = ''

})


