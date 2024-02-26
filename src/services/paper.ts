import { MetaType, PaperItemType } from '../atoms/paper.atom';
import paperAxios from '../config/axios.config';
import type { AxiosRequestConfig } from 'axios';

export const search = (data: Record<string, any>, options?: AxiosRequestConfig) => {
  return paperAxios.get<{}, { data: PaperItemType[]; meta: MetaType }>('/search', {
    params: data,
    ...options,
  });
};
