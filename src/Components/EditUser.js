import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {loadUser} from '../shared/requests';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../shared/consts';
import Forms from './Forms';

function EditUser() {
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
    await axios.put(`${BASE_URL}/${id}`, passwordInfo);
    navigate(`../table/1`, {replace: true});
  };

  useEffect(() => {
    loadUser(id).then((responseData) => {
      setPasswordInfo(responseData.data);
    });
  }, []);

  return (
    <Forms onSubmit={editInfo}
      passState={passwordInfo} setState={setPasswordInfo}></Forms>
  );
}
export default EditUser;
