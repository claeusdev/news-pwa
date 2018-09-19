const APIKEY = "5dcc4913e1c34514b3cd0326aa449118";
const main = document.querySelector('#app')
const source = document.querySelector("#sourceSelect");
const defaultSource = 'associated-press'


window.addEventListener('load', async e => {
    updateNews()
    await updateSources()

    source.value = defaultSource

    source.addEventListener('change', e => {
        updateNews(e.target.value)
    })
})

async function updateSources(){
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${APIKEY}`);
    const data = await res.json()


    source.innerHTML = data.sources
                            .map(src => `<option value="${src.id}">${src.name}</option>`)
                            .join('\n')
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${APIKEY}`);
    const data = await res.json()


    main.innerHTML = data.articles.map(createArticle).join('\n')
}


function createArticle(article){
    return `
        <div class='article'>
            <a href="${article.url}">
                <h1>${article.title}</h1>
                <img src='${article.urlToImage}' >
                <p>${article.description}</p>
            </a>
        </div>
    `;
}
