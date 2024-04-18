import { NotFoundError } from "../errors/customErrors.js";
import Project from "../models/ProjectModel.js";
import StatusCodes from "http-status-codes";
import Board from "../models/BoardModel.js"
class ProjectController {
  constructor() {}

  async getProjects(req, res) {
    const projects = await Project.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ projects });
  }

  async store(req, res) {
    // console.log((req.body))
    const { name, description } = req.body;
    const project = await Project.create({
      name,
      description,
      createdBy: req.user.userId,
    });
    const def_board=await Board.create([
      {name:'To Do', description:"List of all tasks that we have to do.",createdBy:req.user.userId,order:1,projectId:project._id},
      {name:'In Progress', description:"All tasks that are under development",createdBy:req.user.userId,order:2,projectId:project._id},
      {name:'Completed', description:"All completed tasks",createdBy:req.user.userId,order:3,projectId:project._id}
    ])
    res.status(StatusCodes.OK).json({ msg: "Project Created successfuly" });
  }

  async single(req, res) {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Project with ${id} not found` });
    }
    res.status(StatusCodes.OK).json(project);
  }

  // update project
  async update(req, res) {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Project with ${id} not found` });
    }
    const resp = await project.updateOne(req.body);

    res.status(StatusCodes.OK).json({ msg: "Project Updated successfuly" });
  }
  // Delete project
  async delete(req, res) {
    const { id } = req.params;
      const project = await Project.deleteOne({_id:id});
          const boards= await Board.deleteMany({projectId:id})
    res.status(StatusCodes.OK).json({ msg: "Project deleted successfuly" });
  }
}
export default new ProjectController();
