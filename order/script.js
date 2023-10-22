// Check if the user is authenticated
const userId = getCookie("userid");
if (!userId) {
    // Redirect to the login page if the user is not authenticated
    window.location.href = "/login";
}

// Fetch order data from the backend API
fetch(`http://localhost:9999/users-order/${userId}`, {
        headers: {
            'x-api-key': 'API_KEY_NOT_SET'
        }
    })
    .then(response => response.json())
    .then(data => {
        const orderList = document.getElementById("orderList");
        data.data.forEach(order => {
            // Create order item element
            const orderItem = document.createElement("div");
            orderItem.className = `order-item ${order.status}`;
            orderItem.setAttribute("data-order-id", order.id);

            // Add order details
            const orderDetails = document.createElement("p");
            orderDetails.textContent = `Order ID: ${order.id}, Menu ID: ${order.menu_id}, Jumlah: ${order.count}, Catatan: ${order.notes}`;
            orderItem.appendChild(orderDetails);

            // Add order status
            const status = document.createElement("p");
            status.textContent = `Status: ${order.status}`;
            orderItem.appendChild(status);

            // Add order address
            const address = document.createElement("p");
            address.textContent = `Alamat: ${order.address}`;
            orderItem.appendChild(address);

            // Make order items clickable (you can add click functionality here)
            // orderItem.addEventListener("click", function () {
            //     // Handle click event as per your requirement
            //     // For example, show order details, redirect to a detailed order page, etc.
            // });

            // Append order item to the order list
            orderList.appendChild(orderItem);
        });
    })
    .catch(error => {
        console.error("Error fetching order data:", error);
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
