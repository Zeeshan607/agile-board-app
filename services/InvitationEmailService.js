import config from "../config/default.js";
import crypto from "node:crypto";

class InvitationEmailService{

    transporter=null;

    constructor(){
      this.transporter=  nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.gmail_username, // Your Gmail address
              pass: config.gmail_app_password,  // Your Gmail password or App Password
            },
          });
    }
   
    generateUniqueToken(){
        return crypto.randomBytes(64).toString('hex');
    }
     
    generateInvitationLink(workspaceId, token) {
        return `${config.hostname}/join-workspace/${workspaceId}?token=${token}`;
      };

    async  sendWorkspaceInvitation(recipientEmail, workspaceName, invitationLink) {
        const mailOptions = {
          from: config.gmail_username, // Sender address
          to: recipientEmail,           // List of recipients
          subject: `Invitation to Join ${workspaceName}`, // Subject line
          html: `
            <p>You have been invited to join the workspace <b>${workspaceName}</b> on our Kanban board.</p>
            <p>Click <a href="${invitationLink}">here</a> to join.</p>
            <p>Thank you!</p>
          `, // HTML body
        };
      
        
        try {
          const info = await this.transporter.sendMail(mailOptions);
          console.log('Invitation sent: ' + info.response);
          return true;
        } catch (error) {
          console.error('Error sending invitation: ' + error.message);
        }
      };





}
export default new InvitationEmailService();