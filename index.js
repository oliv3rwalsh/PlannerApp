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
        col = constructelement("div", "content", "generated-col-" + days[i].toLowerCase());
        head = constructelement("div", "content-header");
        type = constructp(days[i]);
        content = constructelement("div", "content-container", "content-" + days[i].toLowerCase());
        btn = constructelement("div", "add-new-btn", "add-" + days[i].toLowerCase())
        cal = constructelement("i", "fa-regular fa-calendar-plus")
        p = constructp("Add New")
        // build header
        head.appendChild(type);
        // build button
        btn.appendChild(cal)
        btn.appendChild(p)
        // build column
        col.appendChild(head);
        col.appendChild(content);
        col.appendChild(btn);
        // send to container
        extcontentbox.appendChild(col);
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