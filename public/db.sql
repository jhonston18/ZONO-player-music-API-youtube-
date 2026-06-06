
-- base de datos con las tablas basicas para probar app


CREATE TABLE Artistas (
  idArtista INT IDENTITY(1,1) PRIMARY KEY,
  nombreArtista VARCHAR(50) NOT NULL
)

CREATE TABLE Categorias (
  idCategoria INT IDENTITY(1,1) PRIMARY KEY,
  nombreCategoria VARCHAR(50) NOT NULL
  
)


CREATE TABLE Musicas(
  idMusica INT PRIMARY KEY NOT NULL, -- diferente
  nombreMusica VARCHAR(100) NOT NULL,
  idCategoria INT NOT NULL, -- FOREIGN KEY
  duracion INT NOT NULL,
  fechaAgreg DATETIME DEFAULT GETDATE(),
  idArtista INT NOT NULL, -- FOREIGN KEY
  
  
  CONSTRAINT FK_Musicas_Categorias
    FOREIGN KEY (idCategoria)
    REFERENCES Categorias(idCategoria),
  
  CONSTRAINT FK_Musicas_Artistas
    FOREIGN KEY (idArtista)
    REFERENCES Artistas(idArtista)
  
)

CREATE TABLE MusicaUsuario (
  idMusicaUsuario: INT PRIMARY KEY NOT NULL,
  nombreMusicaUsuario: VARCHAR(100),
  duracion INT NOT NULL,
  fechaAgreg DATETIME DEFAULT GETDATE(),
  idArtista INT NOT NULL, -- FOREIGN KEY
)



CREATE TABLE CancionArtistas(
  idMusica INT NOT NULL,
  idArtista INT NOT NULL, 
  
  PRIMARY KEY (idMusica, idArtista), -- Llave primaria compuesta para evitar duplicados
  
  
  CONSTRAINT FK_CancionArtistas_Musicas 
    FOREIGN KEY(idMusica) 
    REFERENCES Musicas(idMusica),
    
  CONSTRAINT FK_CancionArtistas_Artistas 
    FOREIGN KEY(idArtista) 
    REFERENCES Artistas(idArtista)
);