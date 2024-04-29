import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";


const BookCreate = () => {
    const [usuarios_backend] = useCanister("usuarios_backend");
    const [loading, setLoading] = useState("");


    const saveBook = async (e) => {
        e.preventDefault();
        const form = e.target
        const title = form.title.value;
        const author = form.author.value;
        const genre = form.genre.value;
        const year = form.year.value;
        const editorial = form.editorial.value;

        setLoading("Loading...");

        await usuarios_backend.BoookCreate(title, author, genre, year, editorial);
        setLoading("");

        document.getElementById('btnBookList').click();
    }

    
    return (
     
        <div className="row  mt-5">
            <div className="col-2"></div>
            <div className="col-8">
                {loading !== "" 
                    ? 
                    <div className="alert alert-primary">{loading}</div>
                    :
                    <div></div>
                }
                <div className="card">
                    <div className="card-header">
                        Registrar Libro
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveBook} style={{display:"inline"}} >
                        <div className="form-group">
                            <label htmlFor="title" >Título del libro</label>
                            <input type="text" className="form-control" id="title" placeholder="Título del libro" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author" >Autor</label>
                            <input type="text" className="form-control" id="author" placeholder="Nombre del autor" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre" >Género</label>
                            <input type="text" className="form-control" id="genre" placeholder="Género del libro" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year" >Año</label>
                            <input type="text" className="form-control" id="year" placeholder="Año de publicación" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editorial" >Editorial</label>
                            <input type="text" className="form-control" id="editorial" placeholder="Editorial del libro" />
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" className="btn btn-success" value="Agregar"/>  

                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>

        </div>
    )
}

export default BookCreate;
