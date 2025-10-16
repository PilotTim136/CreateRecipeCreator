generator.create.v1_21_1 = {
    v6_0_6: function() {
        const file = currentFile;
        const cnt = cud.content || {};
        cnt.heatReq = cnt.heatReq || "none";
        
        let base = {};
        if(file === "mcmeta"){
            let format = 48;
            base = {
                pack: {
                    pack_format: format,
                    description: cnt.description || "A datapack created with Create Recipe Creator!"
                }
            };
            return JSON.stringify(base, null, 4);
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
                ingredients.push({type: "fluid_stack", fluid: ing.item || "minecraft:water", amount: num});
            }
        });

        let results = [];
        if(cnt.results)
        cnt.results.forEach(ing => {
            let num = Number(ing.count);
            let cha = Number(ing.chance);
            num = ing.isFluid ? (num > 1000 || num < 1 ? 1000 : num) : (num > 64 || num < 1 ? 1 : num);
            results.push({
                ...(ing.isFluid ? {type: "fluid_stack"} : {}),
                id: (ing.item || (ing.isFluid ? "minecraft:water" : "minecraft:stone")),
                ...(ing.isFluid ? {amount: num} : {count: num}),
                ...(cha && cha > 0 && cha < 100 ? {chance: (cha / 100)} : {})
            });
            //just commented in case something happens
            /*if(!ing.isFluid){
                if(num < 1 || num > 64) num = 1;
                results.push({id: ing.item || "minecraft:stone", count: num,
                    ...(cha && cha > 0 && cha < 100 ? {chance: (cha / 100)} : {})
                });
            }else{
                if(num < 1 || num > 1000 || !num) num = 500;
                results.push({id: ing.item || "minecraft:water", amount: num});
            }*/
        });

        let numprcst = Number(cnt.processingTime);
        base = {
            type: "create:" + (cnt.type || "compacting"),
            ...(cnt.heatReq !== "none" ? { heat_requirement: cnt.heatReq } : {}),
            "ingredients": ingredients,
            "results": results,
            ...(numprcst > 19 ? { processingTime: numprcst } : {})
        }
        return JSON.stringify(base, null, 4);
    }
};

qGenerator["create-1_21_1-6_0_6"] = generator.create.v1_21_1.v6_0_6;
