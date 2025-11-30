const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const APP_NAME = "AuditProp";

interface SMSResult {
  success: boolean;
  error?: string;
}

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.log("SMS service not configured. Would send:", message, "to", to);
    return { success: true };
  }
  
  try {
    const formattedTo = to.startsWith("+") ? to : `+91${to}`;
    
    const credentials = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
    
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: formattedTo,
          From: TWILIO_PHONE_NUMBER,
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
