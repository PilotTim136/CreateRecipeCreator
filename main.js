const mainCreator = {
    version: "1.2",
    func: {
        show: function(){
            const footer = document.createElement("div");
            footer.id = "footer";
            footer.innerHTML = `
                Version: ${mainCreator.version}<br>
                Made by <code>PilotTim136</code><br>
                <a href="changelog.html">Changelog</a><br>
                Github: <a href="https://github.com/PilotTim136/CreateRecipeCreator">CreateRecipeCreator</a>
            `;
            document.body.appendChild(footer);
        }
    }
}

mainCreator.func.show();
