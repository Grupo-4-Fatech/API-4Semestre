import React from 'react'
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

export default function Descrition() {
    return (
        <>
        <div className='pt-6'>
        <label className="text-lg font-bold dark:text-black">Description</label>
            <RichTextEditorComponent placeholder={'Write the description'}>
                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
            </div>
        </>

    )
}
