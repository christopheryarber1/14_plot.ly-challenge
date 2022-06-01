///////////////////////////////
//START Pull Data from JSON
///////////////////////////////

// Get the capsules endpoint
const bellybuttondata = "../data/samples.json";

// Fetch the JSON data and console log it
d3.json(bellybuttondata).then(function(data) {
  console.log(data);                  //Good

  console.log(data.names);            //Good  
  console.log(data.metadata);         //Good
  console.log(data.samples);          //Good

  console.log(data.metadata.ID);         //Good

  //console.log(data.samples.otu_ids);                //Not working
  //console.log(data.samples.sample_values);          //Not working
  //console.log(data.samples.otu_labels);             //Not working



/////////////////////////////////
//START JSON Data Parse Stand-in
/////////////////////////////////

//Dropdown List 


var namesdata =data.names;
//["940", "941", "943", "944", "945", "946", "947", "948", "949", "950", "952", "953", "954", "955", "956", "958", "959", "960", "961", "962", "963", "964", "966", "967", "968", "969", "970", "971", "972", "973", "974", "975", "978", "1233", "1234", "1235", "1236", "1237", "1238", "1242", "1243", "1246", "1253", "1254", "1258", "1259", "1260", "1264", "1265", "1273", "1275", "1276", "1277", "1278", "1279", "1280", "1281", "1282", "1283", "1284", "1285", "1286", "1287", "1288", "1289", "1290", "1291", "1292", "1293", "1294", "1295", "1296", "1297", "1298", "1308", "1309", "1310", "1374", "1415", "1439", "1441", "1443", "1486", "1487", "1489", "1490", "1491", "1494", "1495", "1497", "1499", "1500", "1501", "1502", "1503", "1504", "1505", "1506", "1507", "1508", "1510", "1511", "1512", "1513", "1514", "1515", "1516", "1517", "1518", "1519", "1521", "1524", "1526", "1527", "1530", "1531", "1532", "1533", "1534", "1535", "1536", "1537", "1539", "1540", "1541", "1542", "1543", "1544", "1545", "1546", "1547", "1548", "1549", "1550", "1551", "1552", "1553", "1554", "1555", "1556", "1557", "1558", "1561", "1562", "1563", "1564", "1572", "1573", "1574", "1576", "1577", "1581", "1601"]


//Demograpgic Info Metadata Array
var demometadata = data.metadata[0];
//[["id", 940], ["ethnicity", "Caucasian"], ["gender", "F"], ["age", 24], ["bbtype", "I"], ["location", "Beaufort/NC"], ["wfreq", 2]];


var barchartdata = [["id", 940]]

//Bar Chart Info Arrays

// NEED TO SORT MY ARRAYS IN DESCENDING TO GET THIS TO WORK. 
var barchartdataOTUValues = ["OTU 1167","OTU 2859","OTU 482","OTU 2264","OTU 41","OTU 1189","OTU 352","OTU 189","OTU 2318","OTU 1977"];
var barchartdataSampleValues = [163, 126, 113, 78, 71, 51, 50, 47, 40, 40]


// Gauge Chart Info Arrays
var GaugedataWashFreqData = [7.0];


// Bubble Chart Info Arrays
var bubblechartdataOTU = [1167, 2859, 482, 2264, 41, 1189, 352, 189, 2318, 1977];
var bubblechartdataSampleValues = [163, 126, 113, 78, 71, 51, 50, 47, 40, 40]
var bubblechartdataTextValues = ["Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales"]

/////////////////////////////////
//END JSON Data Parse Stand-in
/////////////////////////////////


///////////////////////////////
//START Dropdown Select Object
///////////////////////////////

// Append the list of Names to the HTML into the SELECT dropdown
var ele = document.getElementById('selDataset');
for (var i = 0; i < namesdata.length; i++) {
    ele.innerHTML = ele.innerHTML +
        '<option value="' + namesdata[i] + '">' + namesdata[i] + '</option>';}

///////////////////////////////
//END Dropdown Select Object
///////////////////////////////


///////////////////////////////
//START Changed Selection Action
///////////////////////////////
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var demographicdata = demometadata;
  var barchartdataSample = barchartdataSampleValues;
  var barchartdataOTU = barchartdataOTUValues;
  var gaugedata = [];










///////////////////////////////
//START Demograpgic Info Table
///////////////////////////////
// Find the html body tag to be used
var tbody = d3.select("tbody");

// Find the html table tag to be used
var table = d3.select("table");

// Iterate through each category/value pair in the metadata table
demographicdata.forEach(([category, value]) => {

  // Append one table row per category/value
  var row = tbody.append("tr");

  // append cells for category and grade
  row.append("td").text(category);
  row.append("td").text(value);
});
///////////////////////////////
//END Demograpgic Info Table
///////////////////////////////



///////////////////////////////
//START Bar Chart Division
///////////////////////////////
// Find the html div tag to be used
var bardiv = d3.select("div", id="bar");

// Iterate through each category/value pair in the metadata table
barchartdata.forEach(([category, value]) => {
    
    //Define plot parameters
    let plot = {
      x: barchartdataSample,
      y: barchartdataOTU,
      type: 'bar',
      orientation:'h'
    };
    

    let OTUBarChart = [plot];
    
    //Plot the bar chart
    Plotly.newPlot("bar", OTUBarChart);
});
///////////////////////////////
//END Bar Chart Division
///////////////////////////////


///////////////////////////////
//START Gauge Chart Division
///////////////////////////////

var data = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: GaugedataWashFreqData[0],
        labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
		title: { text: "<b>Belly Button Washing Frequency</b></br></br>scrubs per week" },
		type: "indicator",
		mode: "gauge+number"
	}
];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);

///////////////////////////////
//END Gauge Chart Division
///////////////////////////////



///////////////////////////////
//START Bubble Chart Division
///////////////////////////////

var trace1 = {
    x: bubblechartdataOTU,
    y: bubblechartdataSampleValues,
    text: bubblechartdataTextValues,
    mode: 'markers',
    marker: {
      colorscale:'viridis',
      size: bubblechartdataSampleValues
    }
  };
  
  var data = [trace1];
  
  var layout = {
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble', data, layout);

///////////////////////////////
//END Bubble Chart Division
///////////////////////////////

   // Call function to update the chart
   //updatePlotly(data);
  }
///////////////////////////////
//END Changed Selection Action
///////////////////////////////



});

///////////////////////////////
//END Pull Data from JSON
///////////////////////////////











///////////////////////////////
// END - ON PAGE INITIALIZATION
///////////////////////////////
// Display the default plot
function init() {

}
///////////////////////////////
// END - ON PAGE INITIALIZATION
///////////////////////////////




