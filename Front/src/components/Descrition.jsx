import React from 'react'
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

export default function Descrition({ nome,descricao,value, setValue }) {
    
    var rteObject = typeof RichTextEditorComponent;
    return (
        <>
            <div className='pt-6'>
                <label className="text-lg font-bold dark:text-black">{nome}</label>
                <RichTextEditorComponent id='teste' placeholder={descricao} ref={(richEditor) => { rteObject = richEditor }} onBlur={(e) => { setValue(rteObject.getHtml()) }} value={value} insertImageSettings={{saveFormat:"Base64"}}>
                    <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar,]} />
                </RichTextEditorComponent>
            </div>
        </>

    )
}
