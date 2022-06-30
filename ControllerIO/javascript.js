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
    refreshCards(
        filterControllers(controllerData, filterSettings)
    );
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
    if (filterObject.controllerIO.IntegralActuator && !controllerObject.IO.IntegralActuator) {ioMatch = false};
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

function createControllerCard(controllerObject) {
    var commString = "";
    for (i=0; i<controllerObject.CommType.length; i++) {
        if (i==0) {commString = commString + controllerObject.CommType[i]} else
        {commString = ', ' + controllerObject.CommType[i]}
    }
    var integralActuatorString = ''
    if (controllerObject.IO.IntegralActuator) {
        integralActuatorString = ', Integrated Actuator'
    }
    //There is probably a better way to make these elements, but this worked and didn't require any research
    var controllerCard =
    '<div class="card text-white bg-dark"><div class="card-header"><h3 class="card-title">'
    + controllerObject.Manufacturer
    + ' - '
    + controllerObject.Model
    + '</h3></div><div class="card-body"><p class="card-text">Comm Protocols: '
    + commString
    + '</p><p class="card-text">Inputs: x'
    + controllerObject.IO.AICount
    + ' AI, x'
    + controllerObject.IO.DICount
    + ' DI, x'
    + controllerObject.IO.UICount
    + ' UI, x'
    + controllerObject.IO.netStatCount
    + ' Networked Thermostats</p><p class="card-text">Outputs: x'
    + controllerObject.IO.AOCount
    + ' AO, x'
    + controllerObject.IO.DOCount
    + ' DO, x'
    + controllerObject.IO.UOCount
    + ' UO'
    + integralActuatorString
    + '</p><p class="card-text">List Price: $'
    + controllerObject.PurchasingInfo.ListPrice
    + ', last updated on '
    + controllerObject.PurchasingInfo.LastUpdated
    + '</p></div></div>'
    var controllerElement = new DOMParser().parseFromString(controllerCard, 'text/html').body.childNodes[0];
    return controllerElement;
}

function refreshCards (controllerObject) {
    var cardContainer = document.getElementById("ControllerCards");
    cardContainer.innerHTML = '';
    for (j=0; j<controllerObject.length; j++) {
        cardContainer.append(createControllerCard(controllerObject[j]));
    }
}