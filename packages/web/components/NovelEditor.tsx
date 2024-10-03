import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('novel').then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface NovelEditorProps {
  defaultValue: string;
  onUpdate: (value: string) => void;
  disableLocalStorage?: boolean;
}

const NovelEditor: React.FC<NovelEditorProps> = ({ defaultValue, onUpdate, disableLocalStorage }) => {
  return (
    <Editor
      defaultValue={defaultValue}
      onUpdate={({ editor }) => {
        if (editor && typeof editor.getHTML === 'function') {
          const html = editor.getHTML();
          onUpdate(html);
        }
      }}
      disableLocalStorage={disableLocalStorage}
    />
  );
};

export default NovelEditor;