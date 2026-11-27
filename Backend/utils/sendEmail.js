
const sendEmail = async ({ to, subject, htmlContent, textContent }) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "WaitLess";

    if (!apiKey || !senderEmail) {
      throw new Error("Brevo email configuration is missing.");
    }

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: senderName,
            email: senderEmail,
          },
          to: [
            {
              email: to,
            },
          ],
          subject,
          htmlContent,
          textContent,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API Error:", data);
      throw new Error(
        data.message || "Failed to send email."
      );
    }

    return data;
  } catch (error) {
    console.error("Email Sending Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
