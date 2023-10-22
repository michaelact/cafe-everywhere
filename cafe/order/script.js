// Check if the user has cafe_id cookie
const cafeId = getCookie("cafeid");

if (!cafeId) {
    // Redirect to cafe login page or display an error message
    window.location.href = "/cafe/login";
}

const orderList = document.getElementById("order-list");

// Fetch order data from the backend
fetch(`http://localhost:9999/cafe-order/${cafeId}`, {
        headers: {
            'x-api-key': 'VGh1IE9jdCAxMiAxOToxMzoyOCBXSUIgMjAyMwo='
        }
    })
    .then(response => response.json())
    .then(data => {
        // Generate order items based on the data
        data.data.forEach(orderItem => {
            const orderDiv = document.createElement("div");
            orderDiv.className = "order-item";

            const statusClass = getStatusClass(orderItem.status);
            const statusText = getStatusText(orderItem.status);
            orderDiv.innerHTML = `
                <p>Order ID: ${orderItem.id}</p>
                <p>Status: <span class="status ${statusClass}">${statusText}</span></p>
                <p>Menu ID: ${orderItem.menu_id}</p>
                <p>Jumlah: ${orderItem.count}</p>
                <p>Catatan: ${orderItem.notes}</p>
            `;

            // Add option to update order status
            const statusSelect = document.createElement("select");
            statusSelect.innerHTML = `
                <option value="pending" ${orderItem.status === "pending" ? "selected" : ""}>Pending</option>
                <option value="completed" ${orderItem.status === "completed" ? "selected" : ""}>Completed</option>
                <option value="in-progress" ${orderItem.status === "in-progress" ? "selected" : ""}>In-Progress</option>
            `;
            statusSelect.addEventListener("change", () => {
                const newStatus = statusSelect.value;
                updateOrderStatus(orderItem.id, newStatus);
            });

            orderDiv.appendChild(statusSelect);
            orderList.appendChild(orderDiv);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });

function getStatusClass(status) {
    switch (status) {
        case "pending":
            return "pending";
        case "completed":
            return "completed";
        case "in-progress":
            return "in-progress";
        default:
            return "";
    }
}

function getStatusText(status) {
    switch (status) {
        case "pending":
            return "Pending";
        case "completed":
            return "Completed";
        case "in-progress":
            return "In Progress";
        default:
            return "";
    }
}

function updateOrderStatus(orderId, newStatus) {
    // Send PATCH request to update order status
    const updateData = {
        id: orderId,
        status: newStatus
    };

    fetch(`http://localhost:9999/order/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'x-api-key': 'VGh1IE9jdCAxMiAxOToxMzoyOCBXSUIgMjAyMwo='
        },
        body: JSON.stringify(updateData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle success or display error message
        console.log("Status order berhasil diperbarui:", data);
        // Optionally update the order status in the UI
    })
    .catch(error => {
        console.error("Error:", error);
    });
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
