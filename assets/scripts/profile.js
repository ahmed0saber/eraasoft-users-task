const getUrlParam = (param) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const desiredParam = urlParams.get(param)

    return desiredParam
}

const getCurrentUser = async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`)
    const currentUser = await response.json()

    return currentUser.data
}

const displayUserDetails = (user = {}) => {
    const loadingSpinnerWrapper = document.querySelector(".loading-spinner-wrapper")
    if (Object.keys(user).length === 0) {
        document.querySelector(".not-found").classList.remove("d-none")
        loadingSpinnerWrapper.classList.add("d-none")
        return
    }

    document.querySelector(".user-picture").src = user.avatar
    document.querySelector(".user-name").textContent = user.first_name + " " + user.last_name
    document.querySelector(".user-email").textContent = user.email
    document.querySelector(".user-details-wrapper").classList.remove("d-none")
    loadingSpinnerWrapper.classList.add("d-none")
}

const initApp = async () => {
    const userId = getUrlParam("id")
    const currentUser = await getCurrentUser(userId)
    displayUserDetails(currentUser)
}
initApp()
