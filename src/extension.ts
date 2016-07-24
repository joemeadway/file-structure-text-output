'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Selection = vscode.Selection;
import Window = vscode.window;
import Range = vscode.Range;
import Document = vscode.TextDocument;
import * as fs from 'fs';

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
        //let d = Window.activeTextEditor.document;
        //let location = d.getText(new Range(selections[0].start, selections[0].end))
        
        //any checks etc.
        
        //use to build folder structur
        
        //replace source text with output text on doc.

        fs.exists("c:\\dev\\", function(exists) {
            if (exists) {
                vscode.window.showInformationMessage('File Exists!');
            }
            else{
                vscode.window.showInformationMessage('Not found!');
            }       
        });

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
