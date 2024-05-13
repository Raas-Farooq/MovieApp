const home = document.querySelector('.home');
const editingContainer = document.querySelector('.editingContainer');
home.addEventListener('click', e => {
    window.location.href='./movies.html';   
})
let movieId;
document.addEventListener('DOMContentLoaded', e => {
    console.log("I'm Loaded");
    const urlSearch = new URLSearchParams(window.location.search);
    const urlSearchParams = new URLSearchParams(window.location.search);

    movieId = urlSearch.get('id');
    console.log('movieId received: ', movieId);

    fetch(`http://localhost:3003/movies/api/getEdit?id=${movieId}`)
    .then(response => response.json())
    .then(data => {
        console.log("it is the Edit Movie: ", data);
        showMovie(data);
    }).catch(error => console.log("Unable to get the Editing movie: ", error))
})



function showMovie(success)
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
    detail.className = 'nameBtn';
    detail.append(name);
    detail.append(del);
    imgHold.append(myImg);
    card.append(imgHold);
    card.append(detail);
    editingContainer.appendChild(card);
}


let filmName, filmImage;
const editMovie= document.querySelector('#editBtn');
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


editMovie.addEventListener('click', e => {
    const id = movieId;
    console.log("THis is the id after edit click: ", id);
    const movieData = {
        id:id,
        image:filmImage,
        name:filmName
    } 

    fetch(`http://localhost:3003/movies/api/editingMovie/${id}`, {
        method:PUT,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(movieData)
    }).then(response => response.json())
    .then(data => {
        console.log(" Allah(SWT) forgive us in PUt: ",data);
    })
    .catch(err =>console.log("Purify from All Mistakes: ", err))

    movieName = '';
    movieImage = ''; 
})