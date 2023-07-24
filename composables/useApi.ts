import axios from "axios";

import * as ApiTypes from '@/types/api';
import { log } from "console";

interface IFilters {
    name: string | null;
    status: ApiTypes.status | null;
}

export default async function useApi (entity: ApiTypes.entity, page: number = 1, filters: IFilters = { name: null, status: null }): Promise<ApiTypes.ICharacter | ApiTypes.IEpisode> {
    const { name, status } = filters;
    const url = `https://rickandmortyapi.com/api/${entity}?page=${page}${name ? `&name=${name}` : ''}${status ? `&status=${status}` : ''}`;
    const {data} = await axios.get<ApiTypes.IEpisode | ApiTypes.ICharacter>(url)
    return data;    
}

