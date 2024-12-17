const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())
const sqlite3 = require('sqlite3');
const path=require("path")
// Connect to the SQLite database
const db = new sqlite3.Database('./library.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables

db.serialize(() => {
  // Create Genres table
  db.run(`
    CREATE TABLE IF NOT EXISTS Genres (
      GenreID INTEGER PRIMARY KEY,
      Name TEXT NOT NULL,
      Description TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating Genres table:', err.message);
  });

  // Create Authors table
  db.run(`
    CREATE TABLE IF NOT EXISTS Authors (
      AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error('Error creating Authors table:', err.message);
  });

  // Create Books table
  db.run(`
    CREATE TABLE IF NOT EXISTS Books (
      BookID INTEGER PRIMARY KEY AUTOINCREMENT,
      Title TEXT NOT NULL,
      AuthorID INTEGER NOT NULL,
      GenreID INTEGER NOT NULL,
      Pages INTEGER,
      PublishedDate DATE,
      FOREIGN KEY (AuthorID) REFERENCES Authors (AuthorID),
      FOREIGN KEY (GenreID) REFERENCES Genres (GenreID)
    )
  `, (err) => {
    if (err) console.error('Error creating Books table:', err.message);
  });

  console.log('Tables created successfully.');
});

app.get("/authorse",async(req,res) => {
  const query = `
  SELECT * FROM GENRES
`; 
 const data=await db.all(query)
 console.log(data)
})
app.post("/register",async(req,res) => {
    const {authorId,title,generId,pages,publishedDate,genreName,genreDescription,authorName}=req.body
    const addBookQuery = `
    INSERT INTO
      Books (Title,AuthorID,GenreID,Pages,PublishedDate)
     VALUES (?,?,?,?,?);`;
     const dbResponse = await db.run(addBookQuery,[title,authorId,generId,pages,publishedDate]);
     const addGenre=`
     INSERT INTO Genres(Name,Description)
     VALUES(?,?);`
     const genreResponse=await db.run(addGenre,[genreName,genreDescription])
     const addAuthor=`
     INSERT INTO Authors(Name)
     VALUES(?);`
     const authorResponse=await db.run(addAuthor,[authorName])
     try{
     if(dbResponse && genreResponse && authorResponse){
      res.status(200).send("Book Created Successfuly")
     }
    }
    catch(e){
      res.status(500).send(e)
    }
})

app.get('/books', (req, res) => {
  const LimitedData=req.query.limit 
  const offsetData=req.query.offset
  const query = `
  SELECT Books.*, Authors.Name as AuthorName, Genres.Name as GenreName
  FROM Books
  INNER JOIN Authors ON Books.AuthorID = Authors.AuthorID
  INNER JOIN Genres ON Books.GenreID = Genres.GenreID
  LIMIT ? OFFSET ?
`;

const countQuery = `SELECT COUNT(*) as total  FROM Books
  INNER JOIN Authors ON Books.AuthorID = Authors.AuthorID
  INNER JOIN Genres ON Books.GenreID = Genres.GenreID`;

db.get(countQuery, [], (err, countResult) => {
  if (err) {
    return res.status(500).json({ error: "Failed to fetch total books" });
  }

  db.all(query, [LimitedData,offsetData], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch books" });
    }

    res.json({
      books: rows,
      total: countResult.total, // Send total number of books
    });
  });
});
});

app.get("/books/:id",async(req,res) => {
  const {id}=req.params
  db.all(`SELECT 
    Books.BookID,
    Books.Title,
    Authors.Name AS AuthorName,
    Genres.Name AS GenreName,
    Books.Pages AS Pages,
    Books.PublishedDate AS publishedDate
  FROM 
      Books
  INNER JOIN 
      Authors ON Books.AuthorID = Authors.AuthorID
  INNER JOIN 
      Genres ON Books.GenreID = Genres.GenreID
  WHERE BookID=${id};`, [], (err, rows) => {
  if (err) {
  console.error("Error retrieving data:", err.message);
  res.status(500).send("Error retrieving data.");
  } else {
  res.status(200).send(rows); 
  // Send the rows as JSON
  }
});
})
app.delete("/delete/:id",async(req,res) => {
  const {id}=req.params 
  db.run(`DELETE FROM BOOKS WHERE BookID=${id};`,[],(err,rows) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      res.status(500).send("Error retrieving data.");
    } else {
      res.status(200).send("Data Deleted Successfully"); // Send the rows as JSON
    }
  })
})

app.put("/edit/:id",async(req,res) => {
  const {id}=req.params 
  const {title,pages,publishedDate}=req.body
  db.run(`UPDATE BOOKS 
     SET Title='${title}',Pages=${pages},PublishedDate='${publishedDate}'
     Where BookID=${id};`,[],(err,rows) => {
      if (err) {
        console.error("Error retrieving data:", err.message);
        res.status(500).send("Error retrieving data.");
      } else {
        res.status(200).send(rows); // Send the rows as JSON
      }
    })

})

app.get('/search', (req, res) => {
  const query = req.query.q;
      if(query.length !== 0){
      const sql = `
        SELECT * FROM Books
        WHERE Title LIKE ? OR AuthorID IN (
          SELECT AuthorID FROM Authors WHERE Name LIKE ?
        )
      `;
      
      const params = [`%${query}%`, `%${query}%`];

      db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows); // Send filtered results
  });
} 
  
});

app.listen(3006,async() => {
    console.log("Port Listened Successfully")
})