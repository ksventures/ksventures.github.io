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
    console.log(filterControllers(controllerData, filterSettings));
};

function singleControllerCheck(controllerObject, filterObject) {
    var brandMatch = false;
    if (filterObject.controllerBrand.JCI && (controllerObject.Manufacturer == "JCI")) {brandMatch = true};
    if (filterObject.controllerBrand.Distech && (controllerObject.Manufacturer == "Distech")) {brandMatch = true};
    var commMatch = false;
    if (filterObject.controllerComm.BacnetIP && (controllerObject.CommType.includes("BacnetIP"))) {commMatch = true};
    if (filterObject.controllerComm.BacnetMSTP && (controllerObject.CommType.includes("BacnetMSTP"))) {commMatch = true};
    if (filterObject.controllerComm.Lon && (controllerObject.CommType.includes("Lon"))) {commMatch = true};
    if (filterObject.controllerComm.N2 && (controllerObject.CommType.includes("N2"))) {commMatch = true};
    var ioMatch = false;
    var workingAI = filterObject.controllerIO.AICount;
    var workingDI = filterObject.controllerIO.DICount;
    var workingAO = filterObject.controllerIO.AOCount;
    var workingDO = filterObject.controllerIO.DOCount;
    workingAI = workingAI - controllerObject.IO.AICount;
    workingDI = workingDI - controllerObject.IO.DICount;
    workingAO = workingAO - controllerObject.IO.AOCount;
    workingDO = workingDO - controllerObject.IO.DOCount;
    if (workingAI < 0) {workingAI = 0};
    if (workingDI < 0) {workingDI = 0};
    if (workingAO < 0) {workingAO = 0};
    if (workingDO < 0) {workingDO = 0};
    if (((workingAI + workingDI) <= controllerObject.IO.UICount) && ((workingAO + workingDO) <= controllerObject.IO.UOCount)) {ioMatch = true};
    console.log("Controller: " + controllerObject.Model + "   Brand Match: ", brandMatch, "    Comm Match: ", commMatch, "    ioMatch: ", ioMatch);
    if (brandMatch && commMatch && ioMatch) {return true} else {return false};
};

function filterControllers (controllerObject, filterObject) {
    var matchingControllers = [];
    for (i=0; i<controllerObject.length; i++) {
        if (singleControllerCheck(controllerObject[i], filterObject)) {
            matchingControllers.push(controllerObject[i])
        };
    };
    return matchingControllers;
}