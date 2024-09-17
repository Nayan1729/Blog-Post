import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'
/*
//TODO
######################Controlled components:



React manages the component’s value using state.
You handle the input's value explicitly with state (useState) and update it with event handlers like onChange.
// TODO 
React is responsible for updating and re-rendering the input when its value changes.

#######################Uncontrolled components:


React does not manage the value directly. Instead, the browser handles it.
You access the value using a ref when needed, like when submitting the form, but React doesn't constantly update or track the value on every change.



###############React Hook Form (RHF):


RHF works best with uncontrolled components because it allows the form to be more performant by reducing re-renders. It uses refs to grab values when you submit the form.
Controller in RHF:

    --When you need to use controlled components (like those from Material-UI), you can’t just let the browser
     handle the values. React needs to manage their state.

    --RHF’s Controller component is used to integrate controlled components into RHF’s system, so that RHF can still
     manage the form while the input remains controlled by React's state.

     --That’s where the Controller component comes in. It acts like a bridge between RHF and these controlled inputs.
        It helps RHF manage the input's value and handle events like typing or selecting a date, even though the input
        needs more direct control (like receiving a value and onChange) than typical form elements.
    

*/   
function RTE({name,control,label,defaultValue=''}){

  return (
    <div className="w-full">
        {label && <label className='inline-block mb-1 pl-1' >{label}</label> }
    
    <Controller
        name={name || "content" }
        control={control}
        // This field is a key to which we tell what kind of the event is supposed to trigger this passing of the control to react
        // The 'onChange' handler from React Hook Form is passed to TinyMCE's 'onEditorChange' event.
// This ensures that RHF updates the form state whenever the content of the TinyMCE editor changes.
        render={({field: {onChange}}) => (
            <Editor
            apiKey='xcbcgoyr3ff015nzve2klzus39707fgatj15njtawx6wpapb'
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange} // Sync editor changes with form
            />
        )}
     />

    </div>
  )
}
/*
    Understand this very carefully 

        RHF (via Controller) → Passes "onChange" to TinyMCE.
        TinyMCE → Uses onChange (now attached to onEditorChange) to notify RHF when the editor content changes.
        RHF → Updates form state based on the content changes in TinyMCE.

        Summary:
        RHF's onChange is passed into TinyMCE via the render prop.
        TinyMCE's onEditorChange event passes the editor's content back to RHF, which updates the form state.
        This setup ensures that whenever the TinyMCE content changes, it triggers an update in RHF to maintain form synchronization. 
*/

export default RTE