import { useEffect, useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar";
import { JSONContent } from "@tiptap/core";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
  useRoom,
} from "@liveblocks/react/suspense";

interface Document {
  id: number;
  title: string;
  content: JSONContent;
}

const DEFAULT_CONTENT: JSONContent = {
  type: "doc",
  content: [],
};

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeDocId, setActiveDocId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedDocId = params.get("docId");
    const savedDocs = JSON.parse(localStorage.getItem("documents") || "[]");

    if (sharedDocId) {
      const docId = parseInt(sharedDocId, 10);

      const existingDoc = savedDocs.find((doc: Document) => doc.id === docId);
      if (existingDoc) {
        setDocuments(savedDocs);
        setActiveDocId(docId);
      } else {
        initializeSharedDoc(docId);
        localStorage.setItem("documents", JSON.stringify(savedDocs));
      }
    } else {
      setDocuments(savedDocs);
    }
  }, []);

  const initializeSharedDoc = async (docId: number) => {
    const room = useRoom();
    const { root } = await room.getStorage();

    const liveContent = root.get("content");

    let documentContent: JSONContent = DEFAULT_CONTENT;

    if (liveContent && isValidJSONContent(liveContent)) {
      documentContent = liveContent as JSONContent;
    } else if (!liveContent) {
      root.set("content", DEFAULT_CONTENT);
    }

    setDocuments((prevDocs) => [
      ...prevDocs,
      { id: docId, title: "Shared Document", content: documentContent },
    ]);

    setActiveDocId(docId);
  };

  function isValidJSONContent(content: any): content is JSONContent {
    return (
      typeof content === "object" &&
      content.type === "doc" &&
      Array.isArray(content.content)
    );
  }

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const handleNewDocument = async () => {
    const userInput = prompt("Enter the document name:");
    const newDocId = Date.now();

    const newDoc: Document = {
      id: newDocId,
      title: userInput && userInput.trim() !== "" ? userInput : `Document ${documents.length + 1}`,
      content: DEFAULT_CONTENT,
    };

    setDocuments((prevDocs) => [...prevDocs, newDoc]);
    setActiveDocId(newDocId);

    window.history.pushState({}, "", `/?docId=${newDocId}`);
    window.location.reload();
    alert(`Share this document link: ${window.location.origin}?docId=${newDocId}`);
  };

  const handleSelectDocument = (id: number) => {
    setActiveDocId(id);

    window.history.pushState({}, "", `/?docId=${id}`);
    window.location.reload();
  };

  const handleDeleteDocument = (id: number) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
  
    localStorage.setItem("documents", JSON.stringify(updatedDocs));
  
    setDocuments(updatedDocs);
  
    if (activeDocId === id) {
      window.history.pushState({}, "", `/`);
    }
  };

  return (
    <LiveblocksProvider publicApiKey="pk_dev_HkZdsL_dB9DreMUVuDE_vnmE0Z2eV8NKEFeMPOAUdJQplwXAHjbt9JaCpWFwe7q9">
      {activeDocId ? (
        <RoomProvider id={`doc-${activeDocId}`}>
          <ClientSideSuspense fallback={<div>Loading…</div>}>
            <div className="flex min-h-screen bg-gray-100">
              <Navbar
                documents={documents}
                activeDocId={activeDocId}
                onNewDocument={handleNewDocument}
                onSelectDocument={handleSelectDocument}
                onDeleteDocument={handleDeleteDocument}
              />
              <div className="flex-1 py-4 bg-gray-100">
                <Editor
                  key={activeDocId}
                  docId={activeDocId}
                  documents={documents}
                  setDocuments={setDocuments}
                />
              </div>
            </div>
          </ClientSideSuspense>
        </RoomProvider>
      ) : (
        <div className="flex min-h-screen bg-gray-100">
          <Navbar
            documents={documents}
            activeDocId={activeDocId}
            onNewDocument={handleNewDocument}
            onSelectDocument={handleSelectDocument}
            onDeleteDocument={handleDeleteDocument}
          />
          <div className="flex-1 flex justify-center items-center py-4 bg-gray-100">
            <p className="text-2xl font-medium text-gray-500">
              Select or create a document to start editing.
            </p>
          </div>
        </div>
      )}
    </LiveblocksProvider>
  );
}

export default App;
