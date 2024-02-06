import { useEffect, useState, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/Photo';
import { Photo } from './services/type/Photo';
import PhotoItem from './components/photoItem/Index';


const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    };

    getPhotos();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      const result = await Photos.insert(file);

      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message} `);
      } else {
        const newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  };

  const handleDeletePhoto = async (photoName: string) => {
    const result = await Photos.deletePhoto(photoName);

    if (result instanceof Error) {
      alert(`${result.name} - ${result.message} `);
    } else {
      const updatedPhotos = photos.filter((photo) => photo.name !== photoName);
      setPhotos(updatedPhotos);
    }
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header>APP GALLERY</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && 'enviando...'}
        </C.UploadForm>

        {loading && (
          <C.ScreenWarning>
            <div className="emoji">🚀</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}
        {!loading && (
          <C.PhotoList>
            {photos.map((photo, index) => (
              <C.PhotoItem key={photo.name}>
                <PhotoItem key={index} url={photo.url} name={photo.name} />
                <button onClick={() => handleDeletePhoto(photo.name)}>remove</button>
              </C.PhotoItem>
            ))}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className="emoji">😔</div>
            <div>There's no any here yet</div>
          </C.ScreenWarning>
        )}
      </C.Area>
    </C.Container>
  );
};

export default App;
