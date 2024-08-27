import InvitationEmailService from "./../services/InvitationEmailService.js";
import Workspace from "./../models/Workspace.js";
import Invitation from "../models/Invitation.js";
import moment from 'moment';
import { StatusCodes } from "http-status-codes";

class InvitationController{


    async sendInvite(req, res){

        try{

            const {workspace_id, email}=req.body;
            const token=InvitationEmailService.generateUniqueToken();
            const invitationLink=InvitationEmailService.generateInvitationLink(workspace_id,email,token);
            const workspace=await Workspace.findByPk(workspace_id);
            if(!workspace){
                return res.status(StatusCodes.NOT_FOUND).json({'error':"workspace with given Id Not found"});
            }
            const now = moment();
            // Add one day to the current time
            const nextDay = now.add(1, 'days');
            // Get the timestamp of the next day's time
            const nextDayTimestamp = nextDay.valueOf();
            const invite=await Invitation.create({"workspace_id":workspace.id,"invited_user_email":email, "token":token,"expires_at":nextDayTimestamp});
            await InvitationEmailService.sendWorkspaceInvitation(email, workspace.title, invitationLink);
          return  res.status(200).json({ msg: 'Invitation sent successfully!' });  

        }catch(err){
            // "Oops! something went wrong"
            return res.status(StatusCodes.BAD_REQUEST).json({'error': "Oops! something went wrong"});
        }
 


}

}

export default new InvitationController();