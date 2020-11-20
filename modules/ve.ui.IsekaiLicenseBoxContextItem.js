/**
 * 异世界百科 授权协议提示框的编辑弹出框
 *
 * @abstract
 * @class
 * @extends ve.ui.LinearContextItem
 *
 * @param {ve.ui.Context} context Context item is in
 * @param {ve.dm.Model} model Model item is related to
 * @param {Object} config Configuration options
 */
ve.ui.IsekaiLicenseBoxContextItem = function VeUiIsekaiLicenseBoxContextItem() {
    // Parent constructor
    ve.ui.IsekaiLicenseBoxContextItem.super.apply(this, arguments);

    this.editButton.setLabel('更改');
};

/* Inheritance */
OO.inheritClass(ve.ui.IsekaiLicenseBoxContextItem, ve.ui.LinearContextItem);

/* Static Properties */
ve.ui.IsekaiLicenseBoxContextItem.static.embeddable = false;
ve.ui.IsekaiLicenseBoxContextItem.static.name = 'selectLicense';
ve.ui.IsekaiLicenseBoxContextItem.static.icon = 'article';
ve.ui.IsekaiLicenseBoxContextItem.static.label = '授权协议';
ve.ui.IsekaiLicenseBoxContextItem.static.modelClasses = [ve.dm.IsekaiLicenseBoxNode];
ve.ui.IsekaiLicenseBoxContextItem.static.embeddable = false;
ve.ui.IsekaiLicenseBoxContextItem.static.commandName = 'meta/selectLicense';

/* Methods */
/**
 * @inheritdoc
 */
ve.ui.IsekaiLicenseBoxContextItem.prototype.getCommand = function() {
    return this.context.getSurface().commandRegistry.lookup(this.constructor.static.commandName);
};

ve.ui.IsekaiLicenseBoxContextItem.prototype.getDescription = function() {
    var licenseId = ve.ce.nodeFactory.getDescription(this.model);
    var licenseList = mw.config.get('wgIsekaiLicenses');
    if (licenseId in licenseList) {
        return licenseList[licenseId].name;
    } else {
        return '';
    }
};

ve.ui.IsekaiLicenseBoxContextItem.prototype.onEditButtonClick = function() {
    ve.ui.IsekaiLicenseBoxContextItem.super.prototype.onEditButtonClick.apply(this, arguments);
    this.context.toggleMenu(false);
    this.context.toggle(false);
    this.context.getSurface().getView().contexedAnnotations = [];
    ve.track('activity.' + this.constructor.static.name, { action: 'context-close' });
};

/* Registration */
ve.ui.contextItemFactory.register(ve.ui.IsekaiLicenseBoxContextItem);