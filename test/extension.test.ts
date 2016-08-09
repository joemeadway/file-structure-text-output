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

import { FileCruncher } from '../src/fileCruncher';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("Something 1", () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });

    let cruncher = new FileCruncher();

    cruncher.getFileStructure("input");
});

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


//file exists/no
//top level folders & files
//single file found in a folder
//single folder found
//multiple folders found and listed
//second level folders contents listed
//empty folder nothing listed