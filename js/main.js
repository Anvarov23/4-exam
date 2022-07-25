const elList = document.querySelector(".js-users");
const elTemplate = document.querySelector(".user__template").content;
const elPostList = document.querySelector(".js-posts");
const elPostTemplate = document.querySelector(".posts__template").content;
const elCommentsList = document.querySelector(".js-comments");
const elCommentsTemplate = document.querySelector(" .comments__template").content;
const elItem = document.querySelector(".user__item");
const elUserId = [];
const elPostId = [];


const userFragment = document.createDocumentFragment();
const renderUsers = (array, node) => {
  elList.innerHTML = "";
  array?.forEach((el) => {
    elUserId.push(el.id)
    const newTemplate = elTemplate.cloneNode(true);
    newTemplate.querySelector(".item__name").textContent = el.name;
    newTemplate.querySelector(".item__id").textContent = el.id;
    newTemplate.querySelector(".user__item").dataset.id = el.id;
    newTemplate.querySelector(".item__email").href = `mailto:${el.email}`;
    newTemplate.querySelector(".item__email").textContent = el.email;
    newTemplate.querySelector(".item__username").textContent = el.username;
    newTemplate.querySelector(".item__street").textContent = el.address.street;
    newTemplate.querySelector(".item__city").textContent = el.address.city;
    newTemplate.querySelector(".item__suite").textContent = el.address.suite;
    newTemplate.querySelector(".item__zipcode").textContent = el.address.zipcode;
    newTemplate.querySelector(".item__website").href = `https:${el.website}`;
    newTemplate.querySelector(".item__website").textContent = "Website ";
    newTemplate.querySelector(".item__phone").href = `tel:${el.phone}`;
    newTemplate.querySelector(".item__phone").textContent = el.phone;
    newTemplate.querySelector(".item__company-name").textContent = el.company.name;
    newTemplate.querySelector(".item__catch-phrase").textContent = el.company.catchPhrase;
    newTemplate.querySelector(".item__comment").textContent = el.company.bs;
    let location_url = `https://www.google.com/maps/place/${el.address.geo.lat} + ${el.address.geo.lng}`;
    newTemplate.querySelector(".item__location").href = location_url;
    newTemplate.querySelector(".item__location").textContent = "Location";
    userFragment.appendChild(newTemplate);
  });
  node.appendChild(userFragment);
};

async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  renderUsers(data, elList);
}

getUser();


const PostFragment = document.createDocumentFragment();
const renderPosts = (array, node) => {
  node.innerHtml = "";
  array?.forEach((elPost) => {
    elPostId.push(elPost.id)
    const newPostTemplate = elPostTemplate.cloneNode(true);
    newPostTemplate.querySelector(".post__title").textContent = elPost.title;
    newPostTemplate.querySelector(".posts").dataset.id = elPost.id;
    newPostTemplate.querySelector(".post__text").textContent = elPost.body;
    PostFragment.appendChild(newPostTemplate);
  });
  node.appendChild(PostFragment);
};

async function getPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const dataPost = await response.json();
  renderPosts(dataPost, elPostList);
}

const CommentsFragment = document.createDocumentFragment();
const renderComments = (array, node) => {
  array?.forEach((elComments) => {
    const newCommentsTemplate = elCommentsTemplate.cloneNode(true);
    newCommentsTemplate.querySelector(".comments__title").textContent = elComments.name;
    newCommentsTemplate.querySelector(".comments__email").textContent = elComments.email;
    newCommentsTemplate.querySelector(".comments__email").href = `mailto:${elComments.email}`;
    newCommentsTemplate.querySelector(".comments__text").textContent = elComments.body;
    CommentsFragment.appendChild(newCommentsTemplate);
  });
  node.appendChild(CommentsFragment);
};

async function getComment() {
  const response = await fetch("https://jsonplaceholder.typicode.com/Comments");
  const dataComments = await response.json();
  renderComments(dataComments, elCommentsList);
}

elList.addEventListener("click", (evt) => {
  elCommentsList.innerHtml = "";
  if(evt.target.matches(".user__item")){
    const UserIdMain = evt.target.dataset.id - 0;
    elUserId.forEach(userId => {
      if(UserIdMain === userId){
        getPost(userId)
      }
    })
  }
});

elPostList.addEventListener("click", (evt) => {
  elCommentsList.innerHtml = "";
  if(evt.target.matches(".posts")){
    const PostIdMain = evt.target.dataset.id - 0;
    elUserId.forEach(postId => {
      if(PostIdMain === postId){
        getComment(postId)
      }
    })
  }
});