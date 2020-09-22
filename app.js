var GeneticAlgorithmConstructor = require('geneticalgorithm')
const readline = require('readline');
var TargetString="to be or not to be that is the question"   ///What string do I want to find
var population_Size=TargetString.length*TargetString.length;  /// population_Size in start 

function makeString(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 function replaceChar(origString, replaceChar, index) {
    let firstPart = origString.toString().substr(0, index);
    let lastPart = origString.toString().substr(index + 1);
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

function createEmptyPhenotype(Size)
{
var array=[];
for(;Size>0;Size--)
{
    array.push(makeString(TargetString.length));
}
return array;
}



function mutationFunction(phenotype) {
    var HowMuchChanges=Math.floor(Math.random()*phenotype.length);
    for(;HowMuchChanges>0;HowMuchChanges--)
        {
            var ChangesIndex=Math.floor(Math.random()*phenotype.length);
            phenotype=replaceChar (phenotype,makeString(1),ChangesIndex)
        }
    	return phenotype
}


function crossoverFunction(phenotypeA, phenotypeB) {
   
    var HowMuchChanges=Math.floor(Math.random()*((phenotypeA.length <= phenotypeB.length) ? phenotypeA.length :phenotypeB.length));
    for(;HowMuchChanges>0;HowMuchChanges--)
    {
        var temp='';
        var where1=Math.floor(Math.random()*((phenotypeA.length <= phenotypeB.length) ? phenotypeA.length :phenotypeB.length));
        var where2=Math.floor(Math.random()*((phenotypeA.length <= phenotypeB.length) ? phenotypeA.length :phenotypeB.length));
        temp=replaceChar (temp,phenotypeA[where1],0); // Should display He!!o World
        phenotypeA= replaceChar (phenotypeA,phenotypeB[where2],where1);
        phenotypeB= replaceChar (phenotypeB,temp[0],where2);
    }

	return [ phenotypeA , phenotypeB ]
}

function fitnessFunction(phenotype) {
	var score = 0
 
for(var i=0;i<phenotype.length && i<TargetString.length;i++){
        if(phenotype[i]===TargetString[i])
        {
            score++;
        }
    }
	return score
}

var firstPhenotype = {
	dummyKey : "dummyValue"
	// enter phenotype data here
}


var config = {
   mutationFunction: mutationFunction,
   crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    //doesABeatBFunction: yourCompetitionFunction,
    population: createEmptyPhenotype(population_Size),   //array of pipulation
    populationSize: population_Size	/// population_Size after 1 evolve 

}


var ga = GeneticAlgorithmConstructor( config )
var anotherGA = ga.clone()



var totalEvolve=0;

while(ga.bestScore()<TargetString.length &&totalEvolve<10000 ){
    ga.evolve()
    totalEvolve++;
if(totalEvolve%1000===0)
console.log(ga.best());
}


var scoreList = ga.scoredPopulation()
console.log(scoreList)

console.log("and winner is \""+ ga.best() +"\" with score " + ga.bestScore())