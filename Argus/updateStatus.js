const apiServerBaseUrl = "http://192.168.0.248:5000";

let vidGrid = document.getElementById("videoGrid")
let threatsGridList = document.getElementById("alertsList")

console.log("Argus");

function getSystemTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}

function updateStatus() {
    fetch(apiServerBaseUrl + "/getAlertStatus").then((response) => response.json()).then((responseData) => {
        if (responseData["status"] == "fire") {
            addAlert(`Fire Alert from CAM 0 at ${getSystemTime()}`);
            vidGrid.style.display = "block";
        } else if (responseData["status"] == "crime") {
            addAlert(`Crime Alert from CAM 0 at ${getSystemTime()}`);
            vidGrid.style.display = "block";
        } else if (responseData["status"] == "chaos") {
            addAlert(`Chaos Alert from CAM 0 at ${getSystemTime()}`);
            vidGrid.style.display = "block";
        } else {
            vidGrid.style.display = "none";
        }
    });
}

setInterval(updateStatus, 500);
updateStatus();