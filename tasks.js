

const metadata = {
        patientA: "cancer",
        patientB: "cancer",
        patientC: "control",
        patientD: "cancer",
        patientE: "control"
};
const mutations = {
        patientA: {
               "KRAS/10394954": 5,
               "KRAS/3958838": 20,
               "TP53/94959003": 10,
               "TP53/12931920": 2,
               "NRAS/399322": 75,
        },
        patientB: {
               "KRAS/10394954": 31,
               "KRAS/3958838": 122,
               "TP53/94959003": 45,
               "TP53/12931920": 11,
               "NRAS/399322": 52,
        },
        patientC: {
               "KRAS/10394954": 10,
               "KRAS/3958838": 74,
               "TP53/94959003": 4,
               "TP53/12931920": 0,
               "NRAS/399322": 39,
               "NRAS/19929330": 20, 
        },
        patientD: {
                "KRAS/10394954": 7,
                "KRAS/3958838": 3,
                "TP53/94959003": 11,
                "TP53/12931920": 92,
                "NRAS/399322": 0,
                "NRAS/19929330": 3,
               },
        patientE: {
                "KRAS/10394954": 7,
                "KRAS/3958838": 3,
                "TP53/94959003": 11,
                "TP53/12931920": 92,
                "NRAS/399322": 0,
                "NRAS/19929330": 3,
    }
};

// number of real positive cases in the data
var conditionPositive = 0; 

//number of real negative cases in the data
var conditionNegative = 0;

// mutations_total will contain the total number of mutation per patient
var mutations_total = [];

function SommeMutation(mutations_total){
var i = 0;

for (let [keyy, valuee] of Object.entries(mutations)) {

var obj2 = Object.entries(mutations)[i][1];

var sum = 0;
for (let [keyyy, valueee] of Object.entries(obj2)) {

sum = sum + valueee;

}
i++;
mutations_total.push([sum]);

}
return (mutations_total);
}


function NumRealPos(){

for (let [key, value] of Object.entries(metadata)) {

if (({value}.value)=="cancer"){
  
  conditionPositive++;
}

}
return(conditionPositive);
}


function rounding(x) {
 return Number.parseFloat(x).toFixed(2);
}

mutations_total = SommeMutation(mutations_total);

// make a copy of our table before sorting it
const unsortedMutations = [...mutations_total];



// sort the table from left to right 
mutations_total.sort(function(a, b){return b - a});


conditionPositive= NumRealPos();

conditionNegative = mutations_total.length -conditionPositive ;

var obj3= Object.values(metadata);


var j;
var truePositive=0;   //Sick people correctly identified as sick
for (j = 0; j < conditionPositive; j++) { 

let ids = unsortedMutations.indexOf(mutations_total[j]);
if (obj3[ids]=="cancer")
{truePositive++;}
}


var k;
var trueNegative=0;  //Healthy people correctly identified as healthy
for (k = mutations_total.length-1 ; k >mutations_total.length - conditionPositive ; k--) { 

let idx = unsortedMutations.indexOf(mutations_total[k]);
if (obj3[idx]=="control")
{trueNegative++;}

}


var sensitivity = truePositive/conditionPositive ;
var speciﬁcity = trueNegative/conditionNegative ;



 function Dataset(){

         return (
             <div>
                  <p>The total number of people in this set of data is  <span> {mutations_total.length} </span> </p>
                  <p>The number of sick people correctly identified as sick of this set of data is  <span> {truePositive} </span> </p>
                  <p>The number of healthy people correctly identified as healthy of this set of data is  <span> {trueNegative} </span> </p>
                  <p>The Sensitivity of this set of data is  <span> {rounding(sensitivity)} </span></p>
                  <p>The Speciﬁcity of this set of data is  <span> {rounding(speciﬁcity)} </span></p>
              </div>
         );
     }

    ReactDOM.render(
     <Dataset/>,
     document.getElementById('root')
   )