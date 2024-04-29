import {
    Canister,
    Err,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec
} from 'azle';

const Book = Record({
    id: Principal,
    title: text,
    author: text,
    genre: text
});
type Book = typeof Book.tsType;

const ApplicationError = Variant({
    BookDoesNotExist: text
});

type ApplicationError = typeof ApplicationError.tsType;

let books = StableBTreeMap<Principal, Book>(0);

export default Canister({
    createBook: update([text, text, text], Book, (title, author, genre) => {
        const id = generateId();
        const book: Book = {
            id: id,
            title: title,
            author: author,
            genre: genre
        };

        books.insert(book.id, book);

        return book; 
    }),
    readBooks: query([], Vec(Book), () => {
        return books.values();
    }),
    readBookById: query([text], Opt(Book), (id) => {
        return books.get(Principal.fromText(id));
    }),

    deleteBook: update([text], Result(Book, ApplicationError), (id) => {
        const bookOpt = books.get(Principal.fromText(id));

        if ('None' in bookOpt) {
            return Err({
                BookDoesNotExist: id
            });
        }

        const book = bookOpt.Some;
        books.remove(book.id);
        return Ok(book);
    }),
    updateBook: update(
        [text, text, text, text],
        Result(Book, ApplicationError),
        (title, author, genre, bookId) => {
            const bookOpt = books.get(Principal.fromText(bookId));

            if ('None' in bookOpt) {
                return Err({
                    BookDoesNotExist: bookId
                });
            }
            const newBook: Book = {
                id: Principal.fromText(bookId),
                title: title,
                author: author,
                genre: genre
            };

            books.remove(Principal.fromText(bookId))
            books.insert(Principal.fromText(bookId), newBook);

            return Ok(newBook);
        }
    )
})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
