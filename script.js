const form = document.getElementById("contactForm");
const status = document.getElementById("status");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    status.textContent =
      "Your form is valid! Connect an email service to send your message.";

    form.reset();
  });
}
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const status = document.querySelector("#form-status");
        const formData = Object.fromEntries(
            new FormData(contactForm).entries()
        );

        status.textContent = "Connecting to the server...";

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to send your message."
                );
            }

            status.textContent = "Message sent successfully!";
            contactForm.reset();
        } catch (error) {
            status.textContent =
                "Message could not be sent. Please try again later.";
            console.error(error);
        }
    });
}