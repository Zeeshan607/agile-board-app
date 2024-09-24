import { StatusCodes } from "http-status-codes";
import TaskDiscussion from "../models/TaskDiscussion.js";
import User from "../models/UserModel.js";

class TaskDiscussionController {
  async index(req, res) {
    const {id}=req.params
    const discussions = await TaskDiscussion.findAll({where:{task_id:id},order:[['id','DESC']],include:[{model:User, as:'user'}]});
    res.status(StatusCodes.OK).json({ discussions: discussions });
  }

  async store(req, res) {
    let { message, task_id } = req.body;
    const td = await TaskDiscussion.create({
      message,
      user_id: req.user.userId,
      task_id,
    });

    // Fetch the newly created comment along with the associated user
    const newComment = await TaskDiscussion.findOne({
      where: { id: td.id },
      include: [
        {
          model: User, // Assuming the model name for the user is 'User'
          as: 'user', // Adjust 'user' if you use a different alias
          // attributes: ['id', 'name', 'email'], // Specify the user attributes you want to include
        },
      ]
      ,
    });



    res
      .status(StatusCodes.OK)
      .json({ 'comment':newComment, msg: "Comment saved successfully" });
  }

  async update(req, res) {
    let { id } = req.params;
    let { message } = req.body;
    const td = await TaskDiscussion.findByPk(id);
    const td_updated = await td.update({ message });

    // Fetch the updated comment along with the associated user
    const updatedComment = await TaskDiscussion.findOne({
      where: { 'id': id },
      include: [
        {
          model: User, // Assuming the model name for the user is 'User'
          as: 'user', // Adjust 'user' if you use a different alias
          // attributes: ['id', 'name', 'email'], // Specify the user attributes you want to include
        },
      ]
      ,
    });

    res
      .status(StatusCodes.OK)
      .json({ "comment": updatedComment, msg: "Comment updated successfully" });
  }


  async destroy(req, res) {
    let { id } = req.params;
    const td = await TaskDiscussion.findByPk(id);
    await td.destroy();
    res.status(StatusCodes.OK).json({ msg: "Comment deleted successfully" });
  }

  async destroy_all(req, res){
    let { task_id } = req.params;
      await TaskDiscussion.destroy({where:{task_id:task_id}});
    res.status(StatusCodes.OK).json({ msg: "Discussion deleted successfully" });
  }
}

export default new TaskDiscussionController();
