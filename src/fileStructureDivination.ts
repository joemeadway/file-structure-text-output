'use strict';

import * as fs from 'fs';
var execSync = require('child_process').execSync; 
var path = require('path');


export class FileStructureDivination{


    public getFileStructure(filePath: string) : FileStructureOutput {
        if(!fs.existsSync(filePath)){
            return new FileStructureOutput("Error: File Not Found", "");    
        }

        var bufferResult = execSync('tree ' + filePath);
        var treeCmdResult = bufferResult.toString('utf-8');
        var split = treeCmdResult.substring(treeCmdResult.indexOf(filePath.toUpperCase()));

        console.log(split);


        return new FileStructureOutput("File found",split);
        
        
        
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