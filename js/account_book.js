let urlParameter = window.location.search;
var account_book_id = urlParameter.split('=')[1]
var account_book_id1 = account_book_id.split('/')[0]

window.onload = async function base() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    if (!parsed_payload) {
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../index.html")
    }


    const account_book = await fetch(`${BACK_END_URL}/account_book/view/?account_book_id=${account_book_id1} `, {
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
        $("#account_books").empty();
            const account_book = document.createElement('div')
            account_book.innerHTML = `
                                            작성 날짜 :<td>${data["data"]["created_at"]}
                                            <p></p>
                                            메모 :<td>${data["data"]["memo"]}</td>
                                            <p></p>
                                            사용한 금액 :<td>${data["data"]["price"].toLocaleString('ko-KR')}원</td>
                                            <p></p>
                                            작성자 <div id="email">${data["data"]["user"]["email"]}</div>
                                            `
            account_books.appendChild(account_book)
        })
        
}

async function edit() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    const email = document.getElementById("email").innerText;
    const price = document.getElementById("price1").value;
    const memo = document.getElementById("memo1").value;
    console.log(email)
    console.log(typeof(price))
    if (price == "" || memo== ""){
        alert("금액,메모는 공백으로 수정 할 수 없습니다.")
        location.reload();   
    }else if(email != parsed_payload["email"]){
        alert("작성자만 수정 할 수 있습니다")
        location.reload();   
    }else{
    
        let formData = new FormData();
        formData.append("price", price);
        formData.append("memo", memo);
        
        const account_book_edit = await fetch(`${BACK_END_URL}/account_book/view/?account_book_id=${account_book_id1} `, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: formData,
    })
    
    
        account_book_edit_json = await account_book_edit.json()
        alert(account_book_edit_json.message)
        location.reload();
}
}

async function remove() {
    var result =confirm("가계부를 삭제 하시겠습니까?");
    if(result){
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    const email = document.getElementById("email").innerText;

    if(email != parsed_payload["email"]){
        alert("작성자만 삭제 할 수 있습니다")
        location.reload();   
    }else{
    const account_book_edit = await fetch(`${BACK_END_URL}/account_book/view/?account_book_id=${account_book_id1} `, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE',
})
        alert("삭제되었습니다")
        location.replace("../index.html")
}
}
}