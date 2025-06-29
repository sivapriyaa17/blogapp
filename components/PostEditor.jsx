
import dynamic from 'next/dynamic';
import { useState } from 'react';
import slugify from '@/lib/slugify';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


import 'react-quill/dist/quill.snow.css';

export default function PostEditor({ onSubmit, initial = {} }) {
  // ✅ Fix 3: `initial` was misspelled as `intial`
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      slug: slugify(title),
    });
  };

  return (
    <div className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <ReactQuill value={content} onChange={setContent} />
      {}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}
