import { AxiosError } from 'axios';
import { tesloApi } from '../api/teslo.api';

export interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {
  static login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>('/auth/login', { email, password });
      console.log({ data });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data.message);
      }

      console.log('error', error);
      throw new Error('Error al intentar iniciar sesión');
    }
  };

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.get<LoginResponse>('/auth/status');
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Error al intentar comprobar el estado de la sesión');
    }
  };
}
