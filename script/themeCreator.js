class UI{
    constructor(){
        this.controller = document.querySelector(".controller");
        this.panel = document.querySelector(".panel");
        this.demo = document.querySelector(".demo");
        this.rightside = document.querySelector(".rightside");
        this.layer = document.querySelector(".layers");
        this.layersControl = document.querySelector(".layers-control");
        this.properties = document.querySelector(".properties");
        this.sectionId = document.getElementById("sectionId");
        this.sectionClass = document.getElementById("sectionClass");
        this.maxWidgetClass = document.getElementById("maxWidgetClass");
        this.selectBox = document.getElementById("select_box");
    }
}

var sections = [];

function Section(idName, className, max_widgets, show_add_element){
    this.idName = idName;
    this.className = className;
    this.max_widgets = max_widgets;
    this.show_add_element = show_add_element; 
}

function get_section(){
    var idName = document.querySelector("");
}

function create_section_on_demo(){

}

function add_list_section(){

}



