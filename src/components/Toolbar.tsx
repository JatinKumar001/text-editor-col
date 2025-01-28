import React from 'react'
import { Editor } from '@tiptap/core';
import h from '../assets/h.png'
import h1 from '../assets/h1.png'
import h2 from '../assets/h2.png'
import h3 from '../assets/h3.png'
import p from '../assets/p.png'
import bold from '../assets/bold.png'
import italic from '../assets/italic.png'
import underline from '../assets/underline.png'
import list from '../assets/list.png'
import highlight from '../assets/highlight.png'
import alignLeft from '../assets/align-left.png'
import alignCenter from '../assets/align-center.png'
import alignRight from '../assets/align-right.png'
import textColor from '../assets/text-color.png'
import white from '../assets/white.png'
import black from '../assets/black.png'
import skyBlue from '../assets/sky-blue.png'
import blue from '../assets/blue.png'
import green from '../assets/green.png'
import red from '../assets/red.png'
import yellow from '../assets/yellow.png'
import orange from '../assets/orange.png'
import lightgreen from '../assets/light-green.png'
import pink from '../assets/pink.png'
import bulletedList from '../assets/bulleted-list.png'
import decimalList from '../assets/decimal-list.png'
import options from '../assets/options.png'
import borderLeft from '../assets/border-left.png'
import horizontalLine from '../assets/horizontal-line.png'

import './Editor..scss'

interface MenuClass {
    heading: boolean;
    list: boolean;
    textColor: boolean;
    highlight: boolean;
    options: boolean;
}

interface ToolbarProps {
    editor: Editor,
    menuClass: MenuClass
    toggleMenu: (menu: keyof MenuClass) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor, menuClass, toggleMenu }) => {

    return (

        <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center fixed mt-14 ml-3 mr-3 z-50'>
                <div className='flex px-5 py-3 h-10 bg-[#ebeced] rounded-md shadow-md'>
                    <div className='flex items-center pr-5 border-r-3 border-gray-400'>
                        <div className='relative'>
                            <img src={h} className='h-6.5 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='headings' onClick={() => { toggleMenu('heading') }} />
                            <div className={menuClass.heading ? 'absolute z-10 top-10 right-2 rightness-100 max-w-36 px-2 py-2 text-gray-500 bg-[#ebeced] rounded-md shadow-md' : 'hidden'}>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3'>
                                    <img src={h1} alt='h-level1' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); toggleMenu('heading');}} />
                                    {/* <p>Level 1</p> */}
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={h2} alt='h-level2' className='h-5.5 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); toggleMenu('heading');}} />
                                    {/* <p>Level 2</p> */}
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={h3} alt='h-level3' className='h-5 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); toggleMenu('heading');}} />
                                    {/* <p>Level 3</p> */}
                                </div>
                                <div className='flex min-w-6 pb-3 pt-3'>
                                    <img src={p} alt='paragraph' className='h-4.5 mr-2 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setParagraph().run(); toggleMenu('heading');}} />
                                    {/* <p>Paragraph</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <img src={list} className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='list' onClick={() => { toggleMenu('list') }} />
                            <div className={menuClass.list ? 'absolute z-10 top-10 right-2 rightness-100 max-w-36 px-2 py-2 text-gray-500 bg-[#ebeced] rounded-md shadow-md' : 'hidden'}>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-1'>
                                    <img src={decimalList} alt='decimal-list' className='h-5 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleOrderedList().run(); toggleMenu('list') }} />
                                </div>
                                <div className='flex min-w-6 pb-2 pt-3'>
                                    <img src={bulletedList} alt='bulleted-list' className='h-6 mr-4 scale-110 hover:scale-125 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleBulletList().run(); toggleMenu('list') }} />
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <img src={textColor} className='h-6 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='text-color' onClick={() => { toggleMenu('textColor') }} />
                            <div className={menuClass.textColor ? 'absolute z-10 top-10 -left-2 rightness-100 max-w-36 px-2 py-2 text-gray-500 bg-[#ebeced] rounded-md shadow-md' : 'hidden'}>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3'>
                                    <img src={black} alt='black' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#000000').run(); toggleMenu('textColor') }} />
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={white} alt='white' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#ffffff').run(); toggleMenu('textColor') }} />
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={red} alt='red' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#ff0000').run(); toggleMenu('textColor') }} />
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={blue} alt='blue' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#1e90ff').run(); toggleMenu('textColor') }} />
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={skyBlue} alt='skyBlue' className='h-5 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#00bfff').run(); toggleMenu('textColor') }} />
                                </div>
                                <div className='flex min-w-6 pb-3 pt-3 border-b-2 border-gray-300'>
                                    <img src={pink} alt='pink' className='h-6 mr-2 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#ff69b4').run(); toggleMenu('textColor') }} />
                                </div>
                                <div className='flex min-w-6 pb-3 pt-3 border-b-2 border-gray-300'>
                                    <img src={green} alt='green' className='h-6 mr-2 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#008000').run(); toggleMenu('textColor') }} />
                                </div>
                                <div className='flex min-w-6 pb-3 pt-3'>
                                    <img src={orange} alt='orange' className='h-5.5 mr-2 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setColor('#ffa500').run(); toggleMenu('textColor') }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center pl-5 pr-5 border-r-3 border-gray-400'>
                        <div>
                            <img src={bold} className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='bold' onClick={() => editor.chain().focus().toggleBold().run()} />
                        </div>
                        <div>
                            <img src={italic} className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='italic' onClick={() => editor.chain().focus().toggleItalic().run()} />
                        </div>
                        <div>
                            <img src={underline} className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='underline' onClick={() => editor.chain().focus().toggleUnderline().run()} />
                        </div>
                        <div className='relative'>
                            <img src={highlight} className='h-6 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='hightlight' onClick={() => { toggleMenu('highlight') }} />
                            <div className={menuClass.highlight ? 'absolute z-10 top-10 -left-2 rightness-100 max-w-36 px-2 py-2 text-gray-500 bg-[#ebeced] rounded-md shadow-md' : 'hidden'}>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-1'>
                                    <img src={skyBlue} alt='skyBlue' className='h-5 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHighlight({ color: '#00bfff' }).run(); toggleMenu('highlight') }} />
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={lightgreen} alt='lighgreen' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHighlight({ color: '#90ee90' }).run(); toggleMenu('highlight') }} />
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={pink} alt='pink' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHighlight({ color: '#ffb6c1' }).run(); toggleMenu('highlight') }} />
                                </div>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-3'>
                                    <img src={orange} alt='orange' className='h-5.5 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run(); toggleMenu('highlight') }} />
                                </div>
                                <div className='flex min-w-6 pb-3 pt-3'>
                                    <img src={yellow} alt='yellow' className='h-6 mr-2 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleHighlight({ color: '#ffff00' }).run(); toggleMenu('highlight') }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center pl-5 pr-5 border-r-3 border-gray-400'>
                        <div>
                            <img src={alignLeft} className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='alignLeft' onClick={() => editor.chain().focus().setTextAlign('left').run()} />
                        </div>
                        <div>
                            <img src={alignCenter} className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='alignCenter' onClick={() => editor.chain().focus().setTextAlign('center').run()} />
                        </div>
                        <div>
                            <img src={alignRight} className='h-6 hover:scale-110 cursor-pointer duration-100 ease-in-out' alt='alignRight' onClick={() => editor.chain().focus().setTextAlign('right').run()} />
                        </div>
                    </div>
                    <div className='flex items-center pl-5 pr-2'>
                        <div className='relative'>
                            <img src={options} className='h-6 mr-4 scale-125 hover:scale-150 cursor-pointer duration-100 ease-in-out' alt='options' onClick={() => { toggleMenu('options') }} />
                            <div className={menuClass.options ? 'absolute z-10 top-10 right-2 rightness-100 max-w-36 px-2 py-2 text-gray-500 bg-[#ebeced] rounded-md shadow-md' : 'hidden'}>
                                <div className='flex min-w-6 border-b-2 border-gray-300 pb-3 pt-1'>
                                    <img src={borderLeft} alt='border-left' className='h-6 mr-4 hover:scale-110 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().toggleBlockquote().run(); toggleMenu('options') }} />
                                </div>
                                <div className='flex min-w-6 pb-2 pt-3'>
                                    <img src={horizontalLine} alt='horizontal line' className='h-7 mr-4 scale-110 hover:scale-125 cursor-pointer duration-100 ease-in-out' onClick={() => { editor.chain().focus().setHorizontalRule().run(); toggleMenu('options') }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};