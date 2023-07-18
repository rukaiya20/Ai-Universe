const fetchAllInformation = async (dataLimit) => {
  showSpinner(true)
  const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
  const data = await res.json();
  showInformation(data.data.tools, dataLimit);
}
const showInformation = (data, dataLimit) => {
  //show all item
  const showAll = document.getElementById('showAll')
  if (dataLimit && data.length > 10) {
      data = data.slice(0, 6);
      showAll.classList.remove('hidden')
  }
  else {
      showAll.classList.add('hidden')
  }
  const infoContainer = document.getElementById('infoContainer');
  infoContainer.innerHTML = '';
  data.forEach(singleInfo => {
      // console.log(singleInfo)
      const card = document.createElement('div');
      card.classList.add('card', 'w-full', 'bg-base-100', 'shadow-sm', 'border');
      card.innerHTML = `
      <figure class="p-3 ">
          <img src="${singleInfo.image}"
          alt="Shoes"
          class="rounded-xl" style="height:230px" />
      </figure>
      <div class="card-body px-3">
          <h2 class="card-title font-bold">
          Features</h2>
          <ol id="${singleInfo.id}">
          </ol>
          <hr class="border-1">
          <div
              class="card-actions flex items-center justify-between">
              <div>
                  <h2
                      class="text-1xl font-bold mb-2">${singleInfo.name}</h2>
                  <p><i
                          class="fa-solid fa-calendar-days "></i>
                      ${singleInfo.published_in}</p>
              </div>
              <div>
              <label for="modalBody" onclick="loadDetailsInfo(${singleInfo.id})"><i
              class="fa-solid fa-arrow-right text-red-500 cursor-pointer"></i></label> 
              </div>
          </div>
      </div>
      `;
      infoContainer.appendChild(card);
      // //features item
      const featuresInfo = document.getElementById(singleInfo.id);
      let num = 0;
      singleInfo.features.forEach(featuresItem => {
          const li = document.createElement('li');
          li.innerText = `${num += 1} ${'.'} ${featuresItem}`
          featuresInfo.appendChild(li)
      })
  });
  showSpinner(false)
}

//spinner part


fetchAllInformation(6)

// show all data
const showAllData = () => {
  fetchAllInformation()
}

//load item details data
