// URL we want to scrape from
var begin = 'https://asudir-solr.asu.edu/asudir/directory/select?q=emailAddress:';
var end = '&wt=json';
var email;
// CORS mode is disabled so we have to use a proxy to get the JSON. Here is the proxy we are forwarding our targetURL through
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// Global block & element conter for naming purposes
var OUTPUT_BLOCK_COUNTER = 0;
var OUTPUT_ELEMENT_COUNTER = 0;
//Error Messages
var COULD_NOT_LOCATE_ERROR_1 = "We're sorry, We could not locate an asurite registered to this email address.";
var COULD_NOT_LOCATE_ERROR_2 = "If you believe this is an error please try again later.";
/*

    Clears the Output_Pane root element.
    This div is hardcoded in the HTML

*/
function clearOutputPane(){

    document.getElementById("Output_Pane").innerHTML = "";
    OUTPUT_BLOCK_COUNTER = 0;
    OUTPUT_ELEMENT_COUNTER = 0;

}

/*

    Sets the Output_Pane div to the corresponding elements specified by the user.

*/
async function setOutputPane(){

    //TODO Make method & checkboxes so we can narrow down what info we want to gather from the provided JSON
    // Gather Info
    var fullName = await getFullName_With_Proxy();
    var asuriteid = await getAsuriteId_With_Proxy();

    // Clear current output pane
    clearOutputPane(); 

    //Set new output pane
    var blockName = createOutputBlock("Output_Pane"); //

    //Check if variables are valid. If so, create an element for display.
    if(asuriteid != null || asuriteid != undefined){

        createOutputElement(blockName,"h4",asuriteid);

    }
    else {

        createOutputElement(blockName,"p",COULD_NOT_LOCATE_ERROR_1);
        createOutputElement(blockName,"p",COULD_NOT_LOCATE_ERROR_2);

    }

    if(fullName != null || asuriteid != undefined){

        createOutputElement(blockName,"h4",fullName);

    }

    /*
    
    TODO: Add more if statements for more variables to pull from JSON 
    
    */

}

/* 

    Creates an HTML div to store child elements
    @param appendTo (String) is the id of the html parent block it needs to be appended to.
    @return (String) is the string version of the id of the block created.

*/
function createOutputBlock(appendTo){

    OUTPUT_BLOCK_COUNTER += 1;
    var Element = document.createElement("div");
    Element.id = "Output_Block_" + OUTPUT_BLOCK_COUNTER;
    Element.class = "Output_Block";
    document.getElementById(appendTo).append(Element);
    var blockName = "Output_Block_" + OUTPUT_BLOCK_COUNTER;

    return blockName;

}

/* 

    Creates an HTML Element to append to its parent block
    @param appendTo (String) is the id of the html parent block it needs to be appended to.
    @param type (String) is the title of the expected return value. (i.e. fullName or asurite ...)
    @param text (String) text that needs to be placed within the created element.

*/
function createOutputElement(appendTo,type,text){

    OUTPUT_ELEMENT_COUNTER += 1;
    var Element = document.createElement(type);
    Element.id = "Output_Element_" + OUTPUT_ELEMENT_COUNTER;
    Element.class = "Output_Element";
    Element.innerHTML = text;
    document.getElementById(appendTo).append(Element);
    
}

/*

    Makes a JSON request using a CORS proxy.
    @return string - asurite id
    @return null (If email provided has no asurite)

*/
async function getAsuriteId_With_Proxy(){

    var targetUrl = begin + document.getElementById("Email_Input").value + end;
    var asuriteID;

    await fetch(proxyUrl + targetUrl)
    .then(json => json.json())
    .then(data => {

        asuriteID = data["response"]["docs"]["0"].asuriteId;

    })
    .catch(e => {
        console.log(e);
        return null;
    });

    return asuriteID;

}

/*

    Makes a JSON request
    @return string - asurite id
    @return null (If email provided has no asurite)

*/
async function getAsuriteId(){

    var targetUrl = begin + document.getElementById("Email_Input").value + end;
    var asuriteID;

    await fetch(targetUrl)
    .then(json => json.json())
    .then(data => {

        asuriteID = data["response"]["docs"]["0"].asuriteId;

    })
    .catch(e => {
        console.log(e);
        return null;
    });

    return asuriteID;

}

/*

    Makes a JSON request using a CORS proxy.
    @return string - Name
    @return null (If email provided has no asurite)

*/
async function getFullName_With_Proxy(){

    var targetUrl = begin + document.getElementById("Email_Input").value + end;
    var fullName;

    await fetch(proxyUrl + targetUrl)
    .then(json => json.json())
    .then(data => {

        try{

            fullName = "" + data["response"]["docs"]["0"].firstName + " " + data["response"]["docs"]["0"].lastName;

        }
        catch(error){

            console.log(error);

        }
        

    })
    .catch(e => {
        console.log(e);
        return null;
    });

    return fullName;

}

/*

    Makes a JSON request
    @return string - Name
    @return null (If email provided has no asurite)

*/
async function getFullName(){

    var targetUrl = begin + document.getElementById("Email_Input").value + end;
    var fullName;

    await fetch(targetUrl)
    .then(json => json.json())
    .then(data => {

        try{

            fullName = "" + data["response"]["docs"]["0"].firstName + " " + data["response"]["docs"]["0"].lastName;

        }
        catch(error){

            console.log(error);

        }
        

    })
    .catch(e => {
        console.log(e);
        return null;
    });

    return fullName;

}