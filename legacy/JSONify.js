//LEGACY!
//this will remain, as a standpoint if something goes horribly wrong in the newer generators.

/**
 * @deprecated Please use `qGenerator.<ver>() instead!`
 */
function JSONify(file){
    console.warn("used deprecated 'JSONify()' command!");
    const cnt = cud.content || {};
    cnt.heatReq = cnt.heatReq || "none";
    
    let base = {};
    if(file === "mcmeta"){
        let format = 0;
        if(ver === "1.20.1") format = 15;
        else if(ver === "1.21.1") format = 48;
        base = {
            pack: {
                pack_format: format,
                description: cnt.description || "A datapack created with Create Recipe Creator!"
            }
        };
        return base;
    }

    let ingredients = [];
    if(cnt.ingredients)
    cnt.ingredients.forEach(ing => {
        let num = Number(ing.count);
        if(!ing.isFluid){
            for(let i = 0; i < (ing.count || 1); i++){
                ingredients.push({item: ing.item || "minecraft:stone"});
            }
        }else{
            if(num < 1 || num > 1000 || !num) num = 500;
            ingredients.push({...(ver === "1.21.1" ? {type: "fluid_stack"} : {}),
            fluid: ing.item || "minecraft:water", amount: num});
        }
    });

    let results = [];
    if(cnt.results)
    cnt.results.forEach(ing => {
        let num = Number(ing.count);
        let cha = Number(ing.chance);
        if(!ing.isFluid){
            if(num < 1 || num > 64) num = 1;
            results.push({...(ver === "1.21.1" ? {id: ing.item || "minecraft:stone"} : {item: ing.item || "minecraft:stone"})
                , count: num,
                ...(cha && cha > 0 && cha < 100 ? { chance: (cha / 100) } : {})
            });
        }else{
            if(num < 1 || num > 1000 || !num) num = 500;
            results.push({...(ver === "1.21.1" ? {id: ing.item || "minecraft:water"} : {fluid: ing.item || "minecraft:water"}) || "minecraft:water", amount: num});
        }
    });


    let numprcst = Number(cnt.processingTime);
    base = {
        type: "create:" + (cnt.type || "compacting"),
        ...(cnt.heatReq !== "none" ? (ver === "1.21.1" ? { heat_requirement: cnt.heatReq } : { heatRequirement: cnt.heatReq }) : {}),
        "ingredients": ingredients,
        "results": results,
        ...(numprcst > 19 ? { processingTime: numprcst } : {})
    }
    return base;
}

function GetJSON(name){
    const f = files.find(file => file.name === name);
    if(!f) return;
    if(ver === "1.20.1")
        return generator.create.v1_20_1.v6_0_6();
    else if(ver === "1.21.1")
        return generator.create.v1_21_1.v6_0_6();
    else
        return JSON.stringify(JSONify(name), null, 4);
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
