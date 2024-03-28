// <!-- <div class="add-new-btn">
// <i class="fa-regular fa-calendar-plus"></i>
// <p>Add New</p>
// </div> -->

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

        // column
        var col = document.createElement("div");
        col.className = "content";
        col.id = "generated-col-" + days[i].toLowerCase();

        // header
        var head = document.createElement("div");
        head.className = "content-header";
        var type = document.createElement("p");
        type.innerHTML = days[i];
        head.appendChild(type);

        var content = document.createElement("div");
        content.id = "content-" + days[i].toLowerCase();
        content.className = "content-container";

        // button
        var btn = document.createElement("div");
        btn.className = "add-new-btn"
        btn.id = "add-" + days[i].toLowerCase();
        var cal = document.createElement("i");
        cal.className = "fa-regular fa-calendar-plus";
        var p = document.createElement("p");
        p.innerHTML = "Add New"
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
    var assn = document.createElement("div");
    assn.className = "assignment";
    var bdy = document.createElement("p");
    bdy.innerHTML = "<span class =\"class-name\">" + c + "</span> " + d;
    bdy.id = "generated-assignment-" + index;
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