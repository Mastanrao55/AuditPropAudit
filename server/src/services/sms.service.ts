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
  
  // Validate that authToken looks like a Twilio token (not a SendGrid key)
  if (authToken.startsWith("SG.")) {
    console.error("Invalid Twilio auth token: appears to be a SendGrid API key. Please set TWILIO_AUTH_TOKEN to your actual Twilio auth token.");
    return { success: false, error: "Twilio authentication not configured correctly" };
  }
  
  try {
    const formattedTo = to.startsWith("+") ? to : `+91${to}`;
    
    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
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
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const error = await response.json();
        console.error("Twilio error:", error);
        return { success: false, error: error.message || "Failed to send SMS" };
      }
      
      return { success: true };
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError' || fetchError.code === 'UND_ERR_CONNECT_TIMEOUT') {
        console.error("SMS sending timeout: Unable to connect to Twilio API");
        return { 
          success: false, 
          error: "Connection timeout. Please check your internet connection and Twilio service status." 
        };
      }
      
      throw fetchError;
    }
  } catch (error: any) {
    console.error("SMS sending error:", error);
    
    if (error.message?.includes("timeout") || error.code === 'UND_ERR_CONNECT_TIMEOUT') {
      return { 
        success: false, 
        error: "Connection timeout. Please check your network connection and try again." 
      };
    }
    
    return { success: false, error: error.message || "Failed to send SMS" };
  }
}

export async function sendOTPSMS(phoneNumber: string, otp: string): Promise<SMSResult> {
  const message = `Your ${APP_NAME} verification code is: ${otp}. This code expires in 10 minutes. Do not share this code with anyone.`;
  return sendSMS(phoneNumber, message);
}

