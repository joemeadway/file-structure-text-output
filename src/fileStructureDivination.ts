'use strict';

import * as fs from 'fs';
var execSync = require('child_process').execSync; 
var path = require('path');


export class FileStructureDivination{


    public getFileStructure(filePath: string) : FileStructureOutput {
        if(!fs.existsSync(filePath)){
            return new FileStructureOutput("Error: File Not Found", "");    
        }


        //console.log(fs.readdirSync('path/to/'))
        // var rootContents = fs.readdirSync(filePath);
        // if(rootContents.length > 0){    
        //     for(var i = 0; i<= rootContents.length; i++){
        //         console.log("found - " + filePath+"/" + rootContents[i]);
        //     }
        // }

        var root = path.basename(filePath);
        var output = "";
        output += root + "\n";

        if(fs.lstatSync(filePath).isDirectory()){
            var rootContents = fs.readdirSync(filePath);
            console.log(rootContents);
            if(rootContents.length > 0){    
                for(var i = 0; i<= rootContents.length; i++){
                    output += "|--- "+rootContents[i]+"\n";
                    //console.log("found - " + filePath+"/" + rootContents[i]);
                }
            }
        }

        //returns
        // Array[3]
        // 0:"dir-with-file"
        // 1:"single-file.txt"
        // 2:"some-file.txt"




        return new FileStructureOutput("File found",output);
        
        // output straight to string 
        // loop through each item in folder
        // get full file path - e.g. c:\dev\test\folder\file.txt
        // remove everything up to root - \test\folder\file.txt
        // count slashes - 3
        // write out pipe-tab for number of slahes - 1 e.g. |   | 
        // then append pipe-dashes-space-filename - |    |    |--- file.txt (and new line)
        // if folder, loop through any children, adding to string
        
        
        //how to handle errors etc. - check for magic strings? or is there a standard approach?


        //any checks etc.
        
        //use to build folder structur
        
        //replace source text with output text on doc.

        // fs.exists("c:\\dev\\", function(exists) {
        //     if (exists) {
        //         vscode.window.showInformationMessage('File Exists!');
        //     }
        //     else{
        //         vscode.window.showInformationMessage('Not found!');
        //     }       
        // });

    }

}

export class FileStructureOutput{
    filePath : string
    outputMessage : string
    constructor(outputMessage:string, filePath:string){
        this.outputMessage = outputMessage;
        this.filePath = filePath;
    }
}

export class FileNode{
    name: string;
    children: FileNode;
    public toString() : String{
        return this.name;
    }


}