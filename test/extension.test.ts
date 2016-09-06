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
// import { FileNode } from '../src/FileStructureDivination';

var mock = require('mock-fs');

// Defines a Mocha test suite to group tests of similar kind together
suite("FileStructureDivination Tests", () => {


    let divine = new FileStructureDivination();
 

    //using mock-js to override default fs behaviour, which allows us to create a 
    //temporary in-memory file system for testing 
    mock({
        'path/to/': {
            'some-file.txt': 'file content here',
            'dir-with-file': {
                'single-file.txt':"file content"    
            },
            'multiple':{
                'emptyfolder1':{},
                'emptyfolder2':{},
            },
            'multiplemixed':{
                'emptyfolder1':{},
                'file.txt':'',
            },
            'withasubfolder':{
                'folderwithfile':{
                    'file.txt':'contents'
                }
            }
        },
        'single/empty/root':{},
        'single/empty/notroot':{
            'folder':{}
        },
        'single/path/to/single-file.txt':'content'
    });

    test("file does not exist returns error message and empty file string", () =>{
        var output = divine.getFileStructure("non-existent");
        assert.equal(output.outputMessage, "Error: File Not Found");
        assert.equal(output.filePath, "");
    });

    test("root is single empty folder is returned returns only the empty root folder", () =>{
        var output = divine.getFileStructure("single/empty/root");
        assert.equal(output.outputMessage, "File found");
        assert.equal(output.filePath, "root\n");
    });

    test("non-root empty folder returns only the empty folder", () =>{
        var output = divine.getFileStructure("single/empty/notroot/folder");
        assert.equal(output.outputMessage, "File found");
        assert.equal(output.filePath, "folder\n");
    });

    test("single file is returned with success message", () =>{
         var output = divine.getFileStructure("single/path/to/single-file.txt");
        assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "single-file.txt\n");
    });

    test("location with single file is returned with success message", () =>{
         var output = divine.getFileStructure("path/to/dir-with-file");
         assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "dir-with-file\n|--- single-file.txt\n");
    });
       
    test("location with multiple folders returns both folders listed", () =>{
         var output = divine.getFileStructure("path/to/multiple");
         assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "multiple\n|--- emptyfolder1\n|--- emptyfolder2\n");
    });

    test("location with multiple folders and files returns all contents listed", () =>{
         var output = divine.getFileStructure("path/to/multiplemixed");
         assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "multiplemixed\n|--- emptyfolder1\n|--- file.txt\n");
    });
    
    //expected:
    //withasubfolder
    //|--- folderwithfile
    //|    |--- file.txt
    test("location with a folder with contents lists contents of subfolder indented with four spaces", () =>{
         var output = divine.getFileStructure("path/to/withasubfolder");
         assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "withasubfolder\n|--- folderwithfile\n|    |--- file.txt\n");
    });

    mock.restore


});

// suite("FileNode Tests", () => {
//     test("file node to string outputs own filename", () =>{
//         var node = new FileNode();
//         node.name = "file-name.txt";
//         assert.equal(node.toString(), "file-name.txt");
//     });
    
//     test("file node with child to string outputs own filename and child", () =>{
//         var node = new FileNode();
//         node.name = "dir-with-file";
//         var childNode = new FileNode();
//         childNode.name = "single-file.txt";
//         node.children = childNode;
//         assert.equal(node.toString(), "dir-with-file\n|- single-file.txt");
//     });
// });

// This outputs location of where the code is executing
// console.log(`Starting directory: ${process.cwd()}`);


// // Defines a Mocha test suite to group tests of similar kind together
// suite("Word Count Tests", () => {



});