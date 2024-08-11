      
function Footer({ appName }) {
    
    return (
        <footer
            className= "footer"
        >
            <div className="content has-text-centered">
        {/* <p>Todos los derechos reservados</p> */}

        <a className='icon' href= "https://instagram.com">
           <i className="fab fa-instagram"></i> 
          
        </a>
        <a className='icon' href= "https://twitter.com">
           <i className="fab fa-twitter"></i> 
         
        </a>
        <a className='icon' href= "https://facebook.com">
          <i className="fab fa-facebook"></i> 
        
        </a>
        <div className="has-text-centered">
        <a href="#"className="has-text-weight-bold ">{appName} </a>
        </div>
        <p >
                    &copy; 2024. Todos los derechos reservados.
                </p>
                <p>Proyecto desarrollado por Pablo & Miranda para UPATecO</p>
        </div>
      </footer>
    );
  }
  export default Footer;