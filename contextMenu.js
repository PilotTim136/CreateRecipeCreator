const contextMenu = document.getElementById("contextMenu");
let currentFile = null;

fileDiv.addEventListener("contextmenu", e => {
    e.preventDefault();

    if (e.target.tagName === "BUTTON") {
        currentFile = e.target.textContent;
        showContextMenu(e.pageX, e.pageY);
    }
});

document.addEventListener("click", e => {
    if (!contextMenu.contains(e.target)) hideContextMenu();
});

function showContextMenu(x, y) {
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = "flex";
}
function hideContextMenu() {
    contextMenu.style.display = "none";
}

document.getElementById("deleteFile").addEventListener("click", () => {
    if (!currentFile) return;
    deleteFile(currentFile);
    hideContextMenu();
});

function deleteFile(name) {
    const index = files.findIndex(f => f.name === name);
    if (index !== -1) {
        files.splice(index, 1);
        refreshFileTree();
        saveAll();
        console.log("Deleted file: ", name);
    }
}
