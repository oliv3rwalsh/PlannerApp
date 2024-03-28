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

function buildbody(){
    var extcontentbox = document.querySelector("#content-box");
    // clear
    while (extcontentbox.hasChildNodes()) {
        extcontentbox.removeChild(extcontentbox.lastChild);
    }
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    i = 0;
    while(i < 7){
        // create elements
        columncontainer = constructelement("div", "content", "generated-col-" + days[i].toLowerCase());
        headercontainer = constructelement("div", "content-header");
        headertext = constructp(days[i]);
        assignmentcontainer = constructelement("div", "content-container", "content-" + days[i].toLowerCase());
        addbutton = constructelement("div", "add-new-btn", "add-" + days[i].toLowerCase())
        buttonicon = constructelement("i", "fa-regular fa-calendar-plus")
        buttontext = constructp("Add New")
        // build header
        headercontainer.appendChild(headertext);
        // build button
        addbutton.appendChild(buttonicon)
        addbutton.appendChild(buttontext)
        // build columncontainerumn
        columncontainer.appendChild(headercontainer);
        columncontainer.appendChild(assignmentcontainer);
        columncontainer.appendChild(addbutton);
        // send to container
        extcontentbox.appendChild(columncontainer);
        // iterate
        i++;
    }
    readin("http://localhost:8000/OneDrive/Documents/PlannerApp/assignments.csv");
}

function addassignment(c, d, dest, index=0){
    assn = constructelement("div", "assignment")
    bdy = constructp("<span class =\"class-name\">" + c + "</span> " + d, "", "generated-assignment-" + index)
    assn.appendChild(bdy);
    document.querySelector(dest).appendChild(assn);
}

function parse(t){
    const assignments = t.split("\n")
    i = 0
    while(i < assignments.length-1){
        const comps = assignments[i].split(",")
        dest = "#content-"+comps[2].toLowerCase();
        addassignment(comps[0].toUpperCase(), comps[1], dest, i);
        i++
    }
}

function readin(path){
    fetch(path)
  .then((res) => res.text())
  .then((text) => {
    parse(text);
    console.log("read")
   })
  .catch((e) => console.error(e));
}

window.onload=function(){
    buildbody();
}