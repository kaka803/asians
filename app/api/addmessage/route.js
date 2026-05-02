// app/api/contact/route.js
import { connectDb } from "@/lib/db";
import Message from "@/models/Message";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDb(); // Database connect

    const { name, phone, email, budget, description, urgent } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and Email are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Save message to DB
    const newMessage = new Message({
      name,
      phone,
      email,
      budget,
      description,
      urgent: urgent || false,
    });

    await newMessage.save();

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // Sender Gmail
      pass: process.env.EMAIL_PASS,   // App Password
    },
  });

    // Email options
    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // aap ka email jahan message receive karna hai
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Budget:</strong> ${budget || "N/A"}</p>
        <p><strong>Description:</strong> ${description || "N/A"}</p>
        <p><strong>Urgent:</strong> ${urgent ? "Yes" : "No"}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Message sent successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
