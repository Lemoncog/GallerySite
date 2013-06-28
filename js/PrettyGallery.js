/**
 * Created with JetBrains WebStorm.
 * User: jasonleeming
 * Date: 26/06/2013
 * Time: 08:35
 * To change this template use File | Settings | File Templates.
 */


var count = 0;
var columns = 0;
var rows = 0;
var contentList;

var tableMap = {};


function addContentSummary( imgSrc, descriptionText ) {
    //Does contentTable exist yet?
    if(contentList === undefined) {
        //Create the Table!
        contentList = $ ( "<table class='contentTable'></table>" );
        $( "#portfolioArea" ).append(contentList);


        //Build table expecting COLA, COLB, ROW, COLA, COLB
        var cellAOne = $ ( "<td></td>" );
        var cellATwo = $ ( "<td></td>" );

        var cellBOne = $ ( "<td></td>" );
        var cellBTwo = $ ( "<td></td>" );

        tableMap["0,0"] = cellAOne;
        tableMap["1,0"] = cellATwo;
        tableMap["0,1"] = cellBOne;
        tableMap["1,1"] = cellBTwo;

        var rowA = $ ( "<tr></tr>" );
        rowA.append(cellAOne);
        rowA.append(cellATwo);

        var rowB = $ ( "<tr></tr>" );
        rowB.append(cellBOne);
        rowB.append(cellBTwo);

        //Stick the list item into the list
        contentList.append(rowA);
        contentList.append(rowB);
    }

    tableMap[columns+","+rows].append("<img src="+ imgSrc + "/>");
    rows++;
    tableMap[columns+","+rows].append("<p>" + descriptionText + "</p>");

    columns++;
    rows = 0;
}

function createColumnedTable() {

}

function buildContentSummaryElement( classType, imgSrc, contentSummary ) {
    var htmlImage = "<img src='" + imgSrc + "'>";
    var htmlDescription = "<p>" + contentSummary + "</p>";

    var resultHtml = "<li class='" + classType + "'>" + htmlImage + htmlDescription + "</li>";

    return resultHtml;
}

function translateElement( element, dir ){

    var byX = 100 * dir;

    $( element).animate( {
       width: "+=" + byX
    }, 200);
}