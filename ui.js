const workspace = document.getElementById("workspace");
const editor = document.getElementById("editor");
let isMeta = false;
let cud = null; //currentUIData

function ClearWorkspace(){
    editor.innerHTML = "";
}

function DoMetaUI(j){
    isMeta = true;
    cud = j;
    const description = j.content?.description || "";
    editor.innerHTML = `<code><center><h1>mcmeta</h1>This is the metadata file for your datapack.<br>
                    This is needed for minecraft to recognize your datapack.<br>
                    <button onclick="copyJSON('mcmeta')">Copy JSON</button>
                    <button onclick="downloadJSON('mcmeta')">Save JSON</button>
                    <button onclick="downloadZIP()">Save ZIP</button></center></code>
                    
                    Version: <select id="ver" name="options" onchange="SetFileData('pack_format', this.value)">
                        <option value="1.20.1">1.20.1 - Create 6.0.6</option>
                        <option value="1.21.1">1.21.1 - Create 6.0.6</option>
                    </select><br>
                    Description: <textarea id="desc" onchange="SetFileData('description', this.value)" rows="1" cols="46"
                    placeholder="A datapack created with Create Recipe Creator!">${description}</textarea><br>`;
    LoadFileData(j);
}

function DoUI(j){
    isMeta = false;
    cud = j;
    const ctn = j.content || {};
    const typeValue = j.content?.type || "compacting";
    editor.innerHTML = `<code><center><h1>${j.name}</h1><button onclick="copyJSON('${j.name}')">Copy JSON</button>
    <button onclick="downloadJSON('${j.name}')">Save JSON</button><br></center></code>
    Type: <select id="type" onchange="SetFileData('type', this.value)">
        <option value="compacting" ${typeValue === "compacting" ? "selected" : ""}>Compacting</option>
        <option value="crushing" ${typeValue === "crushing" ? "selected" : ""}>Crushing</option>
        <option value="deploying" ${typeValue === "deploying" ? "selected" : ""}>Deploying</option>
        <option value="emptying" ${typeValue === "emptying" ? "selected" : ""}>Emptying</option>
        <option value="filling" ${typeValue === "filling" ? "selected" : ""}>Filling</option>
        <option value="haunting" ${typeValue === "haunting" ? "selected" : ""}>Haunting</option>
        <option value="milling" ${typeValue === "milling" ? "selected" : ""}>Milling</option>
        <option value="mixing" ${typeValue === "mixing" ? "selected" : ""}>Mixing</option>
        <option value="pressing" ${typeValue === "pressing" ? "selected" : ""}>Pressing</option>
        <option value="sandpaper_polishing" ${typeValue === "sandpaper_polishing" ? "selected" : ""}>Sandpaper polishing</option>
        <option value="splashing" ${typeValue === "splashing" ? "selected" : ""}>Splashing</option>
    </select><br>`
    saveAll();
    const totalblacklist = typeValue === "deploying" || typeValue === "emptying"
        || typeValue === "filling" || typeValue === "haunting" || typeValue === "milling" || typeValue === "pressing"
        || typeValue === "sandpaper_polishing" || typeValue === "splashing";

    if(typeValue === "mixing" || typeValue === "compacting"){
        const heat = j.content?.heatReq || "none";
        editor.innerHTML += `Heat requirement: <select id="heatReq" onchange="SetFileData('heatReq', this.value)">
            <option value="none" ${heat === "none" ? "selected" : ""}>None</option>
            <option value="heated" ${heat === "heated" ? "selected" : ""}>Heated</option>
            <option value="superheated" ${heat === "superheated" ? "selected" : ""}>Superheated</option>
        </select><br>`;
    }
    if(!totalblacklist) displayIngredients();

    if(!totalblacklist) displayResults();
    else if(typeValue === "deploying"){
        SpawnForcedIng(2, ctn, ["Item to deploy on", "Item that gets deployed"]);
        editor.innerHTML += `Keep held item: <input type="checkbox" ${ctn?.keepHeld ? "checked" : ""} onchange="SetFileData('keepHeld', this.checked)"><br>`;
        SpawnForcedRes(1, ctn);
    }else if(typeValue === "emptying"){
        SpawnForcedIng(1, ctn, ["Item to empty (e.g. minecraft:water_bucket)"]);
        SpawnForcedRes(2, ctn, ["Item result (minecraft:bucket)", "Result as fluid (e.g. minecraft:water)"], [false, false]);
    }else if(typeValue === "filling"){
        SpawnForcedIng(2, ctn, ["Item to fill (e.g. minecraft:bucket)", "Fluid to fill with (e.g. minecraft:water)"]);
        SpawnForcedRes(1, ctn, ["When filled (e.g. minecraft:water_bucket)"]);
    }else if(typeValue === "haunting" || typeValue === "milling" || typeValue === "splashing"){
        SpawnForcedIng(1, ctn);
        displayResults(true);
    }else if(typeValue === "pressing" || typeValue === "sandpaper_polishing"){
        SpawnForcedIng(1, ctn);
        SpawnForcedRes(1, ctn);
    }

    if(typeValue === "crushing" || typeValue === "milling" || typeValue === "mixing"){
        editor.innerHTML += `Processing time: <input type="number" value="${ctn?.processingTime || 0}" onchange="SetFileData('processingTime', this.value)">ticks<br>`;
    }else{
        SetFileData('processingTime', 0, false);
    }
}

function UIChange(){
    DoUI(cud);
}

function displayIngredients(){
    editor.innerHTML += `<button onclick="AddIngredient()">New ingredient</button><br>`;
    const e = validateIngredient(false);
    if(!e) return;
    if(!cud.content.ingredients) return;
    cud.content.ingredients.forEach((ing, i) => {
        editor.innerHTML += `<fieldset>
        <button onclick="removeIngredient(${i})">Remove</button><br>
        Fluid: <input type="checkbox" ${ing.isFluid ? "checked" : ""} onchange="SetFileData('ingredients.${i}.isFluid', this.checked)"><br>
        Item: <input type="text" value="${ing.item || ""}" onchange="SetFileData('ingredients.${i}.item', this.value)" placeholder="ID"><br>
        Count: <input type="number" min="1" max="1000" value="${ing.count || ""}" onchange="SetFileData('ingredients.${i}.count', this.value)" placeholder="item id"><br>
        </fieldset>`;
    });
}

function displayResults(forceItem = false){
    editor.innerHTML += `<button onclick="AddResult()">New result</button><br>`;
    const e = validateResults(false);
    if(!e) return;
    if(!cud.content.results) return;
    cud.content.results.forEach((ing, i) => {
        editor.innerHTML += `<fieldset>
        <button onclick="removeResult(${i})">Remove</button><br>
        ${GetFluid(forceItem, ing, i)}
        Item: <input type="text" value="${ing.item || ""}" onchange="SetFileData('results.${i}.item', this.value)" placeholder="ID"><br>
        Count: <input type="number" min="1" max="1000" value="${ing.count || 1}" onchange="SetFileData('results.${i}.count', this.value)" placeholder="item id"><br>
        Chance: <input type="number" min="1" max="100" value="${ing.chance || 100}" onchange="SetFileData('results.${i}.chance', this.value)">%<br>
        </fieldset>`;
        if(forceItem) SetFileData(`results.${i}.isFluid`, false, false);
    });
}
