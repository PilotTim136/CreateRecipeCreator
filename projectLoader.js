var projectSel = true;
var ver = "1.20.1";
var _project = "<undefined>";

function GetProjectNames(){
    if(localStorage.getItem("projects") !== null){
        let projects = JSON.parse(localStorage.getItem("projects"));
        return projects;
    }
    return null;
}

function ProjectSelection(){
    let projectList = document.getElementById("projects");
    projectList.hidden = false;
    if(localStorage.getItem("projects") !== null){
        let projects = JSON.parse(localStorage.getItem("projects"));
        projects.forEach(project => {
            projectList.innerHTML += `<center><button onclick="LoadProjectToUrl('${project}')">${project}</button><br></center>`;
        });
    }
    projectList.innerHTML += `<center><input id="name" placeholder="project name"><button onclick="CreateProject()">Create Project</button><br></center>`;
}

function LoadProject(name, file = "mcmeta"){
    console.log("Loading project: " + name + "...");
    _project = name;
    loadAll();
    loadFile(GetQuery("file") || file);
}

function LoadProjectToUrl(name){
    window.location.href = "create.html?project=" + name;
}

function CreateProject(){
    let p = GetProjectNames();
    let tj = [];
    if(p !== null){
        p.forEach(pr => {
            tj.push(pr);
        });
    }
    let j = {
        name: document.getElementById("name").value
    };
    tj.push(j.name);
    localStorage.setItem("projects", JSON.stringify(tj));
    localStorage.setItem(j.name, "[{\"name\":\"mcmeta\",\"content\":{}}]");
    window.location.href = "create.html?project=" + j.name;
}

let q = GetQuery("project");
if(q === null){
    ProjectSelection();
    workspace.innerHTML = "";
}else{
    projectSel = false;
    LoadProject(q);
}
