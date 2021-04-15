import urlMetadata from 'url-metadata';

export default async function metadata(url) {
  try {
    const data = await urlMetadata(url);
    return data;
  } catch (e) {
    console.log(e);
    return {
      title: url,
      description: '',
      image: '',
    };
  }
}
