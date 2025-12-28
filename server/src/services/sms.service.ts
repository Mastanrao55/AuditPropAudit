import { getTwilioConfig } from "../config/env";

const APP_NAME = "AssetzAudit";

interface SMSResult {
  success: boolean;
  error?: string;
}

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
  const { accountSid, authToken, phoneNumber } = getTwilioConfig();
  
  if (!accountSid || !authToken || !phoneNumber) {
    console.log("SMS service not configured. Would send:", message, "to", to);
    return { success: true };
  }
  
  try {
    const formattedTo = to.startsWith("+") ? to : `+91${to}`;
    
    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
    
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: formattedTo,
          From: phoneNumber,
          Body: message,
        }),
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      console.error("Twilio error:", error);
      return { success: false, error: error.message || "Failed to send SMS" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("SMS sending error:", error);
    return { success: false, error: "Failed to send SMS" };
  }
}

export async function sendOTPSMS(phoneNumber: string, otp: string): Promise<SMSResult> {
  const message = `Your ${APP_NAME} verification code is: ${otp}. This code expires in 10 minutes. Do not share this code with anyone.`;
  return sendSMS(phoneNumber, message);
}

