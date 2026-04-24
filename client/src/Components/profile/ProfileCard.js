import React from 'react'

const ProfileCard = ({user,products}) => {
  return (
    <div >
     <section className="user-details" >
        <img
          src="https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg"
          alt=" profile avatar"
        />
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <p>{user.email}</p> 
         <p>My recipes count : {products.length}</p>
      </section>
    </div>
  )
}

export default ProfileCard