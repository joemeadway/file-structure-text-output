//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as ext from '../src/extension';
import { FileStructureDivination } from '../src/FileStructureDivination';

var mock = require('mock-fs');

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {


    let divine = new FileStructureDivination();
 

    //since currently using 'tree' command to list out folders, not much more to test other than
    //proper expected error message returned for bad input...
    //this will change when OSX support added, since no tree command for that...s
    test("file does not exist returns error message and empty file string", () =>{
        var output = divine.getFileStructure("non-existent");
        assert.equal(output.outputMessage, "Error: File Not Found");
        assert.equal(output.filePath, "");
    });

    test("blah", () =>{
        var output = divine.getFileStructure("C:\dev\file-structure-text-output");
        assert.equal(output.outputMessage, "Error: File Not Found");
        assert.equal(output.filePath, "");
    });




});