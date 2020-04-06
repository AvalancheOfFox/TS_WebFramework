import Axios, { AxiosResponse, AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}
export class ApiSync<T extends HasId> {
  constructor(public rootURL: string) {}

  fetch(id: number): AxiosPromise {
    return Axios.get(`${this.rootURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return Axios.put(`${this.rootURL}/${id}`, data);
    } else {
      return Axios.post(this.rootURL, data);
    }
  }
}
