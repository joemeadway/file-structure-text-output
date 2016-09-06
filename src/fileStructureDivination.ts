'use strict';

import * as fs from 'fs';
var execSync = require('child_process').execSync; 
var path = require('path');


export class FileStructureDivination{

    private _filePath:string;
    private _root:string;

    public getFileStructure(filePath: string) : FileStructureOutput {
        if(!fs.existsSync(filePath)){
            return new FileStructureOutput("Error: File Not Found", "");    
        }
        this._filePath = filePath;
        this._root = path.basename(this._filePath);
        
        var output = "";
        output += this._root + "\n";

        //checking if root is directory or not here means this check is made twice
        //could likely remove one call, but leaving it in for the time being          
        if(fs.lstatSync(this._filePath).isDirectory()){
            output += this.getTextForLocation(this._filePath);
        }


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

    }

    private getTextForLocation(currentFolderPath : string) :string{
        var output = "";

        if(fs.lstatSync(currentFolderPath).isDirectory()){ 
            output += this.writeThisLocation(currentFolderPath);
            var folderContents = fs.readdirSync(currentFolderPath);
            if(folderContents.length > 0){
                for(var i=0; i<folderContents.length; i++){
                    output+=this.getTextForLocation(currentFolderPath+"/"+folderContents[i]);
                }
            }
            else{
                output += this.writeThisLocation(currentFolderPath);
            }
        }
        else{
            output += this.writeThisLocation(currentFolderPath);
        }



        //"|--- "+rootContents[i]+"\n";
        return output;
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

export class FileNode{
    name: string;
    children: FileNode;
    public toString() : String{
        return this.name;
    }


}