function GetQuery(q){
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(q);
}

const navBar = document.getElementById("topNavBar");
let files = [];

function saveAll(){
    const f = JSON.stringify(files);
    localStorage.setItem(GetQuery("project"), f);
}

function refreshTree(){
    navBar.innerHTML = ``;
    files.forEach(f => {
        navBar.innerHTML += `<button onclick="loadFile('${f.name}')">${f.name}</button>`;
    });
    navBar.innerHTML += `<button onclick="newFile()">+</button>`;
}

function newFile(){
    const name = prompt("Enter filename (no extensions!)");
    if(name !== null && name !== ""){
        files.push(GetEFileJson(name));
        refreshTree();
        saveAll();
        return;
    }
    console.warn("No valid filename given.");
}

function loadFile(lf){
    saveAll();
    console.log("Loading file: " + lf);
    const f = files.find(file => file.name === lf);
    if(f.name === "mcmeta"){
        DoMetaUI(f);
        return;
    }
    DoUI(f);
}

function GetEFileJson(name){
    return {
        name: name,
        content: {}
    };
}

function LoadAllFiles(f){
    files = [];
    if(f){
        let hasMcmeta = false;
        f.forEach(fi => {
            if(fi.name === "mcmeta") hasMcmeta = true;
            let content = {};
            if(fi.content && typeof fi.content === "object"){
                content = fi.content;
            }

            files.push({
                name: fi.name,
                content: content
            });
        });
        if(!hasMcmeta) files.push(GetEFileJson("mcmeta"));
    }
    refreshTree();
}
