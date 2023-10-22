// Check if the user is authenticated
const userId = getCookie("userid");
if (!userId) {
    // Redirect to the login page if the user is not authenticated
    window.location.href = "/login";
}

// Fetch cafe data from the backend API
fetch("http://localhost:9999/cafe", {
        headers: {
            'x-api-key': 'API_KEY_NOT_SET'
        }
    })
    .then(response => response.json())
    .then(data => {
        const cafeList = document.getElementById("cafeList");
        data.data.forEach(cafe => {
            // Create cafe item element
            const cafeItem = document.createElement("div");
            cafeItem.className = "cafe-item";
            cafeItem.setAttribute("data-cafe-id", cafe.id);

            // Add cafe title and email
            const title = document.createElement("h2");
            title.textContent = cafe.title;
            cafeItem.appendChild(title);

            const email = document.createElement("p");
            email.textContent = cafe.email;
            cafeItem.appendChild(email);

            // Add default cafe image (replace 'cafe-placeholder.jpg' with your actual default image URL)
            const image = document.createElement("img");
            image.src = "default-cafe-image.jpg";
            image.alt = cafe.title;
            cafeItem.appendChild(image);

            // Make cafe items clickable
            cafeItem.addEventListener("click", function () {
                const cafeId = cafe.id;
                // Redirect to menu page with cafe ID in the query parameter
                window.location.href = `/menu?id=${cafeId}`;
            });

            // Append cafe item to the cafe list
            cafeList.appendChild(cafeItem);
        });
    })
    .catch(error => {
        console.error("Error fetching cafe data:", error);
    });

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
