import nodemailer from 'nodemailer';

const getTransporter = () => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });
};

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and feedback message are required',
      });
    }

    const transporter = getTransporter();

    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured on server',
      });
    }

    const receiverEmail = process.env.FEEDBACK_RECEIVER_EMAIL || process.env.GMAIL_USER;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: receiverEmail,
      replyTo: email,
      subject: `DSA Sheets Feedback from ${name}`,
      text: `You have received new feedback:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Feedback sent successfully',
    });
  } catch (error) {
    console.error('Failed to send feedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send feedback',
    });
  }
};
