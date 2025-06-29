import PostEditor from '@/components/PostEditor';
import axios from 'axios';

export default function CreatePost() {
  const handleSubmit = async (data) => {
    await axios.post('/api/posts/create', data);
    alert('Post created');
  };

  return <PostEditor onSubmit={handleSubmit} />;
}
