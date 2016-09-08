'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Selection = vscode.Selection;
import Window = vscode.window;
import Range = vscode.Range;
import Document = vscode.TextDocument;
import TextEditor = vscode.TextEditor;
import { FileStructureDivination } from './fileStructureDivination';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "File Structure Text Output" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.fsto', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');

        //get selection
        let selections = Window.activeTextEditor.selections;
        //convert to string
        let d = Window.activeTextEditor.document;
        let location = d.getText(new Range(selections[0].start, selections[0].end))
        
        //then initialise fileCruncher, and pass in string
        var diviner = new FileStructureDivination();
        var returnedStructure = diviner.getFileStructure(location);
        
        if(returnedStructure.outputMessage.startsWith("Error") ){
            vscode.window.showErrorMessage(returnedStructure.outputMessage);
        }
        else{
            var editor = Window.activeTextEditor;
            editor.edit(function (edit) {
                edit.replace(selections[0], returnedStructure.filePath);
            });
        }

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

//Looking at structure here:
//https://github.com/Microsoft/vscode-wordcount/blob/master/extension.ts
//Likely don't need the controller, but separate class for actual work for extension
//including interacting with the application
//instead - class with public methods - get file path, get output string, etc.
//or, just single string in, certain outputs out - error, text output etc.
//and have the method call these and use response, whcih then also gives neat api for testing 