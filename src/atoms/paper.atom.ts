import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { search } from '../services/paper';
import { CategoryEnum, PurityEnum } from '../types.d';

export type MetaType = {
  current_page: number;
  last_page: number;
  per_page: number | string;
  total: number;
  query: string;
  seed: string | null;
};

export type PaperItemType = {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: string;
  category: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: {
    large: string;
    original: string;
    small: string;
  };
};

export type SearchDataType = {
  categories?: string;
  purity?: string;
  sorting?: string;
  atleast?: string;
  q?: string;
};

export const defaultSearch: SearchDataType = {
  categories: `${CategoryEnum.general}/${CategoryEnum.anime}`,
  purity: PurityEnum.sfw,
  sorting: 'date_added',
  atleast: '1920x1080',
};

const paperListAtom = atom<PaperItemType[]>([]);

const metaAtom = atom<MetaType | null>(null);

const paginationAtom = atom({
  page: 0,
});

const searchAtom = atom<SearchDataType>(defaultSearch);

const lockAtom = atom(false);

const usePaperPagination = (lock: boolean = false) => {
  const [list, setList] = useAtom(paperListAtom);
  const [meta, setMeta] = useAtom(metaAtom);

  const [pagination, setPagination] = useAtom(paginationAtom);
  const [searchData] = useAtom(searchAtom);

  const [isLock, setLock] = useAtom(lockAtom);

  const fetchList = useCallback(async () => {
    setLock(true);
    const currentList = await search({ ...searchData, ...pagination });
    setMeta(currentList.meta);
    setList([...list, ...currentList.data]);
  }, [searchData, pagination, list]);

  const loadMore = useCallback(() => {
    if (!isLock) {
      if (pagination.page === 0 || (meta && pagination.page < meta.last_page)) {
        setPagination({ page: pagination.page + 1 });
      }
    }
  }, [pagination, isLock, meta]);

  useEffect(() => {
    (async () => {
      if (!lock) {
        if (pagination.page !== 0) {
          await fetchList();
        }
      }
    })();
  }, [pagination.page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLock(false);
      clearTimeout(timer);
    }, 500);
  }, [list]);

  return useMemo(
    () => ({
      list,
      meta,
      searchData,
      loadMore,
      isLock,
    }),
    [list, meta, searchData, loadMore, isLock],
  );
};

export default usePaperPagination;
