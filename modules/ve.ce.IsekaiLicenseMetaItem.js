/**
 * 异世界百科 VE 设置授权协议框 CE
 *
 * @class
 * @extends ve.ce.MWInlineExtensionNode
 *
 * @constructor
 * @param {ve.dm.IsekaiLicenseMetaItem} model Model to observe
 * @param {Object} [config] Configuration options
 */
ve.ce.IsekaiLicenseMetaItem = function VeCeIsekaiLicenseMetaItem() {
    // Parent constructor
    ve.ce.IsekaiLicenseMetaItem.super.apply(this, arguments);
};

/* Inheritance */
OO.inheritClass(ve.ce.IsekaiLicenseMetaItem, ve.ce.MWInlineExtensionNode);

/* Static Properties */
ve.ce.IsekaiLicenseMetaItem.static.name = 'isekaiLicense';
ve.ce.IsekaiLicenseMetaItem.static.primaryCommandName = 'meta/selectLicense';
ve.ce.IsekaiLicenseMetaItem.static.iconWhenInvisible = 'article';

/* Methods */

/* Registration */
ve.ce.nodeFactory.register(ve.ce.IsekaiLicenseMetaItem);