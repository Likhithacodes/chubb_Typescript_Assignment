"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
const isValidContact = (contact) => {
    const contactPattern = /^\d{10}$/;
    return contactPattern.test(contact);
};
const showError = (elementId, message) => {
    const inputElement = document.getElementById(elementId);
    if (inputElement) {
        inputElement.classList.add('input-error');
        inputElement.placeholder = message;
        inputElement.setCustomValidity(message);
        inputElement.reportValidity();
    }
};
const clearErrors = () => {
    const errorElements = document.querySelectorAll(".input-error");
    errorElements.forEach((input) => {
        const inputElement = input;
        inputElement.classList.remove('input-error');
        inputElement.placeholder = "";
        inputElement.setCustomValidity("");
    });
};
const clearInputError = (elementId) => {
    const inputElement = document.getElementById(elementId);
    if (inputElement) {
        inputElement.classList.remove('input-error');
        inputElement.placeholder = "";
        inputElement.setCustomValidity("");
    }
};
(_a = document.getElementById('contactForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    clearErrors();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    let isValid = true;
    if (name.trim() === "") {
        showError("name", "Name is required");
        isValid = false;
    }
    if (email.trim() === "") {
        showError("email", "Email is required");
        isValid = false;
    }
    else if (!isValidEmail(email)) {
        showError("email", "Enter a valid email address");
        isValid = false;
    }
    if (contact.trim() === "") {
        showError("contact", "Mobile number is required");
        isValid = false;
    }
    else if (!isValidContact(contact)) {
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
            const response = yield fetch('https://67172f35b910c6a6e026dc1d.mockapi.io/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Form submitted successfully!');
            }
            else {
                alert('Submission failed.');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    }
}));
const inputIds = ['name', 'email', 'contact', 'subject', 'message'];
inputIds.forEach(id => {
    const inputElement = document.getElementById(id);
    if (inputElement) {
        inputElement.addEventListener('input', () => clearInputError(id));
    }
});
