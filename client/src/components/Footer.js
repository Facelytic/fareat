import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="columns">
        <div className="column is-12">
          <p className="getintouch">Get in touch! We`d love to hear from you.</p>
          <div className="columns">
            <div className="column is-5 is-offset-1">
              <h3 className="fa fa-envelope"> &nbsp;Email: </h3>
              <p>fareat@mail.com</p>
            </div>
            <div className="column is-5">
              <h3 className="fa fa-map-marker">&nbsp;Address: </h3>
              <p>Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
