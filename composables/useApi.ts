import axios from "axios";

import * as ApiTypes from '@/types/api';

interface IFilters {
    name?: string | null;
    status?: ApiTypes.status | null;
    episode?: string | null;
}

export default async function useApi (entity: ApiTypes.entity, page: number = 1, filters: IFilters = { name: null, status: null }): Promise<ApiTypes.ICharacter | ApiTypes.IEpisode> {
    const { name, status, episode } = filters;
    const url = `https://rickandmortyapi.com/api/${entity}?page=${page}${name ? `&name=${name}` : ''}${status ? `&status=${status}` : ''}${episode ? `&episode=${filters.episode}` : ''}`;
    const {data} = await axios.get<ApiTypes.IEpisode | ApiTypes.ICharacter>(url)
    return data;    
}

