import React from 'react';
import AceEditor from 'react-ace';
import * as ace from 'ace-builds'
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools"
import "../node_modules/ace-builds/src-noconflict/mode-javascript.js";
// import ace from 'react-ace';
// ace.config.set('../node_modules/ace-builds/src-noconflict/mode-javascript.js')
ace.config.set('modePath', 'javascript')
ace.config.set('themePath', 'one_dark')
const codeEditor = document.querySelector('.btn-run')

// let userCode = '';
// function onChange(newValue) {
//     userCode = newValue
// }
// var Ace = require('ace-builds/src/ace');
// let code = '';
function btnRunCode() {
    // console.log('CodeEditor');
    console.log(codeEditor);

    // console.log('Runnnnnnnn');
    // try {

    //     console.log(AceEditor.propTypes.value);
    // } catch (err) {
    //     console.log('err');
    // }
}

function CodeUi() {
    return (
        <div>
            <div style={{ width: '50%', float: 'left' }}>
                <h1>Dây là phần thông tin</h1>
            </div>
            <div typeof='text/javascript' style={{ width: '50%', float: 'left' }}>
                <div>
                    <AceEditor
                        className='Code'
                        mode="javascript"
                        theme='one_dark'
                        // onChange={onChange}
                        fontSize='12pt'
                        // name="Code"
                        width='800px'
                        editorProps={{
                            $blockScrolling: true,
                        }}
                        setOptions={{
                            enableSnippets: true,
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            highlightActiveLine: true,
                            showPrintMargin: false
                        }}

                    >
                        <script type='text/javascript' src="../node_modules/ace-builds/src-noconflict/mode-javascript.js" />

                    </AceEditor>
                </div>
                <button className='btn-run' onClick={btnRunCode}>Run</button>
                <button>Submit</button>
            </div>

        </div>
    )
}

export default CodeUi