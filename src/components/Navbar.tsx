import React from 'react'
import documentIcon from "../assets/document-icon.png"
import newdocumentIcon from "../assets/new-document.png"
import deleteIcon from "../assets/delete-icon.png"

interface Document {
    id: number;
    title: string;
}

interface SidebarProps {
    documents: Document[];
    activeDocId: number | null;
    onNewDocument: () => void;
    onSelectDocument: (id: number) => void;
    onDeleteDocument: (id: number) => void;
}

const Navbar: React.FC<SidebarProps> = ({ documents, activeDocId, onNewDocument, onSelectDocument, onDeleteDocument }) => {

    return (
        <div className='w-70'>
            <div className="w-70 fixed bg-[#ebeced] shadow-md shadow-gray-300 text-black h-screen p-4">
                <h2 className="text-2xl font-bold mb-10 mt-2">My Documents</h2>

                <div className='flex items-center gap-3 p-2 rounded-md mb-4 cursor-pointer hover:bg-gray-200' onClick={onNewDocument}>
                    <img src={newdocumentIcon} alt='new document icon' className='h-6' />
                    <p>New Document</p>
                </div>

                <div>
                    <p className='mb-2 text-gray-400'>Documents</p>
                    {documents.map((doc) => (
                        <div key={doc.id} onClick={() => onSelectDocument(doc.id)} className={`flex justify-between items-center w-full text-left p-2 rounded-md mb-2 cursor-pointer transition-all ${activeDocId === doc.id ? "bg-gray-100 text-gray-800 font-medium" : "hover:font-semibold text-gray-600"}`}>
                            <div className='flex items-center'>
                                <img src={documentIcon} alt='document-icon' className={`h-6 mr-2 ${activeDocId === doc.id ? 'opacity-70' : 'opacity-40'}`} />
                                <p>{doc.title}</p>
                            </div>
                            <div onClick={(e) => {e.stopPropagation(); onDeleteDocument(doc.id); }}>
                                <img src={deleteIcon} alt='delete-icon' className='h-5 opacity-40 hover:opacity-50' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;