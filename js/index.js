// JavaScript source code 
//AIzaSyAOTCouh6Nu7BHpVbUwUeJ6Ov8NUA8NW4I
let vidUrl = "https://www.youtube.com/watch?v=";
let getUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&";
let API = "&key=AIzaSyAOTCouh6Nu7BHpVbUwUeJ6Ov8NUA8NW4I";
let pgNum = 0;
let btnPrev = document.getElementById('prev');
let btnNext = document.getElementById('next');
let videoList = document.getElementsByClassName("content");

function watchForm() {
    let form = document.getElementById("formE");
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let text = document.getElementById("search");
        fetchVideos(text.value);
        text.value = '';
    });
}

function fetchVideos(search) {
    pgNum = 0;
    let url = getUrl + "q=" + search + API;
    let settings = {
        method: "GET"
    };
    fetch(url, settings)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            console.log(response);
        })
        .then((responseJSON) => {
            console.log(responseJSON);
            loadContent(responseJSON);
        })
}

function loadContent(responseJSON) {
    displayVideos(responseJSON);
    watchButtons(responseJSON);
}

function displayVideos(responseJSON) {
    videoList[0].innerHTML='';

    for (let i = pgNum; pgNum < (i + 10); pgNum += 1) {
        console.log(pgNum);
        let imgSrc = responseJSON.items[pgNum].snippet.thumbnails.default.url;
        let title = responseJSON.items[pgNum].snippet.title;
        let linkYT = responseJSON.items[pgNum].id.videoId;
        if (imgSrc !== null) {
            videoList[0].innerHTML+=`
                <li class="vid">
                    <a class="vidThumbnail" href="${vidUrl}${linkYT}" target="_blank"><img src="${imgSrc}" /></a>
                    <a class="vidTitle" href="${vidUrl}${linkYT}" target="_blank">${title}</a>
                </li>
            `;
        }
    }
    if (pgNum <= 10) {
        btnPrev.style.display = 'none';
        btnNext.style.display = 'initial';
    }
    else {
        if (pgNum > 49) {
            btnPrev.style.display = 'initial';
            btnNext.style.display = 'none';
        }
        else {
            btnPrev.style.display = 'initial';
            btnNext.style.display = 'initial';
        }
    }
}

function watchButtons(responseJSON) {
    btnPrev.addEventListener('click', function (e) {
        pgNum -= 20;
        displayVideos(responseJSON);
    });

    btnNext.addEventListener('click', function (e) {
        displayVideos(responseJSON);
    });
}

function init() {
    watchForm();
}

init();