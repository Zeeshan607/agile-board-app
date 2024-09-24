


const AboutProject=()=>{

    return (
        <div className="container-fluid bg-white p-3">
           <div className="row mx-0 mt-4">
            <div className="col-12">
                <h1 className="text-bold">Project Story</h1>
                <ul>
                    <li><p>User Register him self. Default Workspace get created on successfull registeration of user. </p></li>
                    <li><p>User login to his account. </p></li>
                    <li><p>After succeessfull login, If user has only one workspace which is his default workspace and 
                        he has no other workspace shared with him then system will automatically select default workpsace to load. but if he has more then one workspace or
                        he has some shared workspaces then will see workspace select modal and he have to select any workspace which he wants to load </p></li>
                    <li><p>Workspace sucessfully loaded. now if there are 0 number of boards available in select workspace then user will see a modal to create his first board. 
                        but if the selected workspace has list of boards in it then he all boards will appear on Dashboard.</p></li>
                     <li><p>User will select/click any boards to View.</p> </li>
                     <li><p>On Board view user will see 3 columns stages 1.To Do, 2.In Progress, 3.Completed, with buttons to add tasks in them. </p> </li>
                     <li><p>User will click on add Task button. Create Task modal will appear with 3 inputs. </p> </li>
                     <li><p>User will add task title, basic description and if he want to assign this task to someone he will select that user from Assign To SELECT options</p></li>
                     <li><p>On click of save button in CreateTask modal, Task gets created successfully.</p></li>
                     <li>
                        <p>Then user will click on Task to view task details and add other meta data, On TaskView modal user can add due data, set task priority, and
                            add lengthy descriptive description with media images by double clicking on basic description which he added in initial task creation step.
                             In this TaskView modal user can add sub tasks in SubTasks section</p>
                     </li>
                     <li><p>User can check the checkbox of available sub tasks to mark them complete and uncheck to mark them incomplete, user can delete subtasks both individually available delete button 
                         and with delete all button</p></li>
                    <li><p>In TaskView Modal user can see also add comments in discussion section, comment can contain lengthy problem explaination with images, comment can be edited and deleted with small edit and delete options 
                        available individually to every comment. user can also completly delete all discussoin at once</p></li>
                    <li><p>Task can be dragged from one column to other column to update status as in-progress or complete</p></li>
                    <li><p>If user want to share his workspace to other person he can use invite workspace member button available on dashboard to send invite via Email address</p></li>
                    <li><p>To invite someone in specific workspace user have to first activate that workspace and then send invite. At Invitation send successfully, Invitation record will be created in
                        database and Email will be sent with invite link containing ID of current active workspace and a unique token. Invitation can be accepted or declined during Token life time, This unique token will get expire in next 24hrs
                        starting from the time invitation was sent.</p></li>
                    <li><p>If user declined the invite system will kill the token and invitation link become invalid. If this happen by mistake Admin of workspace has to send the invite again.</p></li>
                    <li><p>If user accept the invite system will update he status of invitation to accepted. </p></li>
                    <li><p>Now when The Person who was invited via invitation link and accepted the invite create his account from Registeration page or login using his previous account on system
                    a New User to Workspace relation will be created in system's database giving access of invited workspace to the user.</p></li>
                   <li><p>After login of Invited user, user will be able to see default workspace created for himself by the system and the workspace he was invited to. He can switch in both workspaces from Setting icon in left bottom corner of system.</p></li>
                   <li><p>If Invited user wants to leave the access of invited workspace He has to switch into that workspace and then navigate to Members menu from sidebar.</p></li>
                   <li><p>In Members menu  he will see the email of admin of workspace and record showing his relationship to the current active workspace. In the actions column of the menu he will "leave workspace" action button </p></li>
                   <li><p>On click of Leave workspace his access to that workspace will be removed and he will be automatically switched to his own recently created workspace</p></li>
                 
                 </ul>
            </div>
           </div>
           <div className="row mx-0 mt-3">
            <div className="col-12">
                <h1>Note By Creator <a href="https://muhammadzeeshan.dev" target="_blank">Muhammad Zeeshan</a></h1>
                <p>I have created this project for my personal learning purpose. It is my First Full stack project in MERN Stack(mySQL as database). This project can be enhanced by various means.
                   With limited time(although this project also took almost 3 months to complete as i had to write alot of react/redux code) i was only able to complete these features
                    that i think are the core features of <a href="https://trello.com/" target="_blank">Trello</a>. You can find code and project setup details on <a href="https://github.com/Zeeshan607/agile-board-app" target="_blank" rel="noopener noreferrer">github</a> repository of this project.  Thanks for visiting.
                
                </p>
            </div>
           </div>
        </div>
    )
}
export default AboutProject;