import {ResponseEntity, ResponseWrapper} from './ResponseWrapper';

export const transformResponseWrapper = <T>(reponse: { entity: T, status: 'VALID' | 'INVALID', message: string }): ResponseWrapper<T> => {
  const res = new ResponseWrapper<T>();
  res.setEntity(reponse.entity);
  res.setMessage(reponse.message);
  res.setStatus(reponse.status);
  return res;
};

export const transformResponseEntity = <T>(reponse: any): ResponseEntity<T> => {
  const res = new ResponseEntity<T>();
  res.setData(reponse.content);
  res.setMessage(reponse.message);
  res.setStatus(reponse.status);
  return res;
};
