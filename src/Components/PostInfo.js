import {useState} from 'react';
import {postPassInfos} from '../shared/requests';
import Forms from './Forms';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

function PostInfo({setLoading}) {
  const [form, setForm] = useState({
    name: '',
    login: '',
    password: '',
    url: '',
    description: '',
  });
  const navigate = useNavigate();

  const addPost = (form) => {
    setLoading(true);
    postPassInfos(form).then(() => {
      setForm({
        name: '',
        login: '',
        password: '',
        url: '',
        description: '',
      }),
      setLoading(false);
      navigate(`../table/1`, {replace: true});
    });
  };

  return (
    <Forms onSubmit={addPost} passState={form} setState={setForm}></Forms>
  );
}

PostInfo.propTypes = {
  setLoading: PropTypes.func,
};
export default PostInfo;
