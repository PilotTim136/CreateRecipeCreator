generator.create.v1_21_1 = {
    v6_0_10: function() {
        const file = currentFile;
        const cnt = cud.content || {};
        cnt.heatReq = cnt.heatReq || "none";

        let base = {};

        if (file === "mcmeta") {
            return JSON.stringify({
                pack: {
                    pack_format: 48,
                    description: cnt.description || "A datapack created with Create Recipe Creator!"
                }
            }, null, 4);
        }

        let ingredients = [];

        if (Array.isArray(cnt.ingredients)) {
            for (const ing of cnt.ingredients) {
                if (!ing) continue;

                const isFluid = !!ing.isFluid;

                if (isFluid) {
                    let amount = Number(ing.count);
                    if (!Number.isFinite(amount) || amount < 1) amount = 500;
                    if (amount > 1000) amount = 1000;

                    ingredients.push({
                        type: "fluid_stack",
                        fluid: ing.item || "minecraft:water",
                        amount
                    });

                } else {
                    let count = Math.floor(Number(ing.count));
                    if (!Number.isFinite(count) || count < 1) count = 1;
                    if (count > 64) count = 64;

                    for (let i = 0; i < count; i++) {
                        ingredients.push({
                            item: ing.item || "minecraft:stone"
                        });
                    }
                }
            }
        }

        let results = [];

        if (Array.isArray(cnt.results)) {
            for (const ing of cnt.results) {
                if (!ing) continue;

                const isFluid = !!ing.isFluid;

                let count = Number(ing.count);
                let chance = Number(ing.chance);

                if (isFluid) {
                    if (!Number.isFinite(count) || count < 1) count = 1000;
                    if (count > 1000) count = 1000;
                } else {
                    if (!Number.isFinite(count) || count < 1) count = 1;
                    if (count > 64) count = 64;
                }

                const result = {
                    ...(isFluid ? { type: "fluid_stack" } : {}),
                    id: ing.item || (isFluid ? "minecraft:water" : "minecraft:stone"),
                    ...(isFluid ? { amount: count } : { count })
                };

                if (Number.isFinite(chance) && chance > 0 && chance < 100) {
                    result.chance = chance / 100;
                }

                results.push(result);
            }
        }

        const processingTime = Number(cnt.processingTime);

        base = {
            type: "create:" + (cnt.type || "compacting"),
            ...(cnt.heatReq !== "none" ? { heat_requirement: cnt.heatReq } : {}),
            ingredients,
            results,
            ...(Number.isFinite(processingTime) && processingTime > 19 ? { processingTime } : {})
        };

        return JSON.stringify(base, null, 4);
    }
};

qGenerator["create-1_21_1-6_0_10"] = generator.create.v1_21_1.v6_0_10;
