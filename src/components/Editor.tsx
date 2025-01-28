import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { JSONContent } from '@tiptap/core';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import { useRoom } from '@liveblocks/react';
import { Toolbar } from './Toolbar';
import { LiveObject } from "@liveblocks/client";

import './Editor..scss';
// import { Threads } from './Threads';

interface Document {
  id: number;
  title: string;
  content: JSONContent;
}

interface EditorProps {
  docId: number;
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const DEFAULT_CONTENT: JSONContent = {
  type: "doc",
  content: [
  ],
};

const Editor: React.FC<EditorProps> = ({ docId, documents, setDocuments }) => {
  const room = useRoom();

  const currentDoc = documents.find((doc) => doc.id === docId);

  if (!currentDoc) {
    return <p className="text-red-500">Document not found!</p>;
  }

  const [menuClass, setMenuClass] = useState({
    heading: false,
    list: false,
    textColor: false,
    highlight: false,
    options: false,
  });

  const toggleMenu = (menu: keyof typeof menuClass) => {
    setMenuClass((prev) => {
      const updatedMenuClass = { ...prev, [menu]: !prev[menu] };

      Object.keys(updatedMenuClass).forEach((key) => {
        if (key !== menu) {
          updatedMenuClass[key as keyof typeof menuClass] = false;
        }
      });
      return updatedMenuClass;
    });
  };

  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Underline,
    ],
    content: '',
  });

  useEffect(() => {
    const initializeStorage = async () => {
      if (!room) return;
      const { root } = await room.getStorage();
      if (!root.get("content")) {
        root.set("content", DEFAULT_CONTENT);
      }
    };

    initializeStorage();
  }, [room]);

  useEffect(() => {
    if (editor && currentDoc) {
      editor.commands.setContent(currentDoc.content);
    }
  }, [editor, currentDoc]);

  useEffect(() => {
    if (!room || !editor) return;

    const initializeStorage = async () => {
      const { root } = await room.getStorage();
      let contentKey = root.get("content");

      if (!contentKey) {
        root.set("content", new LiveObject(DEFAULT_CONTENT));
        contentKey = root.get("content");
      }

      if (contentKey instanceof LiveObject) {
        editor.commands.setContent(contentKey.toObject() as JSONContent);

        const unsubscribe = room.subscribe(
          contentKey,
          () => {
            editor.commands.setContent(contentKey.toObject() as JSONContent);
          },
        );

        editor.on("update", () => {
          const updatedContent = editor.getJSON();
          contentKey.update(updatedContent);
        });

        return () => {
          unsubscribe();
          editor.off("update");
        };
      }
    };

    initializeStorage();
  }, [room, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Toolbar editor={editor} menuClass={menuClass} toggleMenu={toggleMenu} />
      <div
        className="pt-20"
        onClick={() =>
          setMenuClass({
            heading: false,
            list: false,
            textColor: false,
            highlight: false,
            options: false,
          })
        }
      >
        <div>
          <EditorContent editor={editor} className="text-left lg:px-20 p-4 max-w-[80vw]" />
          {/* <Threads editor={editor} /> */}
        </div>
      </div>
    </div>
  );
};

export default Editor;