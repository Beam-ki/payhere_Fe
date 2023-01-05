var payload1 = localStorage.getItem("payload")
var parsed_payload = JSON.parse(payload1)

window.onload = async function base() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    if (!parsed_payload) {
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../index.html")
    }
}
access_token = localStorage.getItem("access")
async function submit(){
    const price=document.getElementById("price");
    const memo=document.getElementById("memo");

    let formdata = new FormData 
    formdata.append('price', price.value)
    formdata.append('memo', memo.value)
    const response= await fetch(`${BACK_END_URL}/account_book/create/`,{
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: formdata
    })
            response_json=await response.json()
            if (response.status == 200 || response.status == 202 || response.status == 201) {
                window.location.replace(`../index.html`);
            }
            else if (response.status == 400) {
                alert("오류가 발생했습니다..")
                location.reload();    
            }
            }