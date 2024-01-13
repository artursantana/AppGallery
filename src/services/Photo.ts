import { Photo } from './type/Photo';
import { storage } from '../libs/Firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4  as CreateId} from 'uuid'

export const getAll = async () => {
  try {
    const list: Photo[] = [];

    const imageFolder = ref(storage, 'images');
    const photolist = await listAll(imageFolder);

    for (const item of photolist.items) {
      try {
        const photoUrl = await getDownloadURL(item);
        list.push({
          name: item.name,
          url: photoUrl,
        });
      } catch (error) {
        console.error(`Erro ao obter URL de download para ${item.name}:`, error);
      }
    }

    return list;
  } catch (error) {
    console.error('Erro ao obter lista de fotos:', error);
    throw error;
  }
};






export const insert = async (file: File) => {

    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){


        const randomName = CreateId()
        const newFile = ref(storage, `images/${randomName}`)

        const upload = await uploadBytes(newFile,file)
        const photoUrl = await getDownloadURL(upload.ref)
        

        return {
            name:upload.ref.name,
            url:photoUrl
        } as Photo;

    }else{
            return new Error('This file type is not supported')
    }

}