async function BookGrid(){
    return(
        <main>
            <div>
                {books.map((book)=>{
                    <CardBook
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        pages={book.pages}
                        genre={book.genre}
                        coverUrl={book.coverUrl}
                        status={book.status}
                        startDate={book.startDate}
                        startEnd={book.startEnd}
                        rating={book.rating}
                        reviewText={book.reviewText}
                    //Status plus features  Biblioteca (Data di restituzione) / Posseduto può essere Kindle copertina rigida o flessibile
                >
                    </CardBook>
                })}
            </div>            
        </main>
    );
}
export default BookGrid;