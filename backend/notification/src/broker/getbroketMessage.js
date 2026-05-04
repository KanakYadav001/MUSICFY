import {consumeQueue} from "./broker.js";
import {sendEmail} from "../utils/email.js";


export const getBrokerMessage = async () => {
     
   consumeQueue("User_Register_Queue", async (data) => {
    
     const {email,fullName : {firstName,lastName},role} = data;
    
  let EmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to MUSIFY</title>
</head>

<body style="margin:0; padding:0; background-color:#0d0d0d; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 10px;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="480" cellpadding="0" cellspacing="0" 
          style="background:#181818; border-radius:14px; padding:40px 30px; box-shadow:0 8px 25px rgba(0,0,0,0.6);">

          <!-- Logo -->
          <tr>
            <td align="center" style="font-size:28px; font-weight:bold; color:#1DB954; letter-spacing:1px;">
              🎵 MUSIFY
            </td>
          </tr>

          <tr><td height="25"></td></tr>

          <!-- Heading -->
          <tr>
            <td style="font-size:24px; color:#ffffff; text-align:center; font-weight:bold;">
              Welcome to MUSIFY 👋
            </td>
          </tr>

          <tr><td height="10"></td></tr>

          <!-- Personalized -->
          <tr>
            <td style="font-size:16px; color:#ffffff; text-align:center;">
              Hi <strong style="color:#1DB954;">${firstName}</strong>,
            </td>
          </tr>

          <tr><td height="15"></td></tr>

          <!-- Subtext -->
          <tr>
            <td style="font-size:15px; color:#b3b3b3; text-align:center; line-height:1.6;">
              You’re all set to explore a world of music.  
              Discover trending tracks, create your own playlists,  
              and enjoy a personalized listening experience.
            </td>
          </tr>

          <tr><td height="30"></td></tr>

          <!-- CTA Button -->
          <tr>
            <td align="center">
              <a href="http://localhost:3000"
                 style="background:#1DB954; color:#000; padding:14px 32px; 
                        text-decoration:none; border-radius:50px; font-weight:bold; 
                        font-size:14px; display:inline-block;">
                Start Listening 🎧
              </a>
            </td>
          </tr>

          <tr><td height="30"></td></tr>

          <!-- Secondary Info -->
          <tr>
            <td style="font-size:13px; color:#888; text-align:center; line-height:1.5;">
              Need help? Just reply to this email — we’re here for you.
            </td>
          </tr>

          <tr><td height="25"></td></tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #2a2a2a;"></td>
          </tr>

          <tr><td height="20"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="font-size:12px; color:#777; text-align:center; line-height:1.6;">
              If you didn’t create this account, you can safely ignore this email.
            </td>
          </tr>

        </table>

        <!-- Bottom -->
        <p style="font-size:12px; color:#555; margin-top:20px;">
          © 2026 MUSIFY · All rights reserved
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
`;
     await sendEmail(email, "🎵 Welcome to MUSIFY", `Hello, ${firstName} ${lastName}! Welcome to MUSIFY – your personal music universe!` , EmailTemplate);
   })
}