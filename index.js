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
      card.classList.add('card', 'w-full', 'bg-base-100', 'shadow-sm', 'border','border-gray-200');
      card.innerHTML = `
      <figure class="p-3 ">
          <img src="${singleInfo.image}"
          alt="image"
          class="rounded-xl" style="height:230px" />
      </figure>
      <div class="card-body px-3">
          <h2 class="card-title font-bold">
          Features</h2>
          <ol class="text-gray-600" id="${singleInfo.id}">
          </ol>
          <hr class="border-1">
          <div
              class="card-actions flex items-center justify-between">
              <div>
                  <h2
                      class="text-1xl font-bold mb-2">${singleInfo.name}</h2>
                  <p class="text-neutral-500"><i class="fa-solid fa-calendar-days "></i>
                      ${singleInfo.published_in}</p>
              </div>
              <div>
              <label for="modalBody" onclick="loadDetailsInfo(${singleInfo.id})">
              <i class="fa-solid fa-arrow-right text-red-500 cursor-pointer mt-9"></i></label> 
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
const showSpinner = (isLoading) => {
  const spinner = document.getElementById('spinner')
  if (isLoading) {
      spinner.classList.remove('hidden')
  }
  else {
      spinner.classList.add('hidden')
  }
}

fetchAllInformation(6)

// show all data
const showAllData = () => {
  fetchAllInformation()
}

//load item details data
const loadDetailsInfo = async (itemId) => {
  let id = 0;
  if (itemId < 10) {
      id = `0${itemId}`
  }
  else {
      id = itemId
  }
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  const res = await fetch(url);
  const data = await res.json();
  cardDetails(data.data)
}



  //accuracy
  const accuracy = document.getElementById('accuracy')
  if (data.accuracy.score === null) {
      accuracy.innerHTML = ''
  }
  else {
      accuracy.innerHTML = `
      <p class="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"><span>
      ${data.accuracy.score * 100}</span> % accuracy</p>
      `
  }
  //features part
  const featuresInfo = document.getElementById('features-infoContainer');
  if (data.features == {}) {
      const p = document.createElement('p');
      p.innerText = 'No data Found';
      featuresInfo.appendChild(p)
  }
  else {
      for (const item in data.features) {
          const li = document.createElement('li')
          li.innerText = data.features[`${item}`].feature_name;
          featuresInfo.appendChild(li)
      }
  }
  //Integrations
  const integrationInfo = document.getElementById('integration-infoContainer')
  if (data.integrations === [] || data.integrations === null) {
      const p = document.createElement('p');
      p.innerText = 'No data Found';
      integrationInfo.appendChild(p)
  }
  else {
      data.integrations.forEach(integrations => {
          const li = document.createElement('li');
          li.innerText = integrations;
          integrationInfo.appendChild(li)
      })
  }
};

//sort by data section

const sortByData = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
  const data = await res.json();
  sortData(data.data.tools)
}
const sortData = (data) => {
  const newArr = data.sort(function (a, b) {
      return new Date(a.published_in) - new Date(b.published_in);
  });
  showInformation(newArr)
}