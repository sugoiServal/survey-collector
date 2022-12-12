import { useRef } from "react"
export default function Modal(props) {
    let closeModal = useRef(props.closeModal).current
    window.onclick = function(event) {
        if (event.target.className === "modal-overlay"){
            closeModal()
        }
    }
    return(   
        <div className="modal-overlay">
            <div className="modal_ctm">
                {props.children}
            </div> 
        </div>               
      )
}


