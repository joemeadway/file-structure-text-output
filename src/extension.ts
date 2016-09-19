'use strict';

import * as vscode from 'vscode';
import { FileStructureDivination } from './fileStructureDivination';

export function activate(context: vscode.ExtensionContext) {
    
    console.log('Extension "File Structure Text Output" is now active!');
    let disposable = vscode.commands.registerCommand('extension.fsto', () => {

        //get selected text as a string
        let selections = vscode.window.activeTextEditor.selections;
        let d = vscode.window.activeTextEditor.document;
        let location = d.getText(new vscode.Range(selections[0].start, selections[0].end))
        
        //then initialise fileCruncher, and pass in string
        var diviner = new FileStructureDivination();
        var returnedStructure = diviner.getFileStructure(location);
        
        if(returnedStructure.outputMessage.startsWith("Error") ){
            vscode.window.showErrorMessage(returnedStructure.outputMessage);
        }
        else{
            var editor = vscode.window.activeTextEditor;
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
