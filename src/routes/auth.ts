import express from "express";
import sgMail from "@sendgrid/mail";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const auth = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

function generateFourDigitCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function sendEmail({
  to,
  from,
  subject,
  message,
}: {
  to: string;
  from: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const msg = {
    to,
    from,
    subject,
    html: message,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

auth.post("/auth/sendVerificationCode", async function (req, res) {
  const { email } = req.body;

  // TODO: check if user exists in user table; otherwise we'll be sending codes to non registered people haha
  const verification = await prisma.verification_code.findUnique({
    where: { email },
  });

  const code = generateFourDigitCode();

  // create verification code in database
  try {
    await prisma.verification_code.upsert({
      where: { email },
      update: { code },
      create: { email, code },
    });
  } catch (e) {
    console.log("Error creating verification code relation, ", e);
  }

  // email the verification code
  const emailSuccessful = await sendEmail({
    to: email,
    from: "survey360@puzzlehr.com",
    subject: "Verification Code",
    message: `This is your code ${code}`,
  });

  // respond to client
  if (emailSuccessful) {
    res.status(200).json({ successful: true });
  } else {
    res.status(500).json({
      successful: false,
      errorMessage: "Cannot send email. Contact developer to investigate.",
    });
  }
});

auth.post("/auth/validateVerificationCode", async function (req, res) {
  const { verificationCode, email } = req.body;

  try {
    const verification = await prisma.verification_code.findUnique({
      where: { email },
    });

    if (!verification) {
      res.status(400).json({
        successful: false,
        errorMessage: "Verification code not found.",
      });
      return;
    }

    if (verification.code === parseInt(verificationCode)) {
      res.status(200).json({ successful: true });
    } else {
      res.status(200).json({
        successful: false,
        errorMessage: "Invalid verification code.",
      });
    }
  } catch (e) {
    console.error("Error validating verification code: ", e);
    res.status(500).json({
      successful: false,
      errorMessage: "Internal server error.",
    });
  }
});

export default auth;
