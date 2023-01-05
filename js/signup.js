async function signup(){
    const password = document.getElementById("signup_password").value;
    const email = document.getElementById("signup_email").value;
    const response = await fetch(`${BACK_END_URL}/user/signup/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    const response_json = await response.json()
    
        if (response.status == 201) {
            alert(response_json["message"])
            window.location.replace(`${FRONT_END_URL}/login.html`);
        }
        else
        alert("이미 존재하는 이메일 주소이거나 형식이 맞지 않습니다.")
        
}