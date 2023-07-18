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
          
          <div
              class="card-actions flex items-center justify-between border-b-2 pb-8">
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

const cardDetails = (data) => {
  const modalInformation = document.getElementById('modal-card');
  modalInformation.innerHTML = `
<div>
  <div
      class="card w-full bg-red-50 shadow-sm border border-red-400">
      <div
          class="card-body p-3">
          <h2 class="card-title">
              ${data.description}
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
              <div>
                  <p class=" font-semibold text-green-500 text-center">
                   ${data.pricing === null || data.pricing[0].price === '0' ? 'Free of Cost/' : data.pricing[0].price} 
                   ${data.pricing === null ? 'Basic' : data.pricing[0].plan}</p>
              </div>
              <div>
                  <p class=" font-semibold text-amber-500 text-center">
                  ${data.pricing === null || data.pricing[1].price === '0' ? 'free of cost/' : data.pricing[1].price}
                  ${data.pricing === null ? 'Pro' : data.pricing[1].plan}</p>
              </div>
              <div>
                  <p class=" font-semibold text-red-500 text-center">
                  ${data.pricing === null || data.pricing[2].price === '0' ? 'free of cost/' : data.pricing[2].price} 
                  ${data.pricing === null ? 'Enterprise' : data.pricing[2].plan}</p>
              </div>
          </div> 
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-3">
              <div>
                <h2 class="text-2xl font-semibold">Features</h2>
                <ul id="features-infoContainer" class="list-disc pl-4"></ul>
              </div>   
              <div>
                 <h2 class="text-2xl font-semibold">Integrations</h2>
                 <ul id="integration-infoContainer" class="list-disc pl-4"></ul>
              </div> 
          </div>  
      </div>
  </div>
</div>
<div>
  <div
      class="card w-full bg-base-100 shadow-sm border">
     <div class="relative">
          <figure class="p-4"><img class="rounded-xl"
          src="${data.image_link[0]}"
          alt="Shoes" style="height:270px" />
          </figure>
          <div id="accuracy" class="absolute top-6 right-6" >
          </div>
     </div>
      <div
          class="card-body p-0 p-4 text-center">
          <h2
              class="text-2xl font-semibold text-center">
              ${data.input_output_examples === null ? 'Can you give any example?' : data.input_output_examples[0].input}
          </h2>
          <p>
          ${data.input_output_examples === null ? 'No! Not Yet! Take a break!!!' : data.input_output_examples[0].output}
          </p>
      </div>
  </div>
</div>
`;

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