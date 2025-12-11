EmailJS setup for TecWebStudio

This project supports sending contact form messages via EmailJS (browser SDK).

1. Create an EmailJS account at https://www.emailjs.com/
2. Create an Email Service (e.g., Gmail, SMTP) in the EmailJS dashboard and note the Service ID.
3. Create an Email Template and note the Template ID. The template can use variables like `from_name`, `reply_to`, `message`, and `to_email`.
4. Obtain your Public Key (also known as User ID) from the EmailJS dashboard.

Set the following environment variables in a `.env.local` file at the project root (do NOT commit your real keys):

NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

Notes:

- The contact form code falls back to a simulated submit when the env vars are not present, so the site will keep working in development without EmailJS configured.
- The template receives `to_email: support@tecwebstudio.it` by default; change this in the template or the code if you want a different recipient.

Testing:

- After setting the env vars, run the app and submit the contact form. Check the EmailJS dashboard for sent messages.
- Optionally, log messages are printed to the console on send errors.
