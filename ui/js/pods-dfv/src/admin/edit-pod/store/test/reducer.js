import {
	labelConstants,
	podMetaConstants,
	uiConstants,
	initialUIState,
} from '../constants';
import {
	podMeta,
	fields,
	labels,
	ui
} from '../reducer';

describe( 'reducer', () => {

	// Pod Meta
	describe( 'podMeta', () => {
		const { actions } = podMetaConstants;

		it( 'Should return an empty object by default', () => {
			expect( podMeta( undefined, undefined ) ).toEqual( {} );
		} );

		it( 'Should define the SET_POD_NAME action', () => {
			expect( actions.SET_POD_NAME ).not.toBeUndefined();
		} );

		it( 'Should update the pod name', () => {
			const action = {
				type: actions.SET_POD_NAME,
				name: 'plugh',
			};
			const state = podMeta( undefined, action );
			const expected = action.name;
			const result = state.name;

			expect( result ).not.toBeUndefined();
			expect( result ).toEqual( expected );
		} );

		it( 'Should update pod meta values', () => {
			const action = {
				type: actions.SET_POD_META_VALUE,
				key: 'foo',
				value: 'bar',
			};
			const expected = { [ action.key ]: action.value };
			const result = podMeta( undefined, action );

			expect( result ).not.toBeUndefined();
			expect( result ).toEqual( expected );
		} );
	} );

	// Fields
	describe( 'fields', () => {
		it( 'Should return an empty array by default', () => {
			expect( fields( undefined, undefined ) ).toEqual( [] );
		} );
	} );

	// Labels
	describe( 'labels', () => {
		const { actions } = labelConstants;

		it( 'Should return an empty array by default', () => {
			const state = labels( undefined, undefined );
			expect( state ).toEqual( [] );
		} );

		it( 'Should define the SET_LABEL_VALUE action', () => {
			expect( actions.SET_LABEL_VALUE ).not.toBeUndefined();
		} );

		it( 'Should update label values', () => {
			const initialValues = [
				{ name: 'name1', value: 'value1' },
				{ name: 'name2', value: 'value2' },
			];
			const testValues = [
				{ name: 'name1', value: 'newvalue1' },
				{ name: 'name2', value: 'newvalue2' },
			];
			const expectedValues = [ [
				{ name: 'name1', value: 'newvalue1' },
				{ name: 'name2', value: 'value2' },
			], [
				{ name: 'name1', value: 'value1' },
				{ name: 'name2', value: 'newvalue2' },
			] ];

			testValues.forEach( ( thisTestValue, index ) => {
				const action = {
					type: actions.SET_LABEL_VALUE,
					labelName: thisTestValue.name,
					newValue: thisTestValue.value,
				};
				const expected = expectedValues[ index ];
				const state = labels( initialValues, action );

				expect( state ).toEqual( expected );
			} );
		} );
	} );

	// UI
	describe( 'ui', () => {
		const { actions } = uiConstants;
		let state;

		it( 'Should have proper defaults', () => {
			state = ui( undefined, undefined );
			expect( state ).toEqual( initialUIState );
		} );

		describe( 'tabs', () => {
			const { tabNames } = uiConstants;
			const allTabs = {
				[ tabNames.MANAGE_FIELDS ]: {},
				[ tabNames.LABELS ]: {},
				[ tabNames.ADMIN_UI ]: {},
				[ tabNames.ADVANCED_OPTIONS ]: {},
				[ tabNames.AUTO_TEMPLATE_OPTIONS ]: {},
				[ tabNames.REST_API ]: {}
			};

			it( 'Should define the SET_ACTIVE_TAB action', () => {
				expect( actions.SET_ACTIVE_TAB ).not.toBeUndefined();
			} );

			it( 'Should properly change the active tab', () => {
				state = ui( { tabs: allTabs } );
				const action = {
					type: actions.SET_ACTIVE_TAB,
					activeTab: tabNames.LABELS,
				};
				state = ui( state, action );

				expect( state.activeTab ).toEqual( action.activeTab );
			} );

			it( 'Should use the default for an unknown tab', () => {
				const action = {
					type: actions.SET_ACTIVE_TAB,
					activeTab: 'xyzzy',
				};
				state = ui( state, action );
				expect( state.activeTab ).toEqual( initialUIState.activeTab );
			} );
		} );

		describe( 'save status', () => {
			const { saveStatuses } = uiConstants;

			it( 'Should define the SET_SAVE_STATUS action', () => {
				expect( actions.SET_SAVE_STATUS ).not.toBeUndefined();
			} );

			it( 'Should properly change the save status', () => {
				const action = {
					type: actions.SET_SAVE_STATUS,
					saveStatus: saveStatuses.SAVING,
				};
				state = ui( state, action );
				expect( state.saveStatus ).toEqual( action.saveStatus );
			} );

			it( 'Should use the default for an unknown status', () => {
				const action = {
					type: actions.SET_SAVE_STATUS,
					saveStatus: 'xyzzy',
				};
				state = ui( state, action );
				expect( state.saveStatus ).toEqual( initialUIState.saveStatus );
			} );
		} );

	} );
} );