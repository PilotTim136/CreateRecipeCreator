var UI = {
    bg: document.getElementById("_uiBG"),
    element: document.getElementById("_ui"),
    Interface: {
        ShowElements: function(show = true){
            UI.bg.hidden = !show;
            UI.element.hidden = !show;
        },
        ClearUI: function(){
            UI.element.innerHTML = "";
        },
        Append: function(append){
            UI.element.innerHTML = append;
        }
    },
    Warning: {
        msgHTML: document.getElementById("warningMessages"),
        totalWarnings: 0,
        Styles: {
            Okay: "color: black; background-color: white;",
            Success: "color: white; background-color: green;",
            Warn: "color: white; background-color: orange;",
            Err: "color: white; background-color: red;"
        },
        Internal: {
            wrns: []
        },
        Settings: {
            fade: false
        },
        /**
         * @param {string} text
         * @param {string} type Type for warning-display (ok, success, warn, err)
         * @param {bool} fromLog Please leave it at default - set to true if override is enabled but not logged.
         */
        Show: function(text, type = "ok", fromLog = false){
            if(overrides.overrideLogs && !fromLog){
                if(overrides.logs.warn && type === "warn") return;
                if(overrides.logs.error && (type === "err" || type === "error")) return;
            }

            
            const style = type === "ok" ? this.Styles.Okay :
                type === "success" ? this.Styles.Success :
                type === "warn" ? this.Styles.Warn : this.Styles.Err
            
            const fade = this.Settings.fade;

            const ctn = document.createElement("div");
            ctn.id = `elmt_warn_${this.totalWarnings}`;
            ctn.textContent = text;
            ctn.style = style + `bottom: ${65 * this.Internal.wrns.length}px; ${fade ? "opacity: 0;" : "left: calc(-100% - 20px);"}`;

            this.msgHTML.appendChild(ctn);
            this.totalWarnings++;
            this.Internal.wrns.push(ctn);
            
            ctn.getBoundingClientRect();
            if(fade) ctn.style.opacity = "1";
            else ctn.style.left = `0px`;

            setTimeout(() => {
                if(fade) ctn.style.opacity = "0";
                else ctn.style.left = `calc(-100% - 20px)`;

                setTimeout(() => {
                    if (ctn.parentNode){
                        const idx = this.Internal.wrns.indexOf(ctn);
                        this.Internal.wrns.splice(idx, 1);
                        this.Internal.wrns.forEach((el, i) => {
                            el.style.bottom = `${65 * i}px`;
                        });
                        ctn.remove();
                    }
                }, 500);
            }, 5000);
        }
    }
};

UI.Interface.ShowElements(false);

UI.Interface.NewFile = function(){
    const content = `<center>
    <h3>New File</h3>
    Please enter new Filename:<br>
    <input id="_ui_filename"><br>
    <button onclick="createFile()">Create File</button><br>
    <button onclick="UI.Interface.ShowElements(false)">Cancel</button>
    </center>`;

    this.Append(content);
    this.ShowElements();
}


