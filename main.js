const mainCreator = {
    version: "1.3.0",
    inDev: false,
    func: {
        show: function(){
            const footer = document.createElement("div");
            footer.id = "footer";
            footer.innerHTML = `
                Version: ${mainCreator.version}${mainCreator.inDev ? " [DEV]" : ""}<br>
                Made by <code>PilotTim136</code><br>
                <a href="changelog.html">Changelog</a><br>
                Github: <a href="https://github.com/PilotTim136/CreateRecipeCreator">CreateRecipeCreator</a>
            `;
            const uibg = document.createElement("div");
            uibg.id = "_uiBG";
            uibg.hidden = true;
            const ui = document.createElement("div");
            ui.id = "_ui";
            ui.hidden = true;

            document.body.appendChild(uibg);
            document.body.appendChild(ui);
            document.body.appendChild(footer);
        }
    }
}

mainCreator.func.show();

//very important - im very forgetful
if(mainCreator.inDev) console.log("IF NOT DEVELOPING, PLEASE DISABLE `mainCreator.inDev` IN `main.js`!");
else console.log("IF DEVELOPING, PLEASE ENABLE `mainCreator.inDev` IN `main.js`!");
