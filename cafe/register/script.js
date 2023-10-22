document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = {
        email: email,
        password: password
    };

    // Mock API endpoint (replace this with your actual backend API endpoint)
    const apiEndpoint = "http://localhost:9999/cafe";

    // Mock API call (replace this with an actual fetch request to your backend)
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'API_KEY_NOT_SET'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the backend returns a success status
        if (data.status === "Success") {
            // Redirect to the Login page after successful registration
            window.location.href = '/login';
        } else {
            // Handle registration error, show error message to the user, etc.
            console.error('Registration gagal:', data.error);
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
});
