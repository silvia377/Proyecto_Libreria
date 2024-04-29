import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Home from './Home';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Books = () => {
  
  const [usersBackend] = useCanister("usuarios_backend");
  const { principal } = useConnect();
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState("");
  const [idBook, setIdBook] = useState("");
  const [bookTitle, setBookTitle] = useState(""); 

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);

  const updateBook = async () => {
    setLoading("Loading...");

    await usersBackend.updateBook(idBook, bookTitle); 
    setLoading("");
    setIdBook("");

    setShowModalEditar(false);
    obtieneLibros();
  }

  const handleShowModalEditar = async (idLibro) => {
    setShowModalEditar(true);
    setIdBook(idLibro);
    
    const libro = await usersBackend.readBookById(idLibro);
    setBookTitle(libro[0].title); 
  }

  const handleShowModalEliminar = async (idLibro, title) => {
    setShowModalEliminar(true);
    setBookTitle(title); 
    setIdBook(idLibro);
  }

  const handleCloseModalEditar = () => setShowModalEditar(false);
  const handleCloseModalEliminar = () => setShowModalEliminar(false);

  useEffect(() => {
    obtieneLibros();
  }, []);

  const obtieneLibros = async () => {
    setLoading("Loading...");
    try {
      const booksRes = await usersBackend.readBooks();
      setBooks(booksRes);   
      setLoading("");
    } catch(e) {
      console.log(e);
      setLoading("Error happened fetching books list");
    }
  }

  const deleteBook = async () => {
    setLoading("Loading...");
    await usersBackend.deleteBook(idBook);
    setLoading("");
    setIdBook("");
    setBookTitle("");
    setShowModalEliminar(false);
    obtieneLibros();
  }
  
  return(
    <>
    { principal 
      ? 
      <div className="row mt-5">
        <div className="col">
          {loading !== "" &&
            <div className="alert alert-primary">{loading}</div>
          }
          <div className="card">
            <div className="card-header">
              Lista de libros
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  {books.map((book) => {
                    return (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>
                          <button type="button" className="btn btn-primary" onClick={() => handleShowModalEditar(book.id)}>Editar</button>
                        </td>
                        <td>
                          <button type="button" className="btn btn-danger" onClick={() => handleShowModalEliminar(book.id, book.title)}>Eliminar</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>         
            </div>
          </div>
        </div>

        <Modal show={showModalEditar} onHide={handleCloseModalEditar}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                {loading !== "" &&
                  <div className="alert alert-primary">{loading}</div>
                }
                <form style={{display:"inline"}} id="formEditar">
                  <div className="form-group">
                      <label htmlFor="title">Título del libro</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Título del libro"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)} 
                      />
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalEditar}>
              Cerrar
            </Button>
            <Button variant="primary"  onClick={updateBook}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalEliminar} onHide={handleCloseModalEliminar}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                {loading !== "" &&
                  <div className="alert alert-primary">{loading}</div>
                }
                <p>Deseas eliminar el libro "{bookTitle}"</p> {/* Modificación aquí */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalEliminar}>
              Cerrar
            </Button>
            <Button variant="danger"  onClick={deleteBook}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    : 
      <Home />
    }
    </>
  )
}
  
  
export default Books;
