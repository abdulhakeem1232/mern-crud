import React,{useState,useEffect} from 'react'
import axiosInstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { Button,Modal,Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import {logout} from '../../Redux/userSlice'

function Dashboard() {
  const dispatch=useDispatch()
    const [users,setUsers]=useState([])
    const [search,setSeacrh]=useState('')
  const [selectUser,setSelectedUser]=useState('')
  const [showmodal,setShowmodal]=useState(false)
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    phone:'',
  })
    const navigate=useNavigate()

    const searched=async()=>{
        try{
        const res=await axiosInstance.post('/admin/search',{name:search})
        setUsers(res.data.data)
    }catch(err){
        console.log(err);
    }
    }

    const deleteuser=async(userId)=>{
        try{
            const res=await axiosInstance.delete(`/admin/delete/${userId}`)
            if(res.data.msg=='deleted'){
              const newusers=users.filter((user)=>user._id!=userId)
              setUsers(newusers)
            }
        }catch(err){
            console.log(err);
        }

    }
    const handleModal=(userId)=>{
      console.log(userId);
      const selected=users.find((user) => userId === user._id);
      setSelectedUser(userId)
      setFormData({
        
        name:selected.name,
        email:selected.email,
        phone:selected.phone,
      });
      console.log(formData,'pp',selectUser);
      setShowmodal(true)
    }
    const handleCloseModal = () => {
      setShowmodal(false);
    }

    const handleupdate=async()=>{
      const res=await axiosInstance.post(`/admin/update/${selectUser}`,{formData})
      setShowmodal(false);
      setUsers(res.data.data)
    }
    const handleLogout=()=>{
      localStorage.removeItem('jwt');
      dispatch(logout())
      navigate('/admin')
    }

    useEffect(()=>{
        const fetchUser=async()=>{
            try{
            const res=await axiosInstance.get('/admin/getUSer')
            console.log(res,'ires');
            setUsers(res.data.data)
            console.log(users,'lo');
            }catch(err){
                console.log(err);
            }
        }
        fetchUser();
    },[])
  return (
    <div>
      hello Admin
      <h2>User List</h2>
      <Button variant="success" onClick={()=>navigate('/admin/adduser')}>Add User</Button>
      <input type="text" name="search" placeholder='Search By Name' onChange={(e) => {setSeacrh(e.target.value); searched(); }} /><Button variant="dark" onClick={handleLogout}>Logout</Button>
      <table style={{ borderCollapse: 'collapse', width: '50%', margin: 'auto', marginTop: '20px', border: '1px solid #ddd' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Update</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Delete</th>
    </tr>
  </thead>
  <tbody>
    {users && users.length > 0 && users.map((user) => (
      <tr key={user._id}>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.phone}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}> <Button variant="primary" onClick={()=>handleModal(user._id)}>Update</Button></td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}><Button variant="danger" onClick={()=>deleteuser(user._id)}>Delete</Button></td>
      </tr>
    ))}
  </tbody>
</table>


<Modal show={showmodal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Your form fields go here, use formData to populate initial values */}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={formData.name}  onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }/>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={formData.email} readOnly />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" value={formData.phone}  onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                } />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleupdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Dashboard
