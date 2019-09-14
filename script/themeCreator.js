class UI{
    constructor(){
        this.controller = document.querySelector(".controller");
        this.panel = document.querySelector(".panel");
        this.demo = document.querySelector(".demo");
        this.rightside = document.querySelector(".rightside");
        this.layersList = document.querySelector(".layers-list");
        this.layersControl = document.querySelector(".layers-control");
        this.properties = document.querySelector(".properties");
        this.properties.style.display = 'none';
        this.propertiesNotification = document.querySelector(".properties-notification");
        this.sectionId = document.getElementById("sectionId");
        this.sectionClass = document.getElementById("sectionClass");
        this.maxWidgetNumber = document.getElementById("maxWidgetNumber");
        this.selectBox = document.getElementById("select_box");
        this.sectionOption = document.querySelector(".sectionOption");
        this.temp_msg;
        this.securityCode = randomCharacter(10);
    }

    submitProperties(){
        const idValue = this.sectionId.value;
        const classValue = this.sectionClass.value;
        const maxWidgetNumberValue = this.maxWidgetNumber.value;
        const selectBoxValue = this.selectBox.options[this.selectBox.selectedIndex].value;
        const self = this;
        var message;

        if(idValue==='' || idValue < 0){
            message = "Actually, section id is necessary.";
        }else if(classValue==='' || classValue < 0){
            message = "Actually, section class is necessary.";
        }else if(maxWidgetNumberValue==='' || maxWidgetNumberValue < 0){
            message = "Don't Necessary";
        }else if(selectBoxValue==="0"){
            message = "Yes or No, choose one.";
        }else if(!uniqueIDcontrol(idValue)){
            message = "ID must be unique";
        }else{
            message = "All added.";
            var obj = new Section(idValue, classValue, maxWidgetNumberValue, selectBoxValue);
            sections.push(obj);
            this.addSection(self, sections);
            this.addOption(self, sections);
        }
        this.addNotification(self, message);
    }

    showAddProperties(){
        this.properties.style.display = 'block';
    }

    addNotification(self, message){
        var notification = document.createElement('div');
        notification.className = "showNotification";
        console.log(this.temp_msg);
        if(self.propertiesNotification.children.length === 0 || this.temp_msg !== message)
            self.propertiesNotification.appendChild(notification);
        notification.innerHTML = message;
        this.temp_msg = message;
        setTimeout(function(){
            notification.remove("showNotification");
        },10000);
    }

    showSectionProperties(self, id, iconId){
        var index;
        var sectionOptionID = id;
        var sectionOption = document.getElementById(sectionOptionID);
        var iconState = document.getElementById(iconId);
        if(sectionOption.style.display === 'block'){
            sectionOption.style.display = 'none';
            iconState.style.backgroundImage = 'url(images/open-arrow.png)';
            iconState.style.opacity = 0.5;
        }else{
            for(var i=0;i<sections.length;i++){
                var tempId = sections[i].idName + this.securityCode + "-option";
                var tempIconId = sections[i].idName + this.securityCode + "-icon"; 
                if(id != tempId){
                    document.getElementById(tempId).style.display = 'none';
                    document.getElementById(tempIconId).style.backgroundImage = 'url(images/open-arrow.png)';
                    document.getElementById(tempIconId).style.opacity = 0.5;
                    continue;
                }
                iconState.style.backgroundImage = 'url(images/close-arrow.png)';
                iconState.style.opacity = 1;
                sectionOption.style.display = 'block';
                index = i;
            }
        }
        this.layersList.options[index].selected = 'selected';
    }
    
    addSection(self, sections){
        var sectionArea = document.createElement('div');
        var sectionOption = document.createElement('div');
        var sectionHeader = document.createElement('div');
        var iconImage = document.createElement('span');
        sectionArea.className = "sectionArea";
        sectionHeader.className = "sectionHeader";
        iconImage.className = "iconImage";
        sectionOption.className = "sectionOption";
        sectionArea.id = sections[sections.length - 1].idName + this.securityCode;
        sectionOption.id = sections[sections.length - 1].idName + this.securityCode + "-option";
        iconImage.id = sections[sections.length - 1].idName + this.securityCode + "-icon";
        var id = sections[sections.length - 1].idName + this.securityCode + "-option";
        var iconId = iconImage.id;
        sectionOption.style.display = 'none';
        sectionHeader.addEventListener("click", function(){
            self.showSectionProperties(self, id, iconId);
        });
        self.demo.appendChild(sectionArea);
        sectionArea.appendChild(sectionHeader);
        sectionHeader.appendChild(iconImage);
        iconImage.innerHTML += sections[sections.length - 1].idName;
        sectionArea.appendChild(sectionOption); 
    }

    addOption(self, sections){
        var optionArea = document.createElement('option');
        self.layersList.appendChild(optionArea);
        optionArea.innerHTML = sections[sections.length - 1].idName;
    }

    deleteSection(){
        sections.splice(this.layersList.selectedIndex, 1);
        var selectedDivName = this.layersList.options[this.layersList.selectedIndex].text + this.securityCode;
        var sectionIDdiv = document.getElementById(selectedDivName);
        this.demo.removeChild(sectionIDdiv);
        this.layersList.remove(this.layersList.selectedIndex);
    }

    upSection(){
        var tempOption = this.layersList.options[this.layersList.selectedIndex].text;
        this.layersList.options[this.layersList.selectedIndex].text = this.layersList.options[this.layersList.selectedIndex-1].text;
        this.layersList.options[this.layersList.selectedIndex-1].text = tempOption;

        var tempElement = sections[this.layersList.selectedIndex];
        sections[this.layersList.selectedIndex] = sections[this.layersList.selectedIndex-1];
        sections[this.layersList.selectedIndex-1] = tempElement;

        var beforeSelectedDivName = this.layersList.options[this.layersList.selectedIndex-1].text + this.securityCode;
        var selectedDivName = this.layersList.options[this.layersList.selectedIndex].text + this.securityCode;
        var beforeSectionIDdiv = document.getElementById(beforeSelectedDivName);
        var sectionIDdiv = document.getElementById(selectedDivName);
        var parentSectionDiv = sectionIDdiv.parentNode;
        parentSectionDiv.insertBefore(beforeSectionIDdiv, sectionIDdiv);

        this.layersList.options[this.layersList.selectedIndex-1].selected = 'selected';        
    }

    downSection(){
        var tempOption = this.layersList.options[this.layersList.selectedIndex].text;
        this.layersList.options[this.layersList.selectedIndex].text = this.layersList.options[this.layersList.selectedIndex+1].text;
        this.layersList.options[this.layersList.selectedIndex+1].text = tempOption;

        var tempElement = sections[this.layersList.selectedIndex];
        sections[this.layersList.selectedIndex] = sections[this.layersList.selectedIndex+1];
        sections[this.layersList.selectedIndex+1] = tempElement;

        var afterSelectedDivName = this.layersList.options[this.layersList.selectedIndex+1].text + this.securityCode;
        var selectedDivName = this.layersList.options[this.layersList.selectedIndex].text + this.securityCode;
        var afterSectionIDdiv = document.getElementById(afterSelectedDivName);
        var sectionIDdiv = document.getElementById(selectedDivName);
        var parentSectionDiv = sectionIDdiv.parentNode;
        parentSectionDiv.insertBefore(sectionIDdiv, afterSectionIDdiv);

        this.layersList.options[this.layersList.selectedIndex+1].selected = 'selected'; 
    }
    
    closeProperties(){
        this.properties.style.display = 'none';
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function eventListener(){
    const layers = document.querySelector(".layers");
    const properties = document.querySelector(".properties");
    const showAddLayer = document.getElementById("add-layer");
    const deleteLayer = document.getElementById("delete-layer");
    const upLayer = document.getElementById("up-layer");
    const downLayer = document.getElementById("down-layer");
    const closeProperties = document.querySelector(".exitButton");

    const ui = new UI();

    layers.addEventListener("click", function(event){
        event.preventDefault();
        //ui.submit_layers();
    });

    properties.addEventListener("submit", function(event) {
        event.preventDefault();
        ui.submitProperties();
    });

    showAddLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.showAddProperties();
    });

    deleteLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.deleteSection();
    });

    upLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.upSection();
    });

    downLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.downSection();
    });

    closeProperties.addEventListener("click", function(event){
        event.preventDefault();
        ui.closeProperties();
    });
}

document.addEventListener('DOMContentLoaded', function(){
    eventListener();
});

var sections = [];

function Section(idName, className, max_widgets, show_add_element){
    this.idName = idName;
    this.className = className;
    this.max_widgets = max_widgets;
    this.show_add_element = show_add_element; 
}

function uniqueIDcontrol(idValue){
    if(sections.length === 0)
        return true;
    for(var i=0;i<sections.length;i++){
        if(sections[i].idName === idValue)
            return false;
    }
    return true;
}

function randomCharacter(len){
    var randomCharacter = "";
    var characters = ['A','a','B','b','C','c',
                      'D','d','E','e','F','f',
                      'G','g','H','h','I','i',
                      'J','j','K','k','L','l',
                      'M','m','N','n','O','o',
                      'P','p','Q','q','R','r',
                      'S','s','T','t','U','u',
                      'V','v','W','w','X','x',
                      'Y','y','Z','z'];

    for(var i=0;i<len;i++){
        var r = Math.floor(Math.random() * characters.length);
        randomCharacter += characters[r];
    }
    return randomCharacter;
}