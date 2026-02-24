const API_KEY = "3d39a63aab7a449389159ce1efc1a684"
let newsList=[]
const getLatestNews=async()=>{
    const url= new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    console.log("uuu", url);
    const response= await fetch(url);
    const data = await response.json();
    newsList=data.articles;
    render()
    console.log("iii", newsList);
};


getLatestNews();

const render =()=>{
    const newHTML=newsList.map((news) => {

        // 1. Summary: null이면 '내용없음', 200자 초과면 잘라서 '...'
        const summary = news.description
            ? (news.description.length > 200
                ? news.description.slice(0, 200) + '...'
                : news.description)
            : '내용없음';

        // 2. 이미지: null이면 fallback 이미지 사용
        const imageHTML = `<img class="news-img"
            src="${
                news.urlToImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }" alt="news image" />`;

        return `<div class="row news">
                <div class="col-lg-4">
                    ${imageHTML}
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${summary}</p>
                    <div>${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}</div>
                </div>
            </div>`;
    }).join('')

    document.getElementById("news-board").innerHTML=newHTML;
}


const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
const closeNav = () => {
document.getElementById("mySidenav").style.width = "0";
};

let inputArea = document.getElementById("input-area");
const openSearchBox = () => {
    
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };