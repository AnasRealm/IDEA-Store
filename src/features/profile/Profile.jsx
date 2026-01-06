import './Profile.css'

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__container">
        <section className="profile__section">
          <h2 className="profile__title">Personal info</h2>
          
          <div className="profile__field">
            <label>First Name</label>
            <input type="text" placeholder="Ahmad" />
          </div>
          
          <div className="profile__field">
            <label>Last Name</label>
            <input type="text" placeholder="Alshra" />
          </div>
          
          <div className="profile__field">
            <label>Username</label>
            <input type="text" placeholder="Anasahmad" />
          </div>
        </section>

        <section className="profile__section">
          <h2 className="profile__title">Password</h2>
          
          <div className="profile__field">
            <label>Current Password</label>
            <input type="password" placeholder="******" />
          </div>
          
          <div className="profile__field">
            <label>New Password</label>
            <input type="password" placeholder="******" />
          </div>
          
          <div className="profile__field">
            <label>Confirm Password</label>
            <input type="password" placeholder="******" />
          </div>
        </section>

        <button className="profile__save-btn">Save changes</button>
      </div>
    </div>
  )
}

export default Profile