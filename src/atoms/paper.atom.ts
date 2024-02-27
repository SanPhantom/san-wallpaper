import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useRef } from 'react';
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

export const searchAtom = atom<SearchDataType>(defaultSearch);

const lockAtom = atom(true);

const usePaperPagination = (lock: boolean = false) => {
  const [list, setList] = useAtom(paperListAtom);
  const [meta, setMeta] = useAtom(metaAtom);

  const [pagination, setPagination] = useAtom(paginationAtom);
  const [searchData] = useAtom(searchAtom);

  const [isLock, setLock] = useAtom(lockAtom);
  const lockRef = useRef(isLock);

  const updateLock = useCallback((value: boolean) => {
    lockRef.current = value;
    setLock(value);
  }, []);

  const fetchList = useCallback(
    async (page: number) => {
      updateLock(true);
      const currentList = await search({ ...searchData, page });
      setMeta(currentList.meta);
      setList([...list, ...currentList.data]);
    },
    [searchData, pagination, list],
  );

  const loadMore = useCallback(async () => {
    if (!lockRef.current) {
      updateLock(true);
      if (pagination.page === 0 || (meta && pagination.page < meta.last_page)) {
        const nextPage = pagination.page + 1;
        setPagination({ page: nextPage });
        await fetchList(nextPage);
      }
    }
  }, [pagination, isLock, meta]);

  const reload = useCallback(() => {
    updateLock(false);
    setList([]);
    setMeta(null);
    setPagination({ page: 0 });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLock(false);
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
      reload,
    }),
    [list, meta, searchData, loadMore, isLock, reload],
  );
};

export default usePaperPagination;
