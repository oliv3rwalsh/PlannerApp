assignments = []
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var daterange = {
    start: new Date(),
    end: new Date()
};

function generatedaterange(){
    const today = new Date();
    // start
    var sunday = new Date();
    sunday.setHours(0);
    sunday.setMinutes(0);
    sunday.setSeconds(0);
    sunday.setDate(sunday.getDate() - today.getDay());
    daterange.start = sunday;
    // end
    var saturday = new Date(sunday);
    saturday.setDate(saturday.getDate() + 6);
    saturday.setHours(23);
    saturday.setMinutes(59);
    saturday.setSeconds(59);
    daterange.end = saturday;
}

function constructelement(type, className, id=""){
    var n = document.createElement(type);
    n.className = className;
    n.id = id;
    return(n);
}

function constructp(text, className="", id=""){
    n = constructelement("p", className, id);
    n.innerHTML = text;
    return(n);
}

function leftclicked(){
    temp = new Date(daterange.start);
    temp.setDate(temp.getDate() - 7);

    temp2 = new Date(daterange.end);
    temp2.setDate(temp2.getDate() - 7);
    
    daterange.start = temp;
    daterange.end = temp2;

    buildbody()
}

function rightclicked(){
    temp = new Date(daterange.start);
    temp.setDate(temp.getDate() + 7);

    temp2 = new Date(daterange.end);
    temp2.setDate(temp2.getDate() + 7);
    
    daterange.start = temp;
    daterange.end = temp2;

    buildbody()
}

function buildbody(){
    var extcontentbox = document.querySelector("#content-box");
    // clear
    while (extcontentbox.hasChildNodes()) {
        extcontentbox.removeChild(extcontentbox.lastChild);
    }
    // create left arrow
    lacontainer = constructelement("div", "arrow-container left");
    laicon = constructelement("i", "fa-solid fa-chevron-left", "left-arrow")
    laicon.addEventListener("click", leftclicked);
    lacontainer.appendChild(laicon);
    // create right arrow
    racontainer = constructelement("div", "arrow-container right", "right-arrow");
    raicon = constructelement("i", "fa-solid fa-chevron-right")
    raicon.addEventListener("click", rightclicked);
    racontainer.appendChild(raicon);
    // send to container
    extcontentbox.appendChild(lacontainer);
    i = 0;
    while(i < 7){
        current = new Date(daterange.start);
        current.setDate(current.getDate() + i);
        datetext = months[current.getMonth()] + " " + current.getDate().toString();
        today = new Date()
        // create elements
        if(current.getDate() == today.getDate() && current.getMonth() == today.getMonth()){
            columncontainer = constructelement("div", "content current", "generated-col-" + days[i].toLowerCase());
        } else {
            columncontainer = constructelement("div", "content", "generated-col-" + days[i].toLowerCase());
        }
        headercontainer = constructelement("div", "content-header");
        headertext = constructp(days[i]+"   <span class=\"date\">" + datetext + "</span>");
        assignmentcontainer = constructelement("div", "content-container", "content-" + days[i].toLowerCase());
        addbutton = constructelement("div", "add-new-btn", "add-" + days[i].toLowerCase())
        buttonicon = constructelement("i", "fa-regular fa-calendar-plus")
        buttontext = constructp("Add New")
        // build header
        headercontainer.appendChild(headertext);
        // build button
        addbutton.appendChild(buttonicon)
        addbutton.appendChild(buttontext)
        // build column
        columncontainer.appendChild(headercontainer);
        columncontainer.appendChild(assignmentcontainer);
        columncontainer.appendChild(addbutton);
        // send to container
        extcontentbox.appendChild(columncontainer);
        // iterate
        i++;
    }
    // send to container
    extcontentbox.appendChild(racontainer);
    readin("http://localhost:8000/OneDrive/Documents/PlannerApp/assignments.csv");
}

function processassignment(c, dsc, d){
    dd = new Date(d)
    dd.setSeconds(dd.getSeconds() + 1);
    const newassignment = {
        class: c.toUpperCase(),
        description: dsc,
        duedate: dd
    };
    assignments.push(newassignment);
}

function displayassignment(a, i){
    container = constructelement("div", "assignment")
    body = constructp("<span class =\"class-name\">" + a.class + "</span> " + a.description, "", "generated-assignment-" + i)
    container.appendChild(body);
    destination = "#content-" + days[a.duedate.getDay()].toLowerCase();
    document.querySelector(destination).appendChild(container);
}

function filterassignments(){
    i = 0;
    while(i < assignments.length){
        assignment = assignments[i];
        if(assignment.duedate > daterange.start && assignment.duedate < daterange.end){
            displayassignment(assignment, i);
        }
        i++;
    }
}

function parse(t){
    assignments = [];
    const assns = t.split("\n")
    i = 0
    while(i < assns.length-1){
        const comps = assns[i].split(",")
        processassignment(comps[0], comps[1], comps[2]);
        i++
    }
    filterassignments();
}

function readin(path){
    fetch(path)
  .then((res) => res.text())
  .then((text) => {
    parse(text);
   })
  .catch((e) => console.error(e));
}

function reset(){
    generatedaterange();
    buildbody();
}
function openmenu(){
    document.querySelector("#menu-box").className = "";
}
function close(){
    document.querySelector("#menu-box").className = "hidden";
}

window.onload=function(){
    generatedaterange();
    buildbody();
    document.querySelector("#menu").addEventListener("click", openmenu);
    document.querySelector("#today-button").addEventListener("click", reset);
    document.querySelector("#close-button").addEventListener("click", close);
}