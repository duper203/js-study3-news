const API_KEY = "3d39a63aab7a449389159ce1efc1a684"
let news=[]
const getLatestNews=async()=>{
    const url= new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    console.log("uuu", url);
    const response= await fetch(url);
    const data = await response.json();
    news=data.articles;
    console.log("iii", data);
};


getLatestNews();


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