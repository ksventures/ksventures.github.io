var filterSettings = {
    "controllerBrand": {
        "JCI" : true,
        "Distech": true,
    },
    "controllerComm": {
        "BacnetIP": true,
        "BacnetMSTP": true,
        "Lon": true,
        "N2": true,
    },
    "controllerIO": {
        "AICount": 0,
        "DICount": 0,
        "AOCount": 0,
        "DOCount": 0,
        "IntegralActuator": false,
        "NetStatCount": 0,
    },
};

function updateFilterSettings() {
    filterSettings.controllerBrand.JCI = document.getElementById("jci").checked;
    filterSettings.controllerBrand.Distech = document.getElementById("distech").checked;
    filterSettings.controllerComm.BacnetIP = document.getElementById("bacnetIp").checked;
    filterSettings.controllerComm.BacnetMSTP = document.getElementById("bacnetMstp").checked;
    filterSettings.controllerComm.Lon = document.getElementById("lon").checked;
    filterSettings.controllerComm.N2 = document.getElementById("n2").checked;
    filterSettings.controllerIO.AICount = document.getElementById("aiCount").value;
    filterSettings.controllerIO.DICount = document.getElementById("diCount").value;
    filterSettings.controllerIO.AOCount = document.getElementById("aoCount").value;
    filterSettings.controllerIO.DOCount = document.getElementById("doCount").value;
    filterSettings.controllerIO.IntegralActuator = document.getElementById("integralActuator").checked;
    filterSettings.controllerIO.NetStatCount = document.getElementById("netStatCount").value;
    console.log(filterSettings);
};