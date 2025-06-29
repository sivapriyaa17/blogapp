import { useRouter } from 'next/router';
import PostEditor from '@/components/PostEditor';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      axios.get(`/api/posts/${slug}`).then((res) => setPost(res.data));
    }
  }, [slug]);

  const handleSubmit = async (data) => {
    await axios.put(`/api/posts/${slug}`, data);
    alert('Post updated');
  };

  if (!post) return <div>Loading...</div>;

  return <PostEditor initialData={post} onSubmit={handleSubmit} />;
}
