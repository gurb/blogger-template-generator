class UI{
    constructor(){
        this.controller = document.querySelector(".controller");
        this.panel = document.querySelector(".panel");
        this.demo = document.querySelector(".demo");
        this.rightside = document.querySelector(".rightside");
        this.layersList = document.querySelector(".layers-list");
        this.layersControl = document.querySelector(".layers-control");
        this.properties = document.querySelector(".properties");
        this.sectionId = document.getElementById("sectionId");
        this.sectionClass = document.getElementById("sectionClass");
        this.maxWidgetNumber = document.getElementById("maxWidgetNumber");
        this.selectBox = document.getElementById("select_box");
    }

    submit_layers(){
        console.log("is workin?");
    }
}

function eventListener(){
    const layers = document.querySelector(".layers");
    const properties = document.querySelector(".properties"); 

    const ui = new UI();

    layers.addEventListener("click", function(event){
        event.preventDefault();
        ui.submit_layers();
    });

    properties.addEventListener("submit", function(event) {
        event.preventDefault();
        ui.submit_layers();
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

function get_section(){
    var sectionObj = new Section(ui.sectionId, ui.sectionClass, ui.maxWidgetNumber, ui.selectBox); 
    sections.push(sectionObj);
}

function create_section_on_demo(){

}

function add_list_section(){

}



