document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Mock API endpoint (replace this with your actual backend API endpoint)
    const apiEndpoint = "http://localhost:9999/users/login";

    // Mock API call (replace this with an actual fetch request to your backend)
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'x-api-key': 'VGh1IE9jdCAxMiAxOToxMzoyOCBXSUIgMjAyMwo='
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Mock redirection to order page and set user cookie (replace this with your actual redirection and cookie logic)
        if (data.status === "Success") {
            setCookie("userid", data.data.id, 1); // Set cookie for 30 days
            window.location.href = "/cafe";
        } else {
            // Display error message for unsuccessful login
            document.getElementById("error-message").textContent = "Password atau email salah. Mohon mencoba lagi.";
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// Function to set cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get cookie by name
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}
