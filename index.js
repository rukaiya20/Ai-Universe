const fetchAllInformation = () =>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => console.log(data))

};

const fetchSingleInformation = () =>{
    fetch("https://openapi.programming-hero.com/api/ai/tool/01")
    .then((res) => res.json())
    .then((data) => console.log(data))

};
fetchSingleInformation();



