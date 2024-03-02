import React,{useEffect,useState} from 'react'
import Nav from './Nav'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { checkUserAuthentication } from '../../Redux/userSlice';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../utils/axios';

function Profile() {
  const id=useSelector((state)=>state.userData.userId)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const navigate = useNavigate();
const dispatch=useDispatch()
  const isAuthenticated = useSelector(state => state.userData.isAuthenticated);
  const image=useSelector(state => state.userData.img);
  const updateprofile=async()=>{
    const formData = new FormData();
    console.log('userid',id);
    console.log(imagePreviewUrl,'imh');
    formData.append('img', imagePreviewUrl);
    const res=await axiosInstance.post(`/updateprofile/${id}`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(res,'res');
    setImagePreviewUrl(res.data.img)
    console.log('lol',imagePreviewUrl);
    localStorage.setItem("img", JSON.stringify(res.data.img));
    navigate('/home')
  }
  const handlechange=(e)=>{
    const file=e.target.files[0]
    console.log('file',file);
    setImagePreviewUrl(file.name)
    console.log(imagePreviewUrl,'imagepp')
  }
  useEffect(()=>{
    if (image) {
      setImagePreviewUrl(image);
    }
    dispatch(checkUserAuthentication())
    if (!isAuthenticated) {
      navigate('/',{ replace: true });
    }
  },[dispatch, isAuthenticated, navigate,image])
  return (
    <div>
      <Nav />
      <Container>
        <Row className="mt-4">
          <Col xs={12} md={4} className="text-center">
            {imagePreviewUrl}
            {imagePreviewUrl!='undefined' ? (
              <Image src={ `/uploads/${imagePreviewUrl}`} roundedCircle fluid style={{ maxWidth: '250px' }} />
            ) : (
              <Image
                src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                roundedCircle
                fluid
                style={{ maxWidth: '250px' }}
              />
            )}
            <form action="" encType="multipart/form-data"  method="post">
            <input type="file" accept="image/*" name='img' onChange={handlechange}/>
            <Button variant="success" onClick={updateprofile}>Update</Button>
            </form>
          </Col>
          <Col xs={12} md={8}>
            {/* Additional profile information */}
            <h2>name</h2>
            <p>email</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile
