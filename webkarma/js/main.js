/**
 * @author Shriyamvar Bugga
 */

function getAvailableDataSources() 
{
	var httpRequest;
	var url = "http://api.worldbank.org/source?per_page=50";
	alert(url);
	makeRequest( url );
}

function makeRequest(url) 
{
	if (window.XMLHttpRequest) 
 	{ // Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) 
    { // IE
		try 
		{
        	httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) 
        {
        	try 
        	{
        		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        	} 
        	catch (e) {}
        }
    }
 
    if (!httpRequest) 
    {
    	alert('Giving up :( Cannot create an XMLHTTP instance');
    	return false;
    }

	httpRequest.onreadystatechange = checkResponseXML;
    httpRequest.open('GET', url, true);
    httpRequest.send();  
    docWriteSidebar("Requesting World Bank Data Sources...<br/>");
}

function checkResponseXML() 
{
	if (httpRequest.readyState === 4) 
    {
    	var xmlDoc = ParseHTTPResponse(httpRequest);
    	docWriteSidebar("Done parsing xmlResponse... <br/>");
    	displayXMLElements();
	}
}

function displayXMLElements()
{
	var sources = xmlDoc.getElementsByTagName("wb:name");
	alert ("num of sources: " + sources);
}

function ParseHTTPResponse (httpRequest) {
	
	var xmlDoc = httpRequest.responseText;
            // if responseXML is not valid, try to create the XML document from the responseText property
    if (!xmlDoc || !xmlDoc.documentElement) {
        if (window.DOMParser) {
            var parser = new DOMParser();
            try {
            	xmlDoc=parser.parseFromString(httpRequest.responseText,"xml; charset=UTF-8");
            } catch (e) {
                alert ("XML parsing error!!!!!!!" + e);
                docWriteContent(httpRequest.responseText);
                return null;
            };
        }
        else {
        	
            xmlDoc = CreateMSXMLDocumentObject ();
            if (!xmlDoc) {
                return null;
            }
            alert (httpRequest.responseText.length);
            xmlDoc.loadXML (httpRequest.responseText);
        }
        
    }
    
    
                // if there was an error while parsing the XML document
    var errorMsg = null;
    if (xmlDoc.parseError && xmlDoc.parseError.errorCode != 0) {
        errorMsg = "XML Parsing Error: " + xmlDoc.parseError.reason
                  + " at line " + xmlDoc.parseError.line
                  + " at position " + xmlDoc.parseError.linepos;
    }
    else {
        if (xmlDoc.documentElement) {
            if (xmlDoc.documentElement.nodeName == "parsererror") {
                errorMsg = xmlDoc.documentElement.childNodes[0].nodeValue;
            }
        }
    }
    if (errorMsg) {
        alert (errorMsg);
        return null;
    }    
    
            // ok, the XML document is valid
    return xmlDoc;
}

function docWriteSidebar(text)
{
	// document.write("<p id =\"wrapper\">" + text + "</p>");
}

function docWriteContent(content)
{
	// document.write("<p id =\"content\">" + content + "</p>");
}