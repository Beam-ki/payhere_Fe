async function login() {
    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value

    const response = await fetch(`${BACK_END_URL}/user/login/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    if (response.status == 200) {

        const response_json = await response.json()
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${FRONT_END_URL}/index.html`);
    }
     else{
          alert("아이디와 비밀번호 다시 확인해주세요")
       }
    }