function showModal() {
    $('#myModal').modal('show');
}

const table = [
]

const save = document.querySelector("#save");
// function showModal() {
//     $('#save').click('hide');
// }
save.addEventListener("click", ()=>{
    // alert("Button pressed");
    const addName= [{
        name : "",
        url: "",
        description: ""
    }]
    const videoName =document.querySelector("#videoname").value;
    addName.name = videoName;

    const videoUrl =document.querySelector("#videourl").value;
    addName.url = videoUrl;

    const videoDescription =document.querySelector("#videodescription").value;
    addName.description = videoDescription;

    table.push(addName);
    window.addEventListener("load", generateTable(addName));

});

// createElement("tr") -> creates <tr></tr>
function generateTable(addName){
    const tbody = document.querySelector(".add-to-table");
    //reseting the table value so that we weont se repeated values again and again
    tbody.innerHTML= "";

    table.forEach( (course) =>{
        //creating tr tag  <tr></tr>
        const tr = document.createElement("tr");
        // tr.setAttribute("onclick", "print()");
        //creating td tag <td></td>
        const td = document.createElement("td");
        td.classList.add("table-data");
        td.setAttribute("onclick", "print()");
        /*appending td to tr => 
        <tr>
        <td> </td>
        </tr>*/
        tr.appendChild(td);

        //creating node element <tr><td>course.name </td></tr>
        const name = document.createTextNode(course.name);
        td.appendChild(name);
        /*creating tbody
        <tbody class="add-to-table">
        <tr> 
          <td>name</td>
        </tr    >
      </tbody>*/
        tbody.appendChild(tr);
    });
}


//Embed url
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}
function changeDescription(myDesc){
    // alert(myDesc);
    document.querySelector("h2").innerHTML = myDesc;
    // document.setAttribute("h2", myDesc);
}   
function changeName(myName){
    // alert(myName);
    document.querySelector("p").innerHTML = myName;
    // document.setAttribute("p", myName);
}
function replaceVideoUrl(myId){
    // alert(`Id is ${myId}`);  
    // $('#myId').html(myId);
    document.querySelector("#myId").src = "//www.youtube.com/embed/" +myId;

}


function searchname(nameKey, myArray){
    // alert(`nameKey is ${nameKey}`);
    for (var i=0; i < myArray.length; i++) 
    {
        // alert("Inside for loop");
        if (myArray[i].name === nameKey) {
            // alert(myArray[i].url);
            var myDesc = myArray[i].description;
            var myName = myArray[i].name; 
            var myId = getId(myArray[i].url);
            // alert(`Id: ${myId}, Name: ${myName}, Description : ${myDesc}`);
            replaceVideoUrl(myId);
            changeDescription(myDesc);
            changeName(myName);
        }
    }
}

function print() {
    var tab = document.getElementById("tableId");
    var rows = tab.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = tab.rows[i];
        var createClickHandler = 
            function(row) 
            {
                return function() { 
                                        var cell = row.getElementsByTagName("td")[0];
                                        var id = cell.innerHTML;
                                        // alert("Name :" + id);
                                        searchname(id, table);
                                    
                                 };
            };
        currentRow.onclick = createClickHandler(currentRow);
    }
}

window.onload = print();
// generateTable()
