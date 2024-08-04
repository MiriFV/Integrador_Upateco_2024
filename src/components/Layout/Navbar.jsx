import { Link } from 'react-router-dom';

function Navbar() {
  return (
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
            <svg width="640" height="160" viewBox="0 0 640 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
        </a>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
            <Link to="/">
                <a class="navbar-item">
                    Home
                </a></Link>
            <Link to="/profile">
                <a class="navbar-item">
                    Porfile
                </a></Link>

            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
</nav>
  );
}

export default Navbar;