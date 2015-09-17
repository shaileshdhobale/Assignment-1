var fs = require('fs');
var xml = require('xml2js');
var obj, i, j, value, temp, fName, lName;

// Read Source file
fs.readFile('student.json', 'utf8', function (err, data) {
	if (err) {
		console.log('Cant find source file');
		return console.error("Error : Cant find file " + err);	
	}
	try {
		obj = JSON.parse(data);
	}
	catch(ex){
		console.log('Error : '+ex);
		console.log('JSON file is not in correct format');
		process.exit();
	}

	// Part 1 - write the content of JSON object in destination.txt file 
	fs.open('destination.txt','w', function(err) {
   		if (err) {
       		return console.error(err);
   		}
		fs.appendFile('destination.txt','First Name | Last Name | Score'+"\r\n",function(err,fd){
			if (err) {
	       		return console.error(err);
	       	}
	       	obj = JSON.parse(data);
	       	for(i=0;i<obj.students.length;i++){
       			if (obj.students[i].id != undefined && obj.students[i].fName != undefined && obj.students[i].lName != undefined && obj.students[i].score != undefined && (isNaN(obj.students[i].score))){
	       			value = obj.students[i].id+" | "+obj.students[i].fName+" | "+obj.students[i].lName+" | "+obj.students[i].score;
	       		 	fs.appendFile('destination.txt',value+"\r\n", function(err,fd) {
						if (err) {
		       				return console.error(err);
		      			}
		      		});
       			}
	      	}
	    });
	    console.log("Output file destination.txt.....!!!!");
	});

	// Part 2 - Write the content of JSON objext in descending order in descending.txt file
	function sortObject(obj) {
		try{
			for (i = 0; i < obj.students.length; i += 1){
				// if(isNaN(obj.students[j].score)){
				// 	console.log('dfsd');
				// 	continue;
				// }
				for (j = 0; j < (obj.students.length - i - 1); j += 1) {
		    		if (obj.students[j].score < obj.students[j + 1].score) {
			        	temp = obj.students[j];
			        	obj.students[j] = obj.students[j + 1];
			        	obj.students[j + 1] = temp;
		        	}
			  	}
			}
		} catch(ex){
			console.log ('Error' + ex);
			console.log ('Wrong Structure');
			process.exit();
		}
	    return obj;
	}
	
	fs.open('descending.txt','w', function(err) {
		if (err) {
   			return console.error(err);
		}
		fs.appendFile('descending.txt', 'First Name | Last Name | Score' + "\r\n", function(err) {
			if (err) {
	       		return console.error(err);
	       	}
			obj = sortObject(obj);
	        for (i = 0; i < obj.students.length; i += 1) {
	        	if (obj.students[i].id != undefined && obj.students[i].fName != undefined && obj.students[i].lName != undefined && obj.students[i].score != undefined){
		       		value = obj.students[i].id + " | " + obj.students[i].fName + " | " + obj.students[i].lName + " | " + obj.students[i].score;
					fs.appendFile('descending.txt', value + "\r\n", function(err,fd) {
						if (err) {
		       				return console.error(err);
		      			}
		      		});
				}
	      	}
   		});
   		console.log("Output file descending.txt.....!!!!");
	});

	//Part 3 - Write the content of JSON object in descending order in descendingXML.xml file
	function objToXML(){
		var builder = new xml.Builder({rootName:'Students'});
		profiles = builder.buildObject(sortObject(obj));
		return profiles;
	}
	fs.writeFile('descendingXML.xml', objToXML(), function (err,data){
		if (err) {
			return console.error("Error : "+err);
		}
		console.log('Outfile file descendingXML.xml......!!!')
	});
});


console.log('program end');