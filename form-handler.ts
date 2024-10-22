const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const isValidContact = (contact: string): boolean => {
    const contactPattern = /^\d{10}$/;
    return contactPattern.test(contact);
};

const showError = (elementId: string, message: string): void => {
    const inputElement = document.getElementById(elementId) as HTMLInputElement | null;

    if (inputElement) {
        inputElement.classList.add('input-error');
        inputElement.placeholder = message;
        inputElement.setCustomValidity(message);
        inputElement.reportValidity();
    }
};

const clearErrors = (): void => {
    const errorElements = document.querySelectorAll(".input-error");

    errorElements.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        inputElement.classList.remove('input-error');
        inputElement.placeholder = "";
        inputElement.setCustomValidity("");
    });
};

const clearInputError = (elementId: string): void => {
    const inputElement = document.getElementById(elementId) as HTMLInputElement | null;

    if (inputElement) {
        inputElement.classList.remove('input-error');
        inputElement.placeholder = "";
        inputElement.setCustomValidity("");
    }
};

document.getElementById('contactForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearErrors();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const subject = (document.getElementById('subject') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    let isValid = true;

    if (name.trim() === "") {
        showError("name", "Name is required");
        isValid = false;
    }
    if (email.trim() === "") {
        showError("email", "Email is required");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError("email", "Enter a valid email address");
        isValid = false;
    }

    if (contact.trim() === "") {
        showError("contact", "Mobile number is required");
        isValid = false;
    } else if (!isValidContact(contact)) {
        showError("contact", "Enter a valid 10-digit number");
        isValid = false;
    }

    if (subject.trim() === "") {
        showError("subject", "Subject is required");
        isValid = false;
    }

    if (message.trim() === "") {
        showError("message", "Message is required");
        isValid = false;
    }

    if (isValid) {
        const formData = { name, email, contact, subject, message };

        try {
            const response = await fetch('https://67172f35b910c6a6e026dc1d.mockapi.io/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Submission failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    }
});

const inputIds = ['name', 'email', 'contact', 'subject', 'message'];
inputIds.forEach(id => {
    const inputElement = document.getElementById(id) as HTMLInputElement | null;
    if (inputElement) {
        inputElement.addEventListener('input', () => clearInputError(id));
    }
});
