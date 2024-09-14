import { StatusCodes } from "http-status-codes";
import Invitation from "../../models/Invitation.js";
import moment from "moment";
import InvitationEmailService from "../../services/InvitationEmailService.js";
import Workspace from "../../models/Workspace.js";

class InvitationsHandlingController {

  async accept(req, res) {
    const { token, invitedEmail, workspace_id } = req.body;

    try {
      // Fetch the invitation from the database
      const invite = await Invitation.findOne({
        where: { invited_user_email: invitedEmail, workspace_id: workspace_id },
      });

      // Check if the invitation exists
      if (!invite) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Invitation not found." });
      }

      const now = moment();

      // Check if the token is expired
      if (now.isAfter(moment(invite.expires_at))) {
        return res.status(StatusCodes.OK).json({
          error:
            "Token Expired. Please ask the workspace admin to resend the invitation.",
        });
      }

      // Validate the token, email, and workspace_id
      if (
        token === invite.token &&
        invitedEmail === invite.invited_user_email &&
        workspace_id === invite.workspace_id
      ) {
        await invite.update({ status: "accepted" });
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Invite accepted successfully" });
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid invitation details." });
      }
    } catch (error) {
      // Handle any unexpected errors
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error +"Oops! Something went wrong." });
    }
  }

  async decline(req, res) {
    console.log('got request')
    const { token, invitedEmail, workspace_id } = req.body;

    try {
      // Fetch the invitation from the database
      const invite = await Invitation.findOne({
        where: { invited_user_email: invitedEmail, workspace_id: workspace_id },
      });

      // Check if the invitation exists
      if (!invite) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Invitation not found." });
      }

      const now = moment();

    //   // Check if the token is expired
      if (now.isAfter(moment(invite.expires_at))) {
        return res.status(StatusCodes.OK).json({
          error:
            "Token Expired. Please ask the workspace admin to resend the invitation.",
        });
      }

      // Validate the token, email, and workspace_id
        if (
            token === invite.token &&
            invitedEmail === invite.invited_user_email &&
            workspace_id === invite.workspace_id
        ) {
            await invite.update({ status: "declined" });
            return res
            .status(StatusCodes.OK)
            .json({ msg: "Invite declined successfully" });
        } else {
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Invalid invitation details." });
        }
    } catch (error) {
    //   // Handle any unexpected errors
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({"error":"Oops! something went wrong. please try again"});
    }
  }


  async getBYTokenAndEmail(req, res){
    const [token, email]=req.params;
    const invite=Invitation.findOne({where:{'token':token,"invited_user_email":email}});
    res.status(StatusCodes.OK).json({'invite':invite});
  }
}
export default new InvitationsHandlingController();
