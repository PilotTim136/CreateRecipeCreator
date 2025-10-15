function GetJSON(name){
    const f = files.find(file => file.name === name);
    if(!f) return;
    const c = GetCombined("create", ver, "6.0.6");
    console.log(`using generator "${c}"`);
    if(qGenerator[c]) qGenerator[c]();
    else return JSON.stringify(JSONify(name), null, 4);
}

function downloadJSON(name) {
    const text = GetJSON(name);
    const blob = new Blob([text], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name.endsWith(".json") ? name : `${name}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}

function copyJSON(name) {
    const text = GetJSON(name);
    navigator.clipboard.writeText(text)
        .then(() => alert("Copied!"))
        .catch(err => console.error("Clipboard error: ", err));
}

function downloadZIP() {
    const zip = new JSZip();
    const namespace = prompt("Enter name (namespace) for your datapack");
    const dataFolder = zip.folder("data");
    const namespaceFolder = dataFolder.folder(namespace);
    const recipesFolder = namespaceFolder.folder("recipes");

    files.forEach(f => {
        const jsonText = GetJSON(f.name);
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
    });
}
