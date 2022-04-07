import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../JS/actions/userActions'
import "./userlist.css"
export const UsersCard = ({user}) => {

    const dispatch = useDispatch()
  return (
    <div>
        <Table striped bordered hover>
  <tbody>
    <tr>
      <td>id</td>
      <td >{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className='delete'> <Button
             variant="outline-danger"
             onClick={() => dispatch(deleteUser(user._id))}
           >
             <i class="fa fa-trash-o" aria-hidden="true"></i>
           </Button></td>
    </tr>
  </tbody>

</Table>
<div>
           
          
         </div>  </div>
  )
}
