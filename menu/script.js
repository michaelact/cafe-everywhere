// Check if the user is authenticated
const userId = getCookie("userid");
if (!userId) {
    // Redirect to the login page if the user is not authenticated
    window.location.href = "/login";
}

// Get menu ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const menuId = urlParams.get('id');
if (!menuId || isNaN(menuId)) {
    window.location.href = "/cafe";
}

// Fetch menu data from the backend API
fetch(`http://localhost:9999/cafe-menu/${menuId}`, {
        headers: {
            'x-api-key': 'VGh1IE9jdCAxMiAxOToxMzoyOCBXSUIgMjAyMwo='
        }
    })
    .then(response => response.json())
    .then(data => {
        const menuList = document.getElementById("menuList");
        data.data.forEach(menu => {
            // Create menu item element
            const menuItem = document.createElement("div");
            menuItem.className = "menu-item";
            menuItem.setAttribute("data-menu-id", menu.id);

            // Add menu title and description
            const title = document.createElement("h2");
            title.textContent = menu.title;
            menuItem.appendChild(title);

            const description = document.createElement("p");
            description.textContent = menu.description;
            menuItem.appendChild(description);

            // Add default menu image (replace 'menu-placeholder.jpg' with your actual default image URL)
            const image = document.createElement("img");
            image.src = "default-menu-image.jpg";
            image.alt = menu.title;
            menuItem.appendChild(image);

            // Make menu items clickable
            menuItem.addEventListener("click", function () {
                const menuId = menu.id;
                const count = parseInt(prompt("Berapa banyak:", 1), 10); // Prompt user for quantity
                const address = prompt("Masukkan alamat pengantaran:", "Ambil di tempat"); // Prompt user for quantity
                if (!isNaN(count) && count > 0) {
                    const data = {
                        menu_id: menuId,
                        user_id: parseInt(userId, 10),
                        count: count,
                        address: address
                    };

                    fetch("http://localhost:9999/order", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': 'VGh1IE9jdCAxMiAxOToxMzoyOCBXSUIgMjAyMwo='
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === "Success") {
                            alert(`Order berhasil: ${count} x ${menu.title}`);
                            window.location.href = '/order';
                        } else {
                            alert(`Order gagal: ${count} x ${menu.title}`);
                        }
                    })
                    .catch(error => {
                        console.error("Terjadi kesalahan:", error);
                    });
                } else {
                    alert("Jumlah tidak valid. Mohon mencoba lagi.");
                }
            });

            // Append menu item to the menu list
            menuList.appendChild(menuItem);
        });
    })
    .catch(error => {
        console.error("Terjadi kesalahan:", error);
    });

// Function to set cookie (you can use this for authentication)
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
