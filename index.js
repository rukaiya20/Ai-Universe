const fetchAllInformation = () =>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showInformation(data.data.tools))
};

// const fetchSingleInformation = () =>{
//     fetch("https://openapi.programming-hero.com/api/ai/tool/01")
//     .then((res) => res.json())
//     .then((data) => showInformation(data.data))
    
// };
// fetchSingleInformation();

const showInformation = data => {
      const infoContainer = document.getElementById("info-container");
      data.forEach(singleInfo => {
        const card = document.createElement('div');
        card.classList.add('card','col-lg-4','border-0','mb-4');
        card.innerHTML = ` <div class="border rounded-3">
        <img src="${singleInfo.image}" class="card-img-top p-3 " alt="...">
        <div class="card-body">
          <h5 class="card-title fw-bold fs-4">Features</h5>
          <p class="card-text fw-bolder text-secondary fs-6 mb-1">1. ${singleInfo.features[0]}</p>
          <p class="card-text fw-bolder text-secondary fs-6 mb-1">2. ${singleInfo.features[1]}</p>
          <p class="card-text fw-bolder text-secondary fs-6 mb-3 border-bottom pb-4 ">3. ${singleInfo.features[2]}</p>
          <h5 class="card-title fw-bold fs-4 my-2">${singleInfo.name}</h5>
          <div class="d-flex justify-content-between">
           <p class="fw-bolder text-secondary fs-6 my-3">${singleInfo.published_in}
           </p>
          <a href="#" class="mt-3 text-danger"><i class="fa-solid fa-arrow-right" onclick="fetchShowDetail('${singleInfo.id}')"></i></a>
          </div>
        </div>
      </div>`;
      infoContainer.appendChild(card)
      }

      )

}
const fetchShowDetail = info_id =>{
  let url =`https://openapi.programming-hero.com/api/ai/tool/${info_id}`
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data.data))
}


