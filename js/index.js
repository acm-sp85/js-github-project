let array = []
let arrayResults = []
let arrayRepos = []


document.addEventListener('DOMContentLoaded', () => {



    const searchBar = document.getElementById('github-form')

    searchBar.addEventListener('submit', (event) => {
        event.preventDefault()
        const searchItem = document.getElementById('search')

        array = [searchItem.value]
        // console.log(array)



        fetch(`https://api.github.com/search/users?q=${array}`)
            .then(result => result.json())
            .then(data => {
                // console.log(data)
                const items = data.items
                items.forEach(element => {
                    arrayResults.push(element)
                    const ul = document.getElementById('user-list')
                    const li = document.createElement('li')
                    const avatar = document.createElement('img')

                    li.innerText = element.login
                    // li.href = element.repos_url
                    avatar.src = element.avatar_url
                    avatar.className = "avatar"
                    ul.append(li)
                    ul.append(avatar)

                    avatar.addEventListener('click', ()=>{
                        fetch(`https://api.github.com/users/${element.login}/repos`)
                        .then(result => result.json())
                        .then(userData => {
                            arrayRepos = []
                            userData.forEach(e => {
                                arrayRepos.push(e.name)
                                const ulRepos = document.getElementById('repos-list')
                                ulRepos.innerHTML = 'REPOS LIST'

                                arrayRepos.forEach(element => {
                                    const li = document.createElement('li')

                                    li.innerText = element
                                    ulRepos.append(li)
                                    
                                });

                            });
                            console.log(arrayRepos)
                        })
                    })





                });
            })
        // console.log(arrayResults)

        // arrayResults.forEach(element => {

        // });


    })



})