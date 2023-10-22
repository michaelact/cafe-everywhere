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
    const apiEndpoint = "http://localhost:9999/users";

    // Mock API call (replace this with an actual fetch request to your backend)
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'VGh1IE9jdCAxMiAxOToxMzoyOCBXSUIgMjAyMwo='
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
            console.error('Registrasi gagal:', data.message);
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
});
