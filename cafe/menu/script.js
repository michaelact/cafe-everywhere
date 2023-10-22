// Check if the user has cafe_id cookie
const cafeId = getCookie("cafeid");

if (!cafeId) {
    // Redirect to cafe login page or display an error message
    window.location.href = "/cafe/login";
}

const menuList = document.getElementById("menu-list");
const menuForm = document.getElementById("menu-form");
const addMenuButton = document.getElementById("add-menu");

// Fetch menu data from the backend
fetch(`http://localhost:9999/cafe-menu/${cafeId}`, {
        headers: {
            'x-api-key': 'API_KEY_NOT_SET'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Generate menu items based on the data
        data.data.forEach(menuItem => {
            const menuDiv = document.createElement("div");
            menuDiv.className = "menu-item";

            const menuInfo = document.createElement("div");
            menuInfo.innerHTML = `
                <h2>${menuItem.title}</h2>
                <p>${menuItem.description}</p>
                <p>Harga: Rp. ${menuItem.price}, 00</p>
            `;

            const menuImage = document.createElement("img");
            menuImage.src = "default-menu-image.jpg";
            menuImage.alt = menuItem.title;

            menuDiv.appendChild(menuImage);
            menuDiv.appendChild(menuInfo);
            menuList.appendChild(menuDiv);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Show menu form when "Add Menu" button is clicked
addMenuButton.addEventListener("click", () => {
    menuForm.classList.toggle("hidden");
});

// Handle menu form submission
const menuFormElement = document.getElementById("menuForm");
menuFormElement.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const count = parseInt(document.getElementById("count").value);
    const price = parseInt(document.getElementById("price").value);

    // Validate and send POST request to backend
    const menuData = {
        title: title,
        description: description,
        count: count,
        price: price,
        cafe_id: parseInt(cafeId, 10)
    };

    fetch("http://localhost:9999/menu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'x-api-key': 'API_KEY_NOT_SET'
        },
        body: JSON.stringify(menuData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle success or display error message
        console.log("Menu berhasil ditambah:", data);
        // Optionally update the menu list with the new menu item
    })
    .catch(error => {
        console.error("Terjadi kesalahan:", error);
    });
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
