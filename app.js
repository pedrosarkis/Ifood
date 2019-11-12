const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const request = require('request-promise-native');



app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(express.static('./public'));




app.get('/',(req,res)=> {
    res.sendfile('index.html',{root : __dirname})
});


// playlist pop 7nqrEadpfJPRHRDrWr3v89
// classical playlist 5tXCRZAUKp2uqtmJZNkQxY
// rock playlist 0Gp7v8nXrvkbCkewRQa5jE
// party 4TxX6DAUoMCHBYNczoSbUb


app.get('/temp', async (req,res)=>{
    let playlist;

    let temperature = req.query ;
    let tempe = parseInt(temperature.temp)
    if(tempe > 30){
        playlist = '4TxX6DAUoMCHBYNczoSbUb';
    } else if (tempe >14 && tempe < 30) {
        playlist = '7nqrEadpfJPRHRDrWr3v89'
    } else if (tempe > 9 && tempe < 15){
        playlist = '0Gp7v8nXrvkbCkewRQa5jE'
    } else {
        playlist ='5tXCRZAUKp2uqtmJZNkQxY'; 
    }

    let token = 'BQBVwuLNwwz1vdm1RXDVT29yRPreNS6KOHNNSfmMBkCwOzKynU11YCkQMxBGUVOVPjIPhIj53LAkSHS6KV5tLlEPv7ebND2EjzaJ4z7IhW5mU7-M5khlZlvTQ5yfZGys8TfFHaMiw0Wlf268DjXQEoEHf3LIMsgvZ_hRoKc0hkPlF81bsVkD2uue8LxCkBHQWpA734LCIuiCWx-5BZn61SfzzdTuWjDR3aBKAcMBsRL35iJuUhEooGiMICa1HnMprAPa-fMfv7St1fCYLWBSuJeFxJJlrw'
    let options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/playlists/${playlist}/tracks?market=br&fields=items(track(name))&limit=5`,
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`


        }

    };
    const spotify = await request(options);
    res.json(spotify);
    console.log(spotify);



})

app.listen(8080);


module.exports = app; 
