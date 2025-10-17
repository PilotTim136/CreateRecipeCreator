function GetJSON(name){
    const f = files.find(file => file.name === name);
    if(!f) return;
    const c = GetCombined("create", ver, "6.0.6");
    console.log(`using generator "${c}"`);
    if(qGenerator[c]) return qGenerator[c]();
    else{
        console.error(`Trying to GET JSON, but no valid generator (${c}) was found.`);
        return null;
    }
}

function downloadJSON(name) {
    const text = GetJSON(name);
    if(text == null){
        UI.Warning.Show("Generator returned invalid format.", "err");
        console.error("Generator returned invalid format.");
        return;
    }
    const blob = new Blob([text], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name.endsWith(".json") ? name : `${name}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}

function copyJSON(name) {
    const text = GetJSON(name);
    if(text == null){
        UI.Warning.Show("Generator returned invalid format.", "err");
        console.error("Generator returned invalid format.");
        return;
    }
    navigator.clipboard.writeText(text)
        .then(() => {
            UI.Warning.Show("Copied to clipboard!", "success");
            console.log("copied to clipboard");
        })
        .catch(err => console.error("Clipboard error: ", err));
}

function downloadZIP() {
    UI.Warning.Show("Feature currently disabled - Windows detects this as a thread.", "warn", true);
    /*const zip = new JSZip();
    const namespace = prompt("Enter name (namespace) for your datapack");
    const dataFolder = zip.folder("data");
    const namespaceFolder = dataFolder.folder(namespace);
    const recipesFolder = namespaceFolder.folder("recipes");

    files.forEach(f => {
        const jsonText = GetJSON(f.name);
        if(jsonText == null){
            console.error("Generator returned invalid format.");
            return;
        }
        if (f.name === "mcmeta") {
            zip.file("pack.mcmeta", jsonText);
        } else {
            const fileName = f.name.endsWith(".json") ? f.name : `${f.name}.json`;
            recipesFolder.file(fileName, jsonText);
        }
    });

    zip.generateAsync({ type: "blob" }).then(content => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "datapack.zip";
        link.click();
        URL.revokeObjectURL(link.href);
    });*/
}
