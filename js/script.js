// for snow newyear
const snow = document.querySelector(".snow")
const container = document.querySelector(".container")
console.log(snow);

function appendSnow (){
    let newSnow = snow.cloneNode(true)

    newSnow.style.paddingLeft = Math.random() * 10 + 'px';
    newSnow.style.animationDuration = Math.random() * 8 + 3 + 's';
    newSnow.style.opacity = Math.random() * 1 ;

    container.append(newSnow)
}

const interval = setInterval (appendSnow , 80 );

setTimeout(() => {
    clearInterval (interval);
}, 1200);


// for users
let users = document.getElementById('users')
let template = document.getElementById('template')
let fragment = document.createDocumentFragment()

async function getData() {
    let fetchData = await fetch(`https://jsonplaceholder.typicode.com/users`)
    let resultData = await fetchData.json()
    result.textContent = resultData.length

    resultData.forEach(data => {

        let userTemplate = template.content.cloneNode(true)

        userTemplate.querySelector('.user').dataset.id = data.id
        userTemplate.querySelector('.user__name').textContent = data.name
        userTemplate.querySelector('.user__email').textContent = data.email
        userTemplate.querySelector('.user__country').textContent = data.address.city
        userTemplate.querySelector('.user__company').textContent = data.company.name
        userTemplate.querySelector('.user__website').textContent = data.website

        userTemplate.querySelector(".user").addEventListener("click", (e) => {
            getPosts(e.currentTarget.dataset.id)
        })

        fragment.append(userTemplate)

    });

    users.append(fragment)

}

getData()

// for post 
let post = document.getElementById('post')
let postTemplate = document.getElementById('template__post')
let postFragment = document.createDocumentFragment()

const getPosts = async (id) => {
    const postFetch = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    const data = await postFetch.json()
    post2.textContent = data.length

    post.innerHTML = null
    data.forEach(item => {
        let postData = postTemplate.content.cloneNode(true)
        postData.querySelector(".post__id").dataset.id = item.id
        postData.querySelector(".post__userid").textContent = item.userId
        postData.querySelector(".post__title").textContent = item.title
        postData.querySelector(".post__body").textContent = item.body
        postData.querySelector(".post__body").onClick = item.body
        post.onclick = () => {
            commentPost(document.querySelector('.post__userid').textContent)
        }

        postFragment.append(postData)

    })

    post.append(postFragment)

}

// for commit
let comment = document.getElementById('comment')
let commentTemplate = document.getElementById('template__commit')
let commitFragment = document.createDocumentFragment()

const commentPost = async (id) => {
    const commitFetch = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    const commitData = await commitFetch.json()
    comment.innerHTML = null
    commentResult.textContent = commitData.length

    commitData.forEach(element => {
        let renderData = commentTemplate.content.cloneNode(true)

        renderData.querySelector('.commit__id').textContent = element.id
        renderData.querySelector('.commit__name').textContent = element.name
        renderData.querySelector('.commit__email').textContent = element.email
        renderData.querySelector('.commit__body').textContent = element.body

        commitFragment.append(renderData)

    })

    comment.append(commitFragment)

}







