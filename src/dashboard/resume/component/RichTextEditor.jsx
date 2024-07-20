/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnUnderline,
    BtnUndo,
    Separator,
    Toolbar,
    EditorProvider,
    Editor
} from 'react-simple-wysiwyg'
import { Button } from '../../../components/ui/button';
import { Brain } from 'lucide-react';

const RichTextEditor = ({ value, onRichTextEditorChange , label }) => {
    const [editorValue, setEditorValue] = useState(value || '');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setEditorValue(newValue);
        onRichTextEditorChange(newValue);
    };

    return (
        <div>
            <div className='flex justify-between items-end py-3'>
                <label className="font-semibold text-xl"> {label} :-</label>
                <Button>
                    <Brain />Generate using AI
                </Button>
            </div>
            <EditorProvider>
                <Editor value={editorValue} onChange={handleChange}>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor;
