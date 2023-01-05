var payload1 = localStorage.getItem("payload")
var parsed_payload = JSON.parse(payload1)

access_token = localStorage.getItem("access")
var loginText = document.getElementById("loginout")

if(access_token) {
    const username = document.getElementById("user")
    username.innerText = `${parsed_payload["email"]}님 반갑습니다`
    loginText.innerText = "로그아웃"
} else {
    alert("로그인후 index.html에 접속할수있습니다.")
    location.replace("../login.html");
    
}


async function logoutUser() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    localStorage.removeItem("kakao")

    window.location.replace(`../login.html`);
}
// 페이지네이션  함수
var now = 1
var prev = 1
var firstPage = 1
var nextPage = firstPage + 6
var maxnum = 23
var minnum = 1
const backButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
backButton.style.display = "none";

function loadpagenation() {

    for (i=1;i<8;i++){
        const pagenate = document.getElementById(i);
        if (maxnum==1) {
            pagenate.style.display="none"
            next.style.display = "none"
        }
        else if ((i) > maxnum) {
            pagenate.style.display="none"
        }
    }
}


if (now == minnum) {
    backButton.style.display = "none";
} else {
    backButton.style.display = "inline";
}

$(".pagenation a").click(function (e) {
    e.preventDefault();
    var $item = $(this);
    var $id = $item.attr("id");
    var selectedPage = $item.text();
    selectedPage = parseInt(selectedPage)
    if ($id == "next") selectedPage = now + 1;
    if ($id == "prev") selectedPage = now - 1;
    if ($id == "allprev") selectedPage = 1;
    if ($id == "allnext") selectedPage = totalPage;
    console.log(selectedPage)
    if (selectedPage < firstPage){
        // $("#pagenumber").empty();
        for (i=0;i<7;i++){
            id = firstPage+i
            const pagenate = document.getElementById(id);
            pagenate.innerText = nextPage + i + 1 -14
            pagenate.id = nextPage + i + 1 -14
            pagenate.style.display="inline"
        }
        firstPage -= 7
        nextPage = firstPage + 6

        prev = firstPage
        now = selectedPage

        const nowbutton = document.getElementById(now)
        const prevbutton = document.getElementById(prev)

        prevbutton.className = ""
        nowbutton.className = "active"

    } else if (selectedPage>nextPage){
        for (i=0;i<7;i++){
            id = firstPage+i
            const pagenate = document.getElementById(id);
            pagenate.innerText = nextPage + i + 1
            pagenate.id = nextPage + i + 1
            if ((nextPage + i + 1) > maxnum) {
                pagenate.style.display="none"
            }
        }
        firstPage += 7
        nextPage = firstPage + 6

        prev = firstPage+6
        now = selectedPage

        const nowbutton = document.getElementById(now)
        const prevbutton = document.getElementById(prev)

        prevbutton.className = ""
        nowbutton.className = "active"

    } else {
        prev = now
        now = selectedPage

        const nowbutton = document.getElementById(now)
        const prevbutton = document.getElementById(prev)

        prevbutton.className = ""
        nowbutton.className = "active"
    }

    //now 가 1 일떄 비활성화
    if (now == minnum) {
        backButton.style.display = "none";
    } else {
        backButton.style.display = "inline";
    }
    if (now == maxnum){
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "inline";
    }
    account_book(now)
});

window.addEventListener('load', function() {
    account_book(1)  
});
async function account_book(page){
    const response= await fetch(`${BACK_END_URL}/account_book/accout_book_view/?page=${page}`,{
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        var account_books = document.getElementById("account_books");
        maxnum = data["page"].total_page
        loadpagenation()
        $("#account_books").empty();
        console.log(data)
        for (i = 0; i < data["data"].length; i++) {
            const account_book = document.createElement('div')
            account_book.innerHTML = `
                                        <table border="1">
                                        <th>작성 번호</th>
                                        <th>작성 날짜</th>
                                        <th>작성자</th>
                                        <tr>
                                            <td>${data["data"][i]["id"]}</td>
                                            <td><a href="account_book.html?account_book_id=${data["data"][i]["id"]}/">${data["data"][i]["created_at"]}<a></a></td>
                                            <td>${data["data"][i]["user"]["email"]}</td>
                                        </tr>
                                        </table>`
            account_books.appendChild(account_book)
            total_page = data["page"]["total_page"]
        }
        })
}
