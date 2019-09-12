import {observable} from 'mobx';
import { ALL_TODOS, ALL_TAGS } from '../constants';

export default class ViewStore {
	@observable todoBeingEdited = null;
	@observable todoFilter= ALL_TODOS;
	@observable tagBeingInput = null;
	@observable tagFilter = ALL_TAGS;
}