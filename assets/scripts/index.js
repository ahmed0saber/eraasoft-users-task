const displayUsers = (users) => {
    const usersContainer = document.querySelector(".users-container")
    const usersHtmlContent = users.map(user => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div class="card h-100">
                <img class="card-img-top aspect-ratio-1 object-fit-cover" src="${user.avatar}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${user.first_name + " " + user.last_name}</h5>
                    <p class="card-text">${user.email}</p>
                    <a href="./profile/?id=${user.id}" class="btn btn-primary">Read more</a>
                </div>
            </div>
        </div>
    `)
    usersContainer.innerHTML = usersHtmlContent.join("")

    // const usersContainer = document.querySelector(".users-container")
    // usersContainer.innerHTML = ""
    // users.forEach(user => {
    //     usersContainer.innerHTML += `
    //         <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
    //             <div class="card">
    //                 <img class="card-img-top" src="${user.avatar}" alt="Card image cap">
    //                 <div class="card-body">
    //                     <h5 class="card-title">${user.first_name + " " + user.last_name}</h5>
    //                     <p class="card-text">${user.email}</p>
    //                     <a href="#" class="btn btn-primary">Read more</a>
    //                 </div>
    //             </div>
    //         </div>
    //     `
    // })
}

const getUsersFromAPI = async (page) => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`)
    const users = await response.json()

    return users.data
}

const generateUsers = async (desiredPage = 1) => {
    const users = await getUsersFromAPI(desiredPage)
    displayUsers(users)
}

const initApp = async () => {
    const paginationLinks = document.querySelectorAll(".pagination .page-link")

    paginationLinks.forEach(link => {
        link.addEventListener("click", async function() {
            const desiredPage = this.dataset.page
            generateUsers(desiredPage)
        })
    })

    generateUsers()
}
initApp()
