import { useEffect, useState } from 'react';
import { tesloApi } from '../../../api/teslo.api';

export const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get('/auth/private')
      .then((res) => setInfo(res.data))
      .catch(() => setInfo('Error al obtener la información'));
  }, []);

  return (
    <>
      <h2>Información</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};
