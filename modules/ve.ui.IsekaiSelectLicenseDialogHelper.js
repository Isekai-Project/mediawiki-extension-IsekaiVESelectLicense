/**
 * Isekai select license dialog helper
 *
 * @class
 * @extends ve.ui.MWVeOnlyDialogTool
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiSelectLicenseDialogHelper = function IsekaiSelectLicenseDialogHelper() {
    ve.ui.IsekaiSelectLicenseDialogHelper.super.apply(this, arguments);
};
OO.inheritClass(ve.ui.IsekaiSelectLicenseDialogHelper, ve.ui.MWVeOnlyDialogTool);
ve.ui.IsekaiSelectLicenseDialogHelper.static.name = 'selectLicense';
ve.ui.IsekaiSelectLicenseDialogHelper.static.group = 'utility';
ve.ui.IsekaiSelectLicenseDialogHelper.static.icon = 'article';
ve.ui.IsekaiSelectLicenseDialogHelper.static.title = mw.message('isekai-ve-selectlicense').text();
ve.ui.IsekaiSelectLicenseDialogHelper.static.commandName = 'meta/selectLicense';
ve.ui.IsekaiSelectLicenseDialogHelper.static.autoAddToCatchall = false;
ve.ui.IsekaiSelectLicenseDialogHelper.static.autoAddToGroup = false;
ve.ui.toolFactory.register(ve.ui.IsekaiSelectLicenseDialogHelper);

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'meta/selectLicense', 'window', 'open', { args: ['meta', { page: 'selectLicense' }] }
    )
);

/*
ve.ui.sequenceRegistry.register(
    new ve.ui.Sequence('isekaiLicense', 'meta/selectLicense', '<license', 8)
);

ve.ui.commandHelpRegistry.register('insert', 'meta/selectLicense', {
    sequences: ['isekaiLicense'],
    label: mw.message('isekai-ve-selectlicense').text()
});
*/