function startMagic() {
    // ড্রপডাউন থেকে Mr./Mrs. এবং ইনপুট থেকে নাম নেওয়া হচ্ছে
    const title = document.getElementById('titleSelect').value;
    const name = document.getElementById('userName').value;
    const display = document.getElementById('magic-display');
    
    if (name.trim() === "") {
        alert("Please enter your name!");
        return;
    }

    // এনিমেশন জোনে নাম দেখানো (Mr./Mrs. সহ এবং সঠিক বানান)
    display.innerText = "Welcome to our Website " + title + " " + name;
    
    // টেক্সট কালার এবং স্টাইলিশ ইফেক্ট
    display.style.color = "#fcf6ba"; // তোর গোল্ডেন কালারের সাথে ম্যাচিং
    display.style.textShadow = "0 0 20px rgba(191, 149, 63, 0.8)";

    // অটো স্ক্রল এনিমেশন জোনে
    document.getElementById('animation-zone').scrollIntoView({ behavior: 'smooth' });
}
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var btn = document.getElementById("my-form-status-btn");
  var data = new FormData(event.target);
  
  btn.disabled = true; // বাটন ডিসেবল করে দেওয়া যাতে বারবার ক্লিক না করে
  status.innerHTML = "Sending...";

  fetch("https://formspree.io/f/xnjbznwg", { // এখানে তোর লিঙ্ক বসাবি
    method: "POST",
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks! Your message has been sent.";
      status.style.color = "#bf953f"; // গোল্ডেন কালার
      form.reset(); // ফর্ম খালি করে দেওয়া
      btn.disabled = false;
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form";
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem connecting to the server";
  });
}
form.addEventListener("submit", handleSubmit)