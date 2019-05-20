import { AnyAction } from 'redux';
import API from '../api/Api';

type Saga = (api: API, action: AnyAction, ...params: any[]) => Iterator<any>;

export default Saga;
