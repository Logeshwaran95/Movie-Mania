let reviewData = [];

const saveLocalstorage = () => {
    localStorage.setItem("reviews",JSON.stringify({reviews:reviewData}))
}
const addReview = () => {
  const url = document.getElementById("moviePoster");
  const style = window.getComputedStyle(url, false);  
    const reviewDetails = {
        id: `${Date.now()}`,
        reviewerName: document.getElementById("personName").value,
        movieName: document.getElementById("movieName").value,
        poster:document.getElementById("moviePoster").value,
        trailer:document.getElementById("movieTrailer").value,
        genre: document.getElementById("genre").value,
        rating:document.getElementById("rating").value,
        review:document.getElementById("review").value
    };
    
    document.getElementById("reviewsRow").insertAdjacentHTML('beforeend', generateReviewPost(reviewDetails));
    reviewData.push(reviewDetails);
    console.log(reviewData);
    saveLocalstorage();

}

const generateReviewPost = ({id,reviewerName,movieName,poster,trailer,genre,rating,review}) => {
    return (`
    <div class="col-md-6 col-lg-4 pb-3 review-card" id=${id} key=${id}>
     <div class="card card-custom bg-white border-white border-0">
    <div class="card-custom-img" style="background-image: url(${poster});" name=${poster}></div>
    <div class="card-custom-avatar">
      <img class="img-fluid" src="./images/avatar.jpg" alt="Avatar" />
      <center> <h6 class="m-auto reviewer-name">${reviewerName}</h6></center>
    </div>
    <div class="card-body" style="overflow-y: auto">
      <h4 class="card-title moviename">${movieName}</h4>
      <h6 class="genre">${genre}</h6>
      <i class="fa fa-star" style="color:yellow;">&nbsp;&nbsp;<span style="color:black" class="rating">${rating}</span></i>
      <p class="card-text review">${review}</p>
    </div>
    <div class="card-footer" style="background: inherit; border-color: inherit;">
    <button type="button" class="btn btn-outline-info" name=${id} onclick="editReview(this)">
    <i class="fas fa-pencil-alt" name=${id} onclick="editReview(this)"></i>
</button>
      <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteReview(this)">
      <i class="far fa-trash-alt" name=${id} onclick="deleteReview(this)"></i>
  </button>
      <a href="${trailer}" class="btn btn-outline-primary">Watch Trailer</a>
    </div>
  </div>
  </div>`)
}

const reloadReviews = () => {
    const localCopy = JSON.parse(localStorage.getItem("reviews"));
    console.log(localCopy);
    if(localCopy){
        reviewData = localCopy["reviews"];
    }
    reviewData.map((data) => {
        document.getElementById("reviewsRow").insertAdjacentHTML('beforeend', generateReviewPost(data));
    })
}

const deleteReview = (e) => {
  const targetID = e.getAttribute("name");
  reviewData = reviewData.filter((cardData) => cardData.id!==targetID);
  console.log(reviewData)
  saveLocalstorage();
  window.location.reload();
}
const editReview = (e) => {
   e.parentNode.childNodes[1].innerHTML="Save";
  //  console.log(e.childNodes);
   e.parentNode.childNodes[1].setAttribute("onclick","saveEditReview(this)");
   //console.log(e.parentNode.parentNode.childNodes[5].childNodes);
   //movie name
   //console.log(e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML);
   e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true");
   //genre
   //console.log(e.parentNode.parentNode.childNodes[5].childNodes[3]);
   e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true");
   //review
   //console.log(e.parentNode.parentNode.childNodes[5].childNodes[7]);
   e.parentNode.parentNode.childNodes[5].childNodes[7].setAttribute("contenteditable","true");
  //rating
  // console.log(e.parentNode.parentNode.childNodes[5].parentNode.childNodes[5].childNodes[5].childNodes[1].innerHTML);
  e.parentNode.parentNode.childNodes[5].parentNode.childNodes[5].childNodes[5].childNodes[1].setAttribute("contenteditable","true");
   //trailer
  //  console.log(e.parentNode.parentNode.childNodes[7].childNodes[5].getAttribute("href"));
   //reveiwer name
   //console.log(e.parentNode.parentNode.childNodes[5].parentNode.childNodes[3].childNodes[3].childNodes[1].innerHTML);
  e.parentNode.parentNode.childNodes[5].parentNode.childNodes[3].childNodes[3].childNodes[1].setAttribute("contenteditable","true");
  //poster
  var posterurl = e.parentNode.parentNode.childNodes[5].parentNode.childNodes[1].style.backgroundImage.slice(4, -1).replace(/"/g, ""); 

  
}

const saveEditReview = (e) => {
  const targetID = e.getAttribute("name");
  console.log(targetID);
  const updatedReviewDetails = {
    id: targetID,
    reviewerName: e.parentNode.parentNode.childNodes[5].parentNode.childNodes[3].childNodes[3].childNodes[1].innerHTML,
    movieName: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
    poster:e.parentNode.parentNode.childNodes[5].parentNode.childNodes[1].style.backgroundImage.slice(4, -1).replace(/"/g, ""), 
    trailer:e.parentNode.parentNode.childNodes[7].childNodes[5].getAttribute("href"),
    genre: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
    rating:e.parentNode.parentNode.childNodes[5].parentNode.childNodes[5].childNodes[5].childNodes[1].innerHTML,
    review:e.parentNode.parentNode.childNodes[5].childNodes[7].innerHTML
  }
  console.log(updatedReviewDetails.trailer);
  // console.log(updatedReviewDetails.genre);
  // console.log(updatedReviewDetails.reviewerName);
  // console.log(updatedReviewDetails.movieName);
  // console.log(updatedReviewDetails.rating);
  // console.log(updatedReviewDetails.review);
  // console.log(updatedReviewDetails.poster);

  var len = reviewData.length;
   
    for(var i=0;i<len;i++){
        if(reviewData[i].id==targetID){
            var index=i;
        }
    }
   
    reviewData[index]=updatedReviewDetails;
    //console.log(globalTaskData[index]);
    saveLocalstorage();
    window.location.reload();   
}

const searchMovie = () => {
  var foundIndex;
  const movieNameSearched = document.getElementById("searchedMovie").value.toLowerCase();
  if(movieNameSearched==""){
    alert("Please enter a movie name before search");
  }
  else{
  for(var i=0;i<reviewData.length;i++){
    if(reviewData[i].movieName==movieNameSearched){
     foundIndex = i;   
     console.log(foundIndex);
     document.getElementById("reviewsRow").style.display="none";
     document.getElementById("result").style.display="block";
     const copySearch = reviewData[foundIndex];
     document.getElementById("search").insertAdjacentHTML('beforeend', generateReviewPost(copySearch));
     document.getElementById("clear-search").style.display="inline";
    }
} 
}
}
const searchRevert = () => {
  window.location.reload();
}