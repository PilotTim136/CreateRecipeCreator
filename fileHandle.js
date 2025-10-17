const fileDiv = document.getElementById("files");
var files = [];
var currentFile = "";

function saveAll(){
    const f = JSON.stringify(files);
    localStorage.setItem(_project, f);
}
function loadAll(){
    files = [];
    const f = JSON.parse(localStorage.getItem(_project));
    let hasMcmeta = false;
    f.forEach(file => {
        if(file.name === "mcmeta") hasMcmeta = true;
        if(file.content && typeof file.content === "object") content = file.content;
        else file.content = {};
        
        files.push(file);
    });
    refreshFileTree();
}

function GetEmptyFileJson(name){
    return {
        name: name,
        content: {}
    }
}

function refreshFileTree(save = false){
    if(save){
        saveAll();
        loadAll();
    }
    fileDiv.innerHTML = ``;
    files.forEach(f => {
        fileDiv.innerHTML += `<button onclick="loadFile('${f.name}')">${f.name}</button>`;
    });
    fileDiv.innerHTML += `<button onclick="newFile()">+</button>`;
}

function newFile(){
    UI.Interface.NewFile();
}

function loadFile(lf){
    saveAll();
    console.log("Loading file: " + lf);
    const f = files.find(file => file.name === lf);
    currentFile = f.name;
    if(f.name === "mcmeta"){
        DoMetaUI(f);
        return;
    }
    DoUI(f);
}

function createFile(){
    const text = document.getElementById("_ui_filename").value;
    UI.Interface.ShowElements(false);
    if(text !== null && text !== ""){
        if(!files.find(f => f.name === text)){
            files.push(GetEmptyFileJson(text));
            refreshFileTree(true);
            loadFile(text);
            UI.Warning.Show(`File "${text}" created!`, "success", true);
        }else
            UI.Warning.Show(`File with name "${text}" already exists`, "warn");
            console.warn("A file with this name already exists!");
    }else{
        UI.Warning.Show(`No valid filename given.`, "warn");
        console.warn("No valid filename given.");
    }
}
