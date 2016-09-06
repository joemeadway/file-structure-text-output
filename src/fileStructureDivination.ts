'use strict';

import * as fs from 'fs';
var execSync = require('child_process').execSync; 
var path = require('path');


export class FileStructureDivination{

    private _filePath:string;
    private _root:string;
    private _output:string;

    public getFileStructure(filePath: string) : FileStructureOutput {
        filePath = filePath.trim();
        
        if(!fs.existsSync(filePath)){
            return new FileStructureOutput("Error: File Not Found", "");    
        }
        this._filePath = filePath;
        this._root = path.basename(this._filePath);
        this._output = '';
        
        this._output += this._root+"\n";

        if(fs.lstatSync(this._filePath).isDirectory()){
            this.getTextForLocation(this._filePath);
        }

        return new FileStructureOutput("File found",this._output);
    }


    private getTextForLocation(filePath:string){
        this.writeLoop(filePath);
    }

    private writeLoop(currentFolderPath:string){
        this._output += this.writeThisLocation(currentFolderPath);
        if(fs.lstatSync(currentFolderPath).isDirectory()){ 

            var folderContents = fs.readdirSync(currentFolderPath);
            if(folderContents.length > 0){
                for(var i=0; i<folderContents.length; i++){
                    this.writeLoop(currentFolderPath+"/"+folderContents[i])
                }
            }   
        }
    }

    private writeThisLocation(locationPath:string):string{
        // remove everything up to root - \test\folder\file.txt
        // count slashes - 3
        // write out pipe-tab for number of slahes - 1 e.g. |   | 
        // then append pipe-dashes-space-filename - |    |    |--- file.txt (and new line)

        var output = "";
        var basename = path.basename(locationPath);
        if(basename !== this._root){
            var segment = locationPath.slice(locationPath.indexOf(this._root));
            var slashCount = segment.split("/").length - 1;
            for(var i = 1; i < slashCount; i++){
                output += "|    ";
            }
            output += "|--- " + path.basename(locationPath) + "\n";
        }
        return output;
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