class UI{
    constructor(){
        this.controller = document.querySelector(".controller");
        this.panel = document.querySelector(".panel");
        this.demo = document.querySelector(".demo");
        this.rightside = document.querySelector(".rightside");
        this.layersList = document.querySelector(".layers-list");
        this.layersControl = document.querySelector(".layers-control");
        this.properties = document.querySelector(".properties");
        this.propertiesNotification = document.querySelector(".properties-notification");
        this.sectionId = document.getElementById("sectionId");
        this.sectionClass = document.getElementById("sectionClass");
        this.maxWidgetNumber = document.getElementById("maxWidgetNumber");
        this.selectBox = document.getElementById("select_box");
        this.temp_msg;
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

    addSection(self, sections){
        var sectionArea = document.createElement('div');        
        sectionArea.className = "sectionArea";
        self.demo.appendChild(sectionArea);
        sectionArea.innerHTML = sections[sections.length - 1].idName;
    }

    addOption(self, sections){
        var optionArea = document.createElement('option');
        self.layersList.appendChild(optionArea);
        optionArea.innerHTML = sections[sections.length - 1].idName;
    }

    deleteSection(self, sections){
        
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function eventListener(){
    const layers = document.querySelector(".layers");
    const properties = document.querySelector(".properties"); 

    const ui = new UI();

    layers.addEventListener("click", function(event){
        event.preventDefault();
        //ui.submit_layers();
    });

    properties.addEventListener("submit", function(event) {
        event.preventDefault();
        ui.submitProperties();
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

function get_section(){
    var sectionObj = new Section(ui.sectionId, ui.sectionClass, ui.maxWidgetNumber, ui.selectBox); 
    sections.push(sectionObj);
}

function create_section_on_demo(){

}

function add_list_section(){

}



