var generator = generator || {};
generator.create = generator.create || {};

/**
 * Shows manually registered generators here
 * 
 * NOTICE: shortcuts to real generators - IF REGISTERED!
 */
var qGenerator = {};

/**
 * Registers generators - loads them dynamically
 * @param {string} name namespace (minecraft, create, ...)
 * @param {string} mc minecraft version (1.20.1, 1.21.1, ...)
 * @param {string} mod mod version (6.0.6, ...)
 */
function GetCombined(name, mc, mod){
    let mcver = mc.replaceAll(".", "_");
    let modver = mod.replaceAll(".", "_");
    return `${name}-${mcver}-${modver}`;
}

/**
 * Registers generators - loads them dynamically
 * @param {string} name namespace (minecraft, create, ...)
 * @param {string} mc minecraft version (1.20.1, 1.21.1, ...)
 * @param {string} mod mod version (6.0.6, ...)
 */
function RegisterGenerator(name, mc, mod){
    let mcver = mc.replaceAll(".", "_");
    let modver = mod.replaceAll(".", "_");
    let combined = `${name}-${mcver}-${modver}`;
    qGenerator[combined] = undefined;

    const script = document.createElement("script");
    script.src = `Generators/${combined}.js`;
    script.onload = () => {
        console.log(`Loaded generator: "${combined}"!`);
    };
    script.onerror = () => console.error("Failed to load script");
    document.head.appendChild(script);
}

//register generators
RegisterGenerator("create", "1.20.1", "6.0.6");
RegisterGenerator("create", "1.21.1", "6.0.6");
