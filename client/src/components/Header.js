import React from 'react'

const Header = () => {
  return (
    <div style={styles.header}>
      <nav className="navbar" style={{width: "80%", margin: "auto"}}>
        <div className="navbar-brand">
          <a className="navbar-item" href="http://bulma.io">
            <img src="http://i.imgur.com/T5JKfhD.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
            {/* <p>LOGO</p> */}
          </a>
          <div className="navbar-burger burger" data-target="navMenuExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navMenuExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <span className="navbar-item">Call Us :&nbsp; <b>0822 4236 1317</b></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

    {/* <div className="btn-group">
      <Link to="/home">
        <button className="btn btn-default btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          GET STARTED
        </button>
      </Link>
    </div> */}
  </div>
  )
}

const styles = {
  header: {
    width: "100%",
    backgroundColor: "white"
  },
  body: {
    // backgroundImage: "url(http://i.imgur.com/bGV9S8C.jpg)",
    backgroundColor: "#ECF0F1",
    height:'5vh',
    width: 'auto',
    // backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    filter: 'gray',
  },
  login: {
    backgroundColor: '#ff7070'
  },
  slogan: {
    fontFamily: 'source sans pro', fontSize: 60, textAlign: 'left', color:'#ff7070', fontWeight: 900, lineHeight: 1
  },
  sloganMini: {
    fontFamily: 'source sans pro', fontSize: 30, textAlign: 'left', color:'#000', fontWeight: 900, lineHeight: 1
  },
  h1: {
    fontFamily: 'source sans pro', fontSize: 30, color: 'white', fontWeight: 900
  }

}

export default Header
