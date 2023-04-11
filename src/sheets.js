import {registerSheet} from 'react-native-actions-sheet';

import ActionSheetConfirm from './components/actionsheetsCustom/ActionSheetConfirm';
import ActionSheetFilter from './components/actionsheetsCustom/ActionSheetFilter';


registerSheet('confirm-sheet', ActionSheetConfirm);
registerSheet('filter-sheet', ActionSheetFilter)
export {};
