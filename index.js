const fetchAllInformation = async (dataLimit) => {
  showSpinner(true)
  const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
  const data = await res.json();
  showInformation(data.data.tools, dataLimit);
}

const showInformation = (data, dataLimit) => {
  //show all singleInfo
  const showAll = document.getElementById('show-all')
  if (dataLimit && data.length > 10) {
      data = data.slice(0, 6);
      showAll.classList.remove('hidden')
  }
  else {
      showAll.classList.add('hidden')
  }
  const infoContainer = document.getElementById('info-container');
  infoContainer.innerHTML = '';
  data.forEach(singleInfo => {
      // console.log(singleInfo)
      const div = document.createElement('div');
      div.classList.add('card', 'w-full', 'bg-base-100', 'shadow-sm', 'border');
      div.innerHTML = `
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
              class="card-actions flex singleInfos-center justify-between">
              <div>
                  <h2
                      class="text-1xl font-bold mb-2">${singleInfo.name}</h2>
                  <p><i
                          class="fa-solid fa-calendar-days "></i>
                      ${singleInfo.published_in}</p>
              </div>
              <div>
              <label for="my-modal-3" onclick="loadDetailsData(${singleInfo.id})">
              <i class="fa-solid fa-arrow-right"></i>
              </label> 
              </div>
          </div>
      </div>
      `;
      container.appendChild(div);
      // //features singleInfo
      const featuresContainer = document.getElementById(singleInfo.id);
      let num = 0;
      singleInfo.features.forEach(featuresInfo => {
          const li = document.createElement('li');
          li.innerText = `${num += 1} ${'.'} $featuresInfo}`
          featuresContainer.appendChild(li)
      })
  });
  showSpinner(false)
}

