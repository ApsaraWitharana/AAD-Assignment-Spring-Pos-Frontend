

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw1PrDubPtWxmP57py3Tqe1rLtbGvl2qg",
    authDomain: "my-coffe-shope.firebaseapp.com",
    projectId: "my-coffe-shope",
    storageBucket: "my-coffe-shope.appspot.com",
    messagingSenderId: "915524445111",
    appId: "1:915524445111:web:2f510b4adbd97d2bb43e32"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get Authentication instance
const auth = firebase.auth();
// // Sign up logic
document.addEventListener('DOMContentLoaded', (event) => {
    const regButton = document.getElementById('reg');
    if (regButton) {
        regButton.addEventListener('click', () => {
            // const username = document.getElementById('user_name').value;
            const email = document.getElementById('email-reg').value;
            const password = document.getElementById('password-reg').value;

            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {

                    // Registered successfully
                    alert("Registered Successfully!!!");
                    const user = userCredential.user;
                    // You can add more actions here
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`Error: ${errorMessage}`);
                });
        });
    }
});



//signIn - using ath model
document.addEventListener('DOMContentLoaded', (event) => {
    const logInButton = document.getElementById('singin');
    if (logInButton) {
        logInButton.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    window.location.href = "../Spring-Pos-Fronend/index.html?";
                    // Login successful
                    alert("Login Successful!!!");
                    const user = userCredential.user;
                    // You can add more actions here
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`Error: ${errorMessage}`);
                });
        });
    }
});

