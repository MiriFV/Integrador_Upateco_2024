import React from 'react';
import Navbar from '../components/Layout/Navbar.jsx';

function UserProfile({ user }) {
  return (
    <div>
      <Navbar user={user} />
      <div style={styles.profileContent}>
        <h2>Perfil de Usuario</h2>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button>
        <NavLink
          to="/new"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "has-text-primary" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" navbar-item")
          }
        >
          Agregar nueva Receta
        </NavLink></button>
    </div>
  );
}

export default UserProfile;