import React, { useEffect, useState } from "react";
import { useRef } from "react";
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Button } from "@mui/material";
import axios from "axios";

const PagesEditor = ({pageInfo, setPageInfo}) => {

    const [model,setModel] = useState(pageInfo);

  useEffect(() => {
    console.log(pageInfo);
    
  }, []);
  const editor = useRef({});

  const initializeEditor = (e, editorRef) => {
    editor.current = editorRef;
    window.editor = editorRef;
  };


  const uploadImage = (file) =>{
    console.log(file)
  }

  return (
    <>
     <Button variant="contained" sx = {{margin : "20px auto"}} onClick = {()=>setPageInfo(model)}>Зберегти вміст сторінки</Button>
     <FroalaEditorComponent onModelChange = {(content)=>{
         console.log(content)
         setModel(content);
        

        }} model = {model} config = {{
          imageUpload: true,
          imageUploadRemoteUrls: false,
          imageDefaultAlign: 'left',
          imageDefaultDisplay: 'break-text',
          imageUploadParam: 'image',
          imageUoloadURL:"https://api.imgbb.com/1/upload",
          imageAllowedTypes: ['jpeg', 'jpg', 'png'],
          events: {
              'focus' : function(e, editor) {
                  console.log("work");
              },
              // 'image.beforeUpload': function(e, editor, images) {
              //   console.log(images);
              //   // const files = Object(e.currentTarget.images)[0]
              //   // console.log(files);
              //   const data = new FormData();
              //   data.append('image', images[0]);
        
                
              //   data.set('key','4b76823349508cfe6987b62ea7b72eb8')
              //   console.log(data);
              //   axios({
              //     method: 'post',
              //         url: 'https://api.imgbb.com/1/upload',
              //         data: data
              //       }).then((result) => {
              //         console.log(result.data.url);
              //         editor.image.insert(result.data.url, null, null, editor.image.get());
              //       }).catch(err => {
              //         console.log(err);
              //       });
              //       return false;
              // }
              
            },
          toolbarButtons: {
            moreText: {
              buttons: [
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                'subscript',
                'superscript',
                'fontFamily',
                'fontSize',
                'textColor',
                'backgroundColor',
                'inlineClass',
                'inlineStyle',
                'clearFormatting',
              ],
              align: 'left',
              buttonsVisible: 3,
            },
            moreParagraph: {
              buttons: [
                'alignLeft',
                'alignCenter',
                'alignRight',
                'formatOLSimple',
                
                'alignJustify',
                'formatOL',
                'formatUL',
                'paragraphFormat',
                'paragraphStyle',
                'lineHeight',
                'outdent',
                'indent',
                'quote',
              ],
              align: 'left',
              buttonsVisible: 3,
            },
            moreRich: {
              buttons: [
                'insertLink',
                'insertImage',
                'insertVideo',
                'insertTable',
                'emoticons',
                'fontAwesome',
                'specialCharacters',
                'embedly',
                'insertFile',
                'insertHR',
              ],
              align: 'left',
              buttonsVisible: 3,
            },
            moreMisc: {
              buttons: [
                'undo',
                'redo',
                'fullscreen',
                'print',
                'getPDF',
                'spellChecker',
                'selectAll',
                'html',
                'help',
              ],
              align: 'right',
              buttonsVisible: 2,
            },
          },
      }}/>
    </>
  );
  
}
export default PagesEditor;