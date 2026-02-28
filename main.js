let newsList=[]
const menus=document.querySelectorAll(".menus button, #menu-list button")

menus.forEach((menu)=>
    menu.addEventListener("click",(event)=>{
        closeNav();
        getNewsByCategory(event);
    })
)
let url=new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us`)

let totalResults=0
let page = 1
const pageSize=10
const groupSize=5

//totalresult
//page
//pagesize
//groupsize
//pagegroup
//lastpage
//firstpage

const getNews=async()=>{
    try {
        url.searchParams.set("page", page);
        url.searchParams.set("pageSize", pageSize);

        const response=await fetch(url)

        const data = await response.json();
        if (response.status===200){
            if (data.articles.length===0){
                throw new Error("검색 결과 없음")
            }
            newsList=data.articles;
            totalResults=data.totalResults;
            render()
            paginationRender()
        }
        
    }catch(error){
        // console.log("error:", error)
        errorRender(error.message);
    }
}

const getLatestNews=async()=>{
    url= new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us`
    );
    getNews()
};

getLatestNews()

const getNewsByCategory=async(event)=>{
    const category=event.target.textContent.toLowerCase();
    console.log("category", category);
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}`
    );
    getNews()
}

const getNewsByKeyword=async(event)=>{
    const keyword=document.getElementById("search-input").value
    console.log("keyword", keyword)
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyword}`
    );
    getNews()
}

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
            }"/>`;

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

const errorRender=(errorMessage)=>{
    const errorHTML =`<div class="alert alert-success" role="alert">
        ${errorMessage}
    </div>`
    document.getElementById("news-board").innerHTML=errorHTML;

}

const paginationRender=()=>{
    //totalresult
    //page
    //pagesize
    //groupsize
    //totalpages
    const totalPages = Math.ceil(totalResults/pageSize)
    //pagegroup
    const pageGroup= Math.ceil(page/groupSize)
    const lastPage= Math.min(pageGroup*groupSize, totalPages)
    const firstPage=lastPage-(groupSize-1)<=0?1:lastPage-(groupSize-1);

    let paginationHTML=``

    // << 첫 페이지로
    paginationHTML+=`<li class="page-item ${page===1?'disabled':''}" onclick="moveToPage(1)"><a class="page-link">&laquo;</a></li>`

    // < 이전 페이지로
    paginationHTML+=`<li class="page-item ${page===1?'disabled':''}" onclick="moveToPage(${page-1})"><a class="page-link">&lsaquo;</a></li>`

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`<li class="page-item ${i===page?"active":''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }

    // > 다음 페이지로
    paginationHTML+=`<li class="page-item ${page===totalPages?'disabled':''}" onclick="moveToPage(${page+1})"><a class="page-link">&rsaquo;</a></li>`

    // >> 마지막 페이지로
    paginationHTML+=`<li class="page-item ${page===totalPages?'disabled':''}" onclick="moveToPage(${totalPages})"><a class="page-link">&raquo;</a></li>`

    document.querySelector(".pagination").innerHTML=paginationHTML

    // <nav aria-label="Page navigation example">
    // <ul class="pagination">
    //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //     <li class="page-item"><a class="page-link" href="#">1</a></li>
    //     <li class="page-item"><a class="page-link" href="#">2</a></li>
    //     <li class="page-item"><a class="page-link" href="s#">3</a></li>
    //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
    // </ul>
    // </nav>


}

const moveToPage=(pageNum)=>{
    console.log(pageNum)
    page=pageNum
    getNews()

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


// 1. 버튼들에 클릭 이벤트 주기
// 2. 카테고리별 뉴스 가져오기
// 3. 그 뉴스 보여주기