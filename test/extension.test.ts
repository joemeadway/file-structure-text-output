import * as assert from 'assert';
import * as vscode from 'vscode';
import { FileStructureDivination } from '../src/fileStructureDivination';

var mock = require('mock-fs');

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
            },
            'withtwosubfolder':{
                'folderwithfile1':{
                    'file1.txt':'contents'
                },
                'folderwithfile2':{
                    'file2.txt':'contents'
                }
            },
            'complex':{
                'folderwithfile1':{
                    'file1.txt':'contents'
                },
                'folder':{
                    'folder':{
                        'folder':{
                            'file.txt':'contents'
                        },
                        'file.txt':'',
                        'file2.txt':''
                    }
                },
                'folder2':{
                    'file.txt':''
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

    test("input has spaces included trims before returning result", () =>{
        var output = divine.getFileStructure(" single/empty/root ");
        assert.equal(output.outputMessage, "File found");
        assert.equal(output.filePath, "root\n");
    });

    test("numerical input returns error message", () =>{
        var output = divine.getFileStructure("1234435");
        assert.equal(output.outputMessage, "Error: File Not Found");
        assert.equal(output.filePath, "");
    });

    test("file location given in utf encoded string is returned with success message", () =>{
         var output = divine.getFileStructure("\x73\x69\x6E\x67\x6C\x65\x2F\x70\x61\x74\x68\x2F\x74\x6F\x2F\x73\x69\x6E\x67\x6C\x65\x2D\x66\x69\x6C\x65\x2E\x74\x78\x74");
        assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "single-file.txt\n");
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

    //expected:
    //withtwosubfolder
    //|--- folderwithfile1
    //|    |--- file1.txt
    //|--- folderwithfile2
    //|    |--- file2.txt
    test("location with a folder with two subfolders with contents full contents indented with four spaces", () =>{
         var output = divine.getFileStructure("path/to/withtwosubfolder");
         assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "withtwosubfolder\n|--- folderwithfile1\n|    |--- file1.txt\n|--- folderwithfile2\n|    |--- file2.txt\n");
    });


    // complex
    // |--- folder
    // |    |--- folder
    // |    |    |--- file.txt
    // |    |    |--- file2.txt
    // |    |    |--- folder
    // |    |    |    |--- file.txt
    // |--- folder2
    // |    |--- file.txt
    // |--- folderwithfile1
    // |    |--- file.txt
    test("location with a complex folder structure returns correct structure", () =>{
         var output = divine.getFileStructure("path/to/complex");
         assert.equal(output.outputMessage, "File found");
         assert.equal(output.filePath, "complex\n|--- folder\n|    |--- folder\n|    |    |--- file.txt\n|    |    |--- file2.txt\n|    |    |--- folder\n|    |    |    |--- file.txt\n|--- folder2\n|    |--- file.txt\n|--- folderwithfile1\n|    |--- file1.txt\n");

    });

    mock.restore

});
