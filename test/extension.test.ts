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
import { FileNode } from '../src/FileStructureDivination';

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
            'single-file.txt':""    
        }
    },
        'path/to/single-file.txt': "",
        'single/empty/folder': {/** another empty directory */}
    });

    test("file does not exist returns error message and empty file string", () =>{
        var output = divine.getFileStructure("non-existent");
        assert.equal(output.outputMessage, "Error: File Not Found");
        assert.equal(output.filePath, "");
    });

    test("single empty folder is returned with success message", () =>{
        var output = divine.getFileStructure("single/empty/folder");
        assert.equal(output.outputMessage, "File found");
        assert.equal(output.filePath, "folder");
    });

    test("single file is returned with success message", () =>{
         var output = divine.getFileStructure("path/to/single-file.txt");
        assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "single-file.txt");
    });

    
    mock.restore


});

suite("FileNode Tests", () => {
    test("file node to string outputs own filename", () =>{
        var node = new FileNode();
        node.name = "file-name.txt";
        assert.equal(node.toString(), "file-name.txt");
    });
    
    test("file node with child to string outputs own filename and child", () =>{
        var node = new FileNode();
        node.name = "dir-with-file";
        var childNode = new FileNode();
        childNode.name = "single-file.txt";
        node.children = childNode;
        assert.equal(node.toString(), "dir-with-file\n|- single-file.txt");
    });
});

// This outputs location of where the code is executing
// console.log(`Starting directory: ${process.cwd()}`);


// // Defines a Mocha test suite to group tests of similar kind together
// suite("Word Count Tests", () => {

// 	// Defines a Mocha unit test
// 	test("Word Count", (done) => {
// 		let testWordCounter = new myExtension.WordCounter();

// 		vscode.workspace.openTextDocument(path.join(__dirname, '..', '..', 'vsc-extension-quickstart.md')).then((document) => {
// 			assert.equal(testWordCounter._getWordCount(document), 254);
// 			done();
// 		}, (error) => {
// 			assert.fail(error);
// 			done();
// 		});
// 	});
// });

//top level folders & files
//single file found in a folder
//single folder found
//multiple folders found and listed
//second level folders contents listed
//empty folder nothing listed