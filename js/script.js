// Setting up a const for url of our API for G News

const url = "https://gnews.io/api/v4/";

// Get inputs

const countrySelect = document.getElementById('countrySelect');
const topicSelect = document.getElementById('topicSelect');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const langSelect = document.getElementById('langSelect');


// API token call

$.ajax ({
    type: 'GET',
    url: './js/config.json',

    // giving the object inside the json a name of 'response'
    success: function(response) {
        token = response.token;
        console.log(token);
        mainFunction(token);
    },
    error: function() {
        console.log('error - mainFunction');
    }
})

// Basic ajax to go and get some news and populate our result - GET top headlines
// Putting the value of the token into myKey
function mainFunction(myKey) {
  
    const key = myKey;
    getNews('en', 'breaking-news');

    $('#searchSubmit').click(function() {
        searchNews(searchInput.value);
    })

    $('#topicSelect').change(function() {
        filtered(countrySelect.value, topicSelect.value, langSelect.value);
    })

    $('#countrySelect').change(function() {
        filtered(countrySelect.value, topicSelect.value, langSelect.value);
    })

    $('#langSelect').change(function() {
        filtered(countrySelect.value, topicSelect.value, langSelect.value);
    })

    // filtered function is running our getNews function
    function filtered() {
        getNews(countrySelect.value, topicSelect.value, langSelect.value);
    }

    function getNews (country, topic, language) {

        $.ajax ({
            // url: `${url}top-headlines?apikey=${key}`,
            url: `${url}top-headlines?category=${topic}&lang=${language}&country=${country}&apikey=${key}`,
            type: 'GET',
            data: 'json',
            // pulling back an array called newsData
            success: function (newsData) {
                let results = document.getElementById('results');
                results.innerHTML = '';
                let i = 0;
                for (i = 0; i < newsData.articles.length; i++) {
                    let story = newsData.articles[i];
                    console.log(story);
                    results.innerHTML += `
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="card mt-3">
                            <img src="${story.image}" class="card-img-top" alt="news image">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${story.title}</h5>
                                <p class="card-text fw-light"> 
                                    ${story.description}<br><br>Source: <a class="text-primary" href="${story.source.url}" target="_blank">${story.source.name}</a><br><br><a class="text-danger" href="${story.url}" target="_blank">View full article</a>
                                </p>
                            </div>
                        </div>
                    </div>
    
                    `
                }
            },
            error: function () {
                console.log('error - newsData function');
            } 
        })
  
    }

    function searchNews(search) {
        console.log(search);

        $.ajax({
            url: `${url}search?q=${search}&lang=en&apikey=${key}`,
            type: 'GET',
            data: 'json',
            success: function(newsData) {
                let results = document.getElementById('results');
                results.innerHTML = '';
                for (let i = 0; i < newsData.articles.length; i++) {
                    let story = newsData.articles[i];
                    results.innerHTML += `
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="card mt-3">
                            <img src="${story.image}" class="card-img-top" alt="news image">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${story.title}</h5>
                                <p class="card-text fw-light"> 
                                    ${story.description}<br><br>Source: <a class="text-primary" href="${story.source.url}" target="_blank">${story.source.name}</a><br><br><a class="text-danger" href="${story.url}" target="_blank">View full article</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                    console.log(newsData);
                }                
            },
            error: function () {
                console.log('could not do search');
            }
        })
    }

}

// function aboutMe() {
//     let aboutMe = document.getElementById('aboutMe');
//     aboutMe.innerHTML = '';
//     aboutMe.innerHTML += `
//     <div class="col-lg-4 col-md-6 col-sm-12">
//         <p>Hi there my name is Christine</p>
//     </div>
//     `
// }

// aboutMe();
