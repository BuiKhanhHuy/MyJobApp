import {registerSheet} from 'react-native-actions-sheet';

import ActionSheetConfirm from './components/actionsheetsCustom/ActionSheetConfirm';
import ActionSheetFilterCompany from './components/actionsheetsCustom/ActionSheetFilterCompany';
import ActionSheetFilterJobPost from './components/actionsheetsCustom/ActionSheetFilterJobPost';


registerSheet('confirm-sheet', ActionSheetConfirm);
registerSheet('filter-company-sheet', ActionSheetFilterCompany)
registerSheet('filter-job-post-sheet', ActionSheetFilterJobPost)
export {};
