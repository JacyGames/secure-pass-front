import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {loadUser} from '../shared/requests';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../shared/consts';
import Forms from './Forms';
import authHeader from '../services/authHeader';
import PropTypes from 'prop-types';

function EditUser({setLoading}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const [passwordInfo, setPasswordInfo] = useState({
    name: '',
    login: '',
    password: '',
    url: '',
    description: '',
  });

  const editInfo = async () => {
    setLoading(true);
    await axios.put(`${BASE_URL}/${id}`, passwordInfo, {headers: authHeader()})
        .then(
            setLoading(false),
            navigate(`../table/1`, {replace: true}),
        );
  };

  useEffect(() => {
    setLoading(true);
    loadUser(id).then((responseData) => {
      setLoading(false),
      setPasswordInfo(responseData.data);
    });
  }, []);

  return (
    <Forms onSubmit={editInfo}
      passState={passwordInfo} setState={setPasswordInfo}></Forms>
  );
}

EditUser.propTypes = {
  setLoading: PropTypes.func,
};

export default EditUser;
