import { createPortal } from 'react-dom';
import { useEffect } from 'react';


function Modal({ children, isOpen, onToogle}) {
 useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onToogle();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onToogle]);



  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay"  onClick={onToogle} >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {children}
        <button onClick={onToogle}> закрыть </button>
      </div>
    </div>,
    document.body
  );
}
export default Modal // Modal.jsx


