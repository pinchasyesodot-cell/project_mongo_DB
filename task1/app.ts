import { createDocument, getAllBooksByWriter, getBookByNameOrByDescription, getBooksByPagesRange } from "./DAL/mongoDAL";

createDocument({"firstName":"pinchas","lastName":"lifshitz","birthDate":new Date("2002-01-23").toISOString().split("T")[0]})
// createDocument({"name":"book1","description":"this is book 1","publicationDate":new Date("2020-01-01").toISOString().split("T")[0],"writerID":"64b8c9e5f1a2c3d4e5f67890","pages":252})
// createDocument({"name":"book1","description":"this is book 1","publicationDate":new Date("2020-01-01").toISOString().split("T")[0],"writerID":"64b8c9e5f1a2c3d4e5f67890","pages":255})
// createDocument({"name":"book1","description":"this is book 1","publicationDate":new Date("2020-01-01").toISOString().split("T")[0],"writerID":"64b8c9e5f1a2c3d4e5f67890","pages":555})
// createDocument({"name":"book1","description":"this is book 1","publicationDate":new Date("2020-01-01").toISOString().split("T")[0],"writerID":"64b8c9e5f1a2c3d4e5f67890","pages":302})
// createDocument({"name":"book1","description":"this is book 1","publicationDate":new Date("2020-01-01").toISOString().split("T")[0],"writerID":"64b8c9e5f1a2c3d4e5f67890","pages":305})
getAllBooksByWriter("64b8c9e5f1a2c3d4e5f67890")
getBookByNameOrByDescription("1")
getBooksByPagesRange()