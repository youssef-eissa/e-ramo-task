import React, { useCallback, useState } from 'react'
import './Home.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeUser } from '../Redux/UsersReducer';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/UserEdit';
import ImageModal from './ImageModal';
function Home() {
    const dispatch=useDispatch()
    const users = useSelector(state => state.users.users)
    const [ImageToOpen, setImageModal] = useState('')
    const [OpenModal, setOpenModal] = useState(false)
    const handleOpenModal=useCallback((image)=>{
        setImageModal(image)
        setOpenModal(true)
    },[setImageModal,setOpenModal])
  
return (
    <div  className='container-fluid'>
        <div className="row">
            <div className="col-12 vh-100 d-flex home justify-content-center align-items-center ">
                <div className='col-8 d-flex table-responsive flex-column justify-content-center align-items-center'>
                    <h1>Users</h1>
                <table className=' table table-striped table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope='col'>Name</th>
                            <th className='text-center' scope='col'>Email</th>
                            <th scope='col'>Password</th>
                            <th scope='col'>Image</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Age</th>
                            <th className='text-center' scope='col'>Actions</th>
                        </tr>
                    </thead>

                  

                    {users.length > 0?<tbody className='table-group-divider'>
                        {users.length>0&&users.map(user => (
                            <tr key={user.id}>
                                <td className='align-middle'>{user.name}</td>
                                <td className='align-middle'>{user.email}</td>
                                <td className='align-middle'>{user.password}</td>
                                <td >
                                    <div onClick={()=>handleOpenModal(user.image)} className="imgBox h-10 w-10">
                                        <img src={user.image} alt='img' className='img-fluid' />
                                    </div>
                                </td>
                                <td className='align-middle'>{user.phone}</td>
                                <td className='align-middle'>{user.age}</td>
                                <td className='d-fle justify-content-center align-items-center gap-2 '>
                                    <Link onClick={()=>dispatch(setUser(user))}  to={`/edit/${user.id}`} className='btn btn-primary'> Edit</Link>
                                    <button onClick={()=>dispatch(removeUser(user.id))} className='btn btn-danger ms-2'> Delete</button>
                            </td>
                            </tr>
                        ))}
                        </tbody> :
                            <tbody>
                                <tr>
                                    <td colSpan={7} className='align-middle text-center p-5 fw-bold fs-2'>No Users Found</td>
                        </tr>
                        </tbody>}
                        
                </table>
                <Link reloadDocument className='col-2 mt-3 d-flex justify-content-center align-items-center rounded p-2 btn btn-primary' to='/create'>Create User</Link>
                </div>

            </div>
        </div>
                {OpenModal && <ImageModal OpenModal={OpenModal} image={ImageToOpen} setOpenModal={setOpenModal}/>}
    </div>
)
}

export default Home