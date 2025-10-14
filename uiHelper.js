function removeIngredient(i){
    validateIngredient();
    cud.content.ingredients.splice(i, 1);
    UIChange();
}
function removeResult(i){
    validateResults();
    cud.content.results.splice(i, 1);
    UIChange();
}

function AddIngredient(){
    validateIngredient();
    cud.content.ingredients.push({item: null, count: 1});
    UIChange();
}
function AddResult(){
    validateResults();
    cud.content.results.push({item: null, count: 1});
    UIChange();
}

function validateResults(change = true){
    if(change){
        cud.content = cud.content || {};
        cud.content.results = cud.content.results || [];
        return cud.content.results;
    }
    return cud.content.ingredients || false;
}
function validateIngredient(change = true){
    if(change){
        cud.content = cud.content || {};
        cud.content.ingredients = cud.content.ingredients || [];
        return cud.content.ingredients;
    }
    return cud.content.ingredients || false;
}

function LoadFileData(j){
    ver = j.content?.pack_format || "1.20.1";
    document.getElementById("ver").value = ver;
    if(isMeta) return;
}

function setNested(path, value) {
    const keys = path.split(".");
    let current = cud;

    for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!current[k] || typeof current[k] !== "object") {
            current[k] = {};
        }
        current = current[k];
    }

    current[keys[keys.length - 1]] = value;
}

function SetFileData(key, value, callUpdate = true){
    cud.content = cud.content || {};
    if(isMeta){
        cud.content["pack_format"] = document.getElementById("ver").value;
        cud.content["description"] = document.getElementById("desc").value;
        ver = document.getElementById("ver").value;
        saveAll();
        return;
    }
    setNested("content." + key, value);
    saveAll();
    if(callUpdate) DoUI(cud);
}

function SpawnForcedIng(amount, ctn, text = []){
    editor.innerHTML += `Ingredients<br>`;
    for(i = 0; i < amount; i++){
        const ing = ctn?.ingredients?.[i] || {};
        editor.innerHTML += `<fieldset>
        ${text[i] ? text[i] + "<br>" : ""}
        Item: <input type="text" value="${ing.item || ""}" onchange="SetFileData('ingredients.${i}.item', this.value)" placeholder="ID"><br>
        Count: <input type="number" min="1" max="1000" value="${ing.count || ""}" onchange="SetFileData('ingredients.${i}.count', this.value)" placeholder="item id"><br>
        </fieldset>`;
    }
}

function SpawnForcedRes(amount, ctn, text = [], hasChance = []){
    editor.innerHTML += `Results<br>`;
    for(i = 0; i < amount; i++){
        const ing = ctn?.ingredients?.[i] || {};
        editor.innerHTML += `<fieldset>
        ${text[i] ? text[i] + "<br>" : ""}
        Item: <input type="text" value="${ing.item || ""}" onchange="SetFileData('results.${i}.item', this.value)" placeholder="ID"><br>
        Count: <input type="number" min="1" max="1000" value="${ing.count || 1}" onchange="SetFileData('results.${i}.count', this.value)" placeholder="item id"><br>
        ${hasChance[i] !== false ? `Chance: <input type="number" min="1" max="100" value="${ing.chance || 100}"
            onchange="SetFileData('results.${i}.chance', this.value)">%<br>` : ""}
        </fieldset>`;
    }
}

function GetFluid(force, ing, i){
    return force ? "" : `Fluid: <input type="checkbox" ${ing.isFluid ? "checked" : ""} onchange="SetFileData('results.${i}.isFluid', this.checked)"><br>`;
}
