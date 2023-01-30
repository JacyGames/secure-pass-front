import {useState} from 'react';
import {postPassInfos} from '../shared/requests';
import Forms from './Forms';
import {useNavigate} from 'react-router-dom';

function PostInfo() {
  const [form, setForm] = useState({
    name: '',
    login: '',
    password: '',
    url: '',
    description: '',
  });
  const navigate = useNavigate();

  const addPost = (form) => {
    postPassInfos(form).then(() => {
      setForm({
        name: '',
        login: '',
        password: '',
        url: '',
        description: '',
      });
      navigate(`../table/1`, {replace: true});
    });
  };

  return (
    <Forms onSubmit={addPost} passState={form} setState={setForm}></Forms>
  );
}

export default PostInfo;
