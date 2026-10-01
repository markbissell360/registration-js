document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('registrationForm');
  const statusMessage = document.getElementById('statusMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusMessage.textContent = 'Submitting...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Detect payment method
    if (window.lastPaymentClicked === "venmo") {
      data.paymentMethod = "venmo";
    }
    if (window.lastPaymentClicked === "paypal") {
      data.paymentMethod = "paypal";
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyv36Xf6mXkwhg46nFgNVO3WxLbS1WjXuSYlkfU0bhUz6xGJkRKkTRSj5U6ItRf3C5w7Q/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();
      statusMessage.textContent = result.message || "Registration submitted successfully.";
      form.reset();
    } catch (error) {
      statusMessage.textContent = "Error: " + error;
    }
  });
});
