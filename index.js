const form = document.querySelector('#form')
const searchBtn = document.querySelector('.search-btn')
const resultCont = document.querySelector('.result')
let searchInput = form.elements.search

searchBtn.addEventListener('click', searchRepository)

function searchRepository(e) {
    e.preventDefault()

    let repositoryName = searchInput.value

    let url = `https://api.github.com/search/repositories?q=${repositoryName}`
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let allResults = result.items

            console.log(allResults);

            if(allResults.length){
                resultCont.innerHTML = ''

                for (let i = 0; i < 10; i++) {
                    resultCont.innerHTML += `<div class="repository">
                                                <div id="avatar" class="avatar">
                                                    <img class='repos-avatar' src='${allResults[i].owner.avatar_url}'/>
                                                </div>
                                                <div id="info" class="info">
                                                    <p>Login: ${allResults[i].owner.login}</p>
                                                    <a target='_blank' href='${allResults[i].svn_url}'>${allResults[i].svn_url}</a>
                                                </div>
                                            </div>
                                            <hr/>`
                }
            } else {
                resultCont.innerHTML = ''
                resultCont.innerHTML = `<p class='error-message'>Ничего не найдено</p>`
            }

        })
        .catch(err => {
            if(!searchInput.value){
                resultCont.innerHTML = ''
                resultCont.innerHTML = `<p class='error-message'>Нельзя оставить пустым строку поиска</p>`
            } else {
                resultCont.innerHTML = ''
                resultCont.innerHTML = `<p class='error-message'>${err.message}</p>`
            }
        })
}