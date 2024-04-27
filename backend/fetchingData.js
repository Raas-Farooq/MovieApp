import fetch from 'node-fetch';




    const dest = {method:'GET', headers: {accept: 'application/json'}};
    const api = '404e6e5185b680aad4b9021a88de3b27';

    const myBelief = [{
        results:{
            data:'first',
            title:"Worship"
    }
    }]
    let collection = [];


    const importData = (section) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api}&include_adult=false&include_video=false&language=en-US&page=${section}&sort_by=popularity.desc`;
    fetch(url,dest).then
    (response => response.json()).then
    (data => {
        // console.log("Received the Movies Collection: ", data.results[0].title);
        collection.push(data);
    }).catch(err=> console.log("only Al Hakeem can Help You: ", err))
    }
    // importData(2);
    console.log("Collection outside: ",collection)
    for (let i = 1; i<10; i++)
        {
        importData(i);
    }



export default collection