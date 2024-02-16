import React, { useEffect, useRef } from 'react'
import './ImageModal.css'

function ImageModal({ image, setOpenModal,OpenModal }) {
    const MainBox=useRef(null)
    useEffect(() => {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                setOpenModal(false)
            }
        })
        window.addEventListener('click', (e) => {
                    
        if(OpenModal&&e.target===MainBox.current){
            setOpenModal(false)
        }
            
        })
    })
    return (
        <div className='container-fluid'>
            <div className="row">
                <div ref={MainBox} className="col-12 modal d-flex vh-100 justify-content-center align-items-center">

                    <img  src={image} alt='img' className='img-fluid' />
                </div>
            </div>
    </div>
)
}

export default ImageModal